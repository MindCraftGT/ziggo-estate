import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules'; //navigating from one image to another
import 'swiper/css/bundle'; //swiper css bundle for styling the sliding images
// import 'swiper/swiper-bundle.min.css'; // Make sure to import Swiper styles
import {
 FaBath,
 FaParking,
 FaBed,
 FaMapMarkerAlt,
 FaShare,
 FaChair,
} from 'react-icons/fa';
import Contact from "../components/Contact";


export default function Listing() {
    const params = useParams();
    const { currentUser } = useSelector(state => state.user);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(false);
    const [showContact, setShowContact] = useState(false);
    SwiperCore.use([Navigation]); //using navigation module for swiper


    useEffect(() => {
        const fetchListing = async () => {
            // setListing(false);
            setLoading(true);
            try {
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
            setListing(data);
            setLoading(false);
            setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId])
  return (
    <main>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && (<p className="text-center my-7 text-2xl">Error fetching listing</p>)}
        {listing && !loading && !error && 
            <div>
                <Swiper navigation >
                    {listing.imageUrls.map((url) => 
                        (
                        <SwiperSlide key={url}>
                            <div 
                                className="h-[550px]" 
                                style={{background:`url(${url}) center no-repeat`,
                                backgroundSize: 'cover'
                            }}></div>
                        </SwiperSlide>
                        )
                    )}
                </Swiper>
                <div 
                    className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12
                        flex justify-center items-center bg-slate-200 cursor-pointer ">
                    <FaShare 
                        className="text-slate-600"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 3000);
                        }}
                    />
                 </div>
                    {copied && (
                        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-emerald-200 text-white p-2">
                            Link Copied
                        </p>
                    )}
                    <div className="flex flex-col max-w-4xl mx-auto p-3 gap-4 my-7">
                        <p className="text-2xl font-semibold">
                            {listing.name} - KES{' '}
                            {listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                            {listing.type === 'rent' && ' / month'}

                        </p>
                        <p className="flex items-center mt-6 gap-2 text-slate-700 text-sm">
                            <FaMapMarkerAlt className="text-emerald-800" />
                            {listing.address}
                        </p>
                        <div className="flex gap-4">
                            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </p>
                            {listing.offer && 
                            (<p className="bg-emerald-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                                KES{+listing.regularPrice - +listing.discountedPrice} OFF
                            </p>
                            )}
                        </div>
                        <p className="">
                        <span className="text-2xl font-semibold">
                            Description - 
                        </span> 
                        {' '}{listing.description}
                    </p>
                    <ul className="whitespace-nowrap text-emerald-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                        <li className="flex items-center gap-1">
                            <FaBed className="text-lg"/>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Beds`: `${listing.bedrooms} Bed`}
                        </li>
                        <li className="flex items-center gap-1">
                            <FaBath className="text-lg"/>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms`: `${listing.bathrooms} Bathroom`}
                        </li>
                        <li className="flex items-center gap-1">
                            <FaParking className="text-lg"/>
                            {listing.parking ? 'Parking Available': 'No Parking Available'}
                        </li>
                        <li className="flex items-center gap-1">
                            <FaChair className="text-lg"/>
                            {listing.furnished ? 'Furnished': 'Not Furnished'}
                        </li>
                    </ul>
                    {currentUser && listing.userRef !== currentUser._id && !showContact && (
                        <button 
                            onClick={() => setShowContact(true)}
                            className="bg-emerald-800 text-white rounded-lg hover:opacity-95 p-3"
                        >
                            Contact Landlord
                        </button>
                    )}
                    {showContact && <Contact listing={listing}/>}
                    </div>
            </div>
        }
    </main>
  )
}
