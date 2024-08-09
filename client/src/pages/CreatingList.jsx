import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

export default function CreatingList() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imagesUrls: [],
    });
    const [imageUploadError, setImageUploadErrors] = useState(false);
    const [uploading, setUploading] = useState(false);
    //console.log(files);
    const handleImageSubmit = () =>{
        if(files.length > 0 && files.length + formData.imagesUrls.length < 11) {
            setUploading(true);
            setImageUploadErrors(false);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(
                    storeImages(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, 
                    imagesUrls: formData.imagesUrls.concat(urls), 
                });
                setImageUploadErrors(false);
                setUploading(false);
            }).catch(() => {
                setImageUploadErrors('Image size should be less than 2mbs each');
                setUploading(false);
            });
        }else {
            setImageUploadErrors('Maximum 10 images can be uploaded');
            setUploading(false);
        }
    };

    //
    const storeImages = async(file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const state = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${state}% complete`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                       .then((downloadUrl) => {
                            resolve(downloadUrl);
                        });
                }
            )
        });
    };

    //handle delete image
    const handleDeleteImage = (index) => {
        setFormData({
            ...formData, 
            imageUrls: formData.imagesUrls.filter((_, i) => i !== index),
        });
    }

  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Create a Listing</h1>
        <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1 gap-4">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        className="border border-emerald-300 p-3 rounded-lg focus:outline-none" 
                        id="name"
                        maxLength="62" minLength="10"
                        required/>
                    <textarea 
                        type="text" 
                        placeholder="Description" 
                        className="border border-emerald-300 p-3 rounded-lg focus:outline-none" 
                        id="description"
                        required/>
                    <input 
                        type="text" 
                        placeholder="Address" 
                        className="border border-emerald-300 p-3 rounded-lg focus:outline-none" 
                        id="address"
                        required/>
                    <div className="flex gap-7 flex-wrap">
                    <div className="flex gap-2 items-center">
                        <input 
                            type="checkbox" 
                            id="sale"
                            className="w-5"/>
                        <span className="">Sell</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input 
                            type="checkbox" 
                            id="rent"
                            className="w-5"/>
                        <span className="">Rent</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input 
                            type="checkbox" 
                            id="parking"
                            className="w-5"/>
                        <span className="">Parking Spot</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input 
                            type="checkbox" 
                            id="furnished"
                            className="w-5"/>
                        <span className="">Furnished</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input 
                            type="checkbox" 
                            id="offer"
                            className="w-5"/>
                        <span className="">Offer</span>
                    </div>

                </div>
                <div className="flex flex-wrap gap-7">
                    <div className=" flex items-center gap-2">
                        <input 
                        type="number" 
                        id="bedrooms"
                        min="0"
                        max="20"
                        className="p-3 rounded-lg border border-emerald-300 focus:outline-none "/>
                        <span>Bedrooms</span>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input 
                        type="number" 
                        id="bathrooms"
                        min="0"
                        max="20"
                        className="p-3 rounded-lg border border-emerald-300 focus:outline-none "/>
                        <span>Bathrooms</span>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input 
                        type="number" 
                        id="regularPrice"
                        min="0"
                        max="20"
                        className="p-3 rounded-lg border border-emerald-300 focus:outline-none"/>
                        <div className="flex flex-col items-center">
                            <p>Regular Price</p>
                            <span className="text-xs">{`($ / Month)`}</span>
                        </div>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input 
                        type="number" 
                        id="discountedPrice"
                        min="0"
                        max="20"
                        className="p-3 rounded-lg border border-emerald-300 focus:outline-none "/>
                        <div className="flex flex-col items-center">
                            <p>Discounted Price</p>
                            <span className="text-xs">{`($ / Month)`}</span>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="flex flex-col flex-1">
                <p className="font-semibold">Images:
                    <span className="font-normal text-gray-800 ml-2">The first image will be the cover(max 10)</span>
                </p>
                <div className="flex gap-4 mt-3">
                    <input 
                        type="file"
                        id="images"
                        accept="images/*"
                        multiple
                        className="p-3 border border-emerald-300 rounded w-full focus:outline-none"
                        onChange={(e) => setFiles(e.target.files)} />
                    <button
                        type="button"
                        onClick={handleImageSubmit}
                        className="bg-emerald-800 rounded font-semibold p-3 text-white
                        hover:shadow-lg hover:opacity-95 disabled:opacity-80 focus:outline-none"
                        disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
                <p className="text-red-800 mt-2 text-sm">{imageUploadError && imageUploadError}</p>
                {
                    formData.imagesUrls.length > 0 && formData.imagesUrls.map((url, index) => (
                        <div 
                            className="flex justify-between p-3 items-center border border-emerald-300 rounded-lg" 
                            key={url} > 
                            <img 
                                src={url} alt="listing image" 
                                className="w-20 h-20 object-container rounded-lg "/>
                            <button 
                                className="p-3 text-red-800 bg-slate-300 rounded-lg hover:opacity-80"
                                type="button"
                                onClick={() => handleDeleteImage(index)}>
                                Delete
                            </button>
                        </div>
                    ))
                }
                <button 
                className="bg-emerald-800 text-white p-3 rounded-lg mt-6 hover:shadow-lg hover:opacity-95 ">
                    Create Listing
                </button>
            </div>
        </form>
    </main>
  )
}
