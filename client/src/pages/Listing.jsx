import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules'; //navigating from one image to another
import 'swiper/css/bundle'; //swiper css bundle for styling the sliding images
// import 'swiper/swiper-bundle.min.css'; // Make sure to import Swiper styles


export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
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
            </div>

        }
    </main>
  )
}
