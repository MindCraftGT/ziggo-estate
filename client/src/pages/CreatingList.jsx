

export default function CreatingList() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Create a Listing</h1>
        <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1 gap-4">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        className="border border-emerald-300 p-3 rounded-lg" 
                        id="name"
                        maxLength="62" minLength="10"
                        required/>
                    <textarea 
                        type="text" 
                        placeholder="Description" 
                        className="border border-emerald-300 p-3 rounded-lg" 
                        id="description"
                        required/>
                    <input 
                        type="text" 
                        placeholder="Address" 
                        className="border border-emerald-300 p-3 rounded-lg" 
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
                        className="p-3 rounded-lg border border-emerald-300 "/>
                        <span>Bedrooms</span>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input 
                        type="number" 
                        id="bathrooms"
                        min="0"
                        max="20"
                        className="p-3 rounded-lg border border-emerald-300 "/>
                        <span>Bathrooms</span>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input 
                        type="number" 
                        id="regularPrice"
                        min="0"
                        max="20"
                        className="p-3 rounded-lg border border-emerald-300"/>
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
                        className="p-3 rounded-lg border border-emerald-300 "/>
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
                        className="p-3 border border-emerald-300 rounded w-full" />
                    <button 
                    className="bg-emerald-800 rounded font-semibold p-3 text-white
                    hover:shadow-lg hover:opacity-95 disabled:opacity-80">
                        Upload
                    </button>
                </div>
                <button 
                className="bg-emerald-800 text-white p-3 rounded-lg mt-6 hover:shadow-lg hover:opacity-95 ">
                    Create Listing
                </button>
            </div>
        </form>
    </main>
  )
}
