import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { Navigation } from 'swiper/modules';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(saleListings)

  useEffect(() => {
    // fetch listings with offer, sale and rent
    const fetchOfferListings = async() => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchSalesListings();
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();

    const fetchSalesListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }
    fetchSalesListings();

    const fetchRentListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRentListings();
  }, [])
  return (
    <div>
      {/* top */}
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className='text-slate-700 font-bold gap-6 text-3xl lg:text-6xl'>
            Find Your Next <span className="text-slate-500">Perfect</span> <br />Place With Ease!
          </h1>
          <div className="text-gray-400 text-xm sm:text-sm">
            <p>
              Zigo Estate is the best company in the world to provide you with a great service to improve your business in real estate and improve your business performance. <br />
              We have a wide variety of properties to choose from.
            </p>
          </div>
          <Link to="/search" className="text-xs sm:text-sm text-emerald-500 font-bold hover:underline">
            Let&apos;s get started...
          </Link>
        </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListings && offerListings.length > 0 
          && offerListings.map((listing) => (
          // eslint-disable-next-line react/jsx-key
          <SwiperSlide>
            <div 
            style={{
              background:`url(${listing.imageUrls[0]}) center no-repeat`,
              backgroundSize: 'cover'
            }}
            className="h-[500px]" 
            key={listing._id}></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/*Listing results for offer, sales and rent */}
      <div className="max-w-6xl mx-auto p-3 flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Property Offers</h2>
              <Link to={'/search?offer=true'} className='text-sm text-emerald-800 hover:underline'>
                Show More Offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Property Sales</h2>
              <Link to={'/search?type=sale'} className='text-sm text-emerald-800 hover:underline'>
                Show More Sales
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Property for Rental</h2>
              <Link to={'/search?type=rent'} className='text-sm text-emerald-800 hover:underline'>
                Show More Rentals
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
