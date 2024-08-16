import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdLocationOn, } from "react-icons/md";

export default function ListingItem( {listing}) {
  return <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
    <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt="Image Listings on Search"
        className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" />
        <div className="p-3 flex flex-col gap-2">
            <p className="truncate text-lg font-semibold">{listing.name}</p>
        </div>
        <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-800"/>
            <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
        </div>
        <div className="">
            <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
            <p className="text-slate-500 mt-2 font-semibold flex items-center">
                $
                {listing.offer ? listing.discountedPrice.toLocaleString('en-us') : listing.regularPrice.toLocaleString('en-us')}
                {listing.type === 'rent' && ' / month'}
            </p>
            <div className="text-slate-700 flex justify-between">
                <div className="font-bold text-sm">

                    {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                </div>
                <div className="font-bold text-sm">

                    {listing.bathrooms > 1 ? `${listing.bathrooms} Beds` : `${listing.bathrooms} Bed`}
                </div>
            </div>
        </div>
    </Link>
  </div>;
}

ListingItem.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number,
    offer: PropTypes.bool.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    furnished: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};