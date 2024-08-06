import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [file, setFile] = useState(null);
  const [fileUploadPercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    console.log('Avatar URL:', currentUser.avatar);
  }, [currentUser.avatar]);

  useEffect(() => {
    // Ensure currentUser is updated if necessary
    setFormData(prevFormData => ({ ...prevFormData, avatar: currentUser.avatar }));
  }, [currentUser]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData(prevFormData => ({ ...prevFormData, avatar: downloadURL }));
            setFileUploadError(false);
          });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
//code block to handle the update data form to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Profile</h1>
      <form className="flex flex-col gap-4"
            onSubmit={handleSubmit}
      >
        <input onChange={(e) => setFile(e.target.files[0])} 
          type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"} 
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-3" />

        <p className="text-sm self-center">
          {fileUploadError ? 
            (<span className="text-red-800">Error Uploading Image File, must be less than 2mb in size</span>) 
            : fileUploadPercentage > 0 && fileUploadPercentage < 100 ?
              (<span className="text-slate-800">{`Uploading ${fileUploadPercentage}%`}</span>)
              : fileUploadPercentage === 100 ? 
                (<span className="text-green-800">Image Successfully Uploaded</span>)
                : ""
          }
        </p>
        <input 
          type="text" 
          placeholder="Username" 
          id="username"
          value={formData.username || ''}
          onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, username: e.target.value }))} 
          className="border rounded-lg p-3 " />
        <input 
          type="email" 
          placeholder="Email" 
          id="email"
          value={formData.email || ''}
          onChange={handleChange} 
          className="border rounded-lg p-3 " />
        <input 
          type="password" 
          placeholder="Password" 
          id="password"
          value={formData.password || ''}
          onChange={handleChange} 
          className="border rounded-lg p-3 " />
        <button
          disabled={loading}
          className="bg-slate-800 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between items-center p-4 mt-4">
        <span className="text-red-500 hover:text-red-800 cursor-pointer">Delete Account</span>
        <span className="text-red-500 hover:text-red-800 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-800 mt-6">{error ? error : ''}</p>
      <p className="text-green-800 mt-6">{updateSuccess ? 'Successful User Information Update' : ''}</p>
    </div>
  );
}