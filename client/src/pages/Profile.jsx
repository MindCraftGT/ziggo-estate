import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector(state => state.user);
  const [file, setFile] = useState(null);
  const [fileUploadPercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} 
          type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || "https://www.example.com/default-avatar.png"} 
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
          type="text" 
          placeholder="Email" 
          id="email"
          value={formData.email || ''}
          onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, email: e.target.value }))} 
          className="border rounded-lg p-3 " />
        <input 
          type="password" 
          placeholder="Password" 
          id="password"
          value={formData.password || ''}
          onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, password: e.target.value }))} 
          className="border rounded-lg p-3 " />
        <button 
          className="bg-slate-800 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between items-center p-4 mt-4">
        <span className="text-red-500 hover:text-red-800 cursor-pointer">Delete Account</span>
        <span className="text-red-500 hover:text-red-800 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}