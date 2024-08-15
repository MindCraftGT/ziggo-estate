import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const [sideBarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    });
    console.log(listing);
    //track the current state of the sidebar data
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);

        const searchTermFromUrl = urlParams.get('searchTerm') || '';
        const typeFromUrl = urlParams.get('type') || 'all';
        const parkingFromUrl = urlParams.get('parking') === 'true';
        const furnishedFromUrl = urlParams.get('furnished') === 'true';
        const offerFromUrl = urlParams.get('offer') === 'true';
        const sortFromUrl = urlParams.get('sort') || 'created_at';
        const orderFromUrl = urlParams.get('order') || 'desc';

        setSidebarData({
            searchTerm: searchTermFromUrl,
            type: typeFromUrl,
            parking: parkingFromUrl,
            furnished: furnishedFromUrl,
            offer: offerFromUrl,
            sort: sortFromUrl,
            order: orderFromUrl
        });
        const fetchListingData = async () => {
            setLoading(true);
            try {
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setListing(data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchListingData();
    }, [location.search]);

    //track sidebar changes and update search url
    useEffect(() => {
        const params = new URLSearchParams({
            searchTerm: sideBarData.searchTerm,
            type: sideBarData.type,
            parking: sideBarData.parking.toString(),
            furnished: sideBarData.furnished.toString(),
            offer: sideBarData.offer.toString(),
            sort: sideBarData.sort,
            order: sideBarData.order
        });

        navigate(`?${params.toString()}`, { replace: true });
    }, [sideBarData, navigate]);


    //track search url changes
    const handleChange = (e) => {
        const { id, value, checked } = e.target;

        if (id === 'all' || id === 'rent' || id === 'sale') {
            setSidebarData(prevState => ({
                ...prevState,
                type: id
            }));
        } else if (id === 'searchTerm') {
            setSidebarData(prevState => ({
                ...prevState,
                searchTerm: value
            }));
        } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
            setSidebarData(prevState => ({
                ...prevState,
                [id]: checked
            }));
        } else if (id === 'sort_order') {
            const [sort, order] = value.split('_');
            setSidebarData(prevState => ({
                ...prevState,
                sort: sort || 'created_at',
                order: order || 'desc'
            }));
        }
    };
    //handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('type', sideBarData.type);
        urlParams.set('parking', sideBarData.parking.toString());
        urlParams.set('furnished', sideBarData.furnished.toString());
        urlParams.set('offer', sideBarData.offer.toString());
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('order', sideBarData.order);

        navigate(`/search?${urlParams.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 md:min-h-screen md:border-r-2">
                <form 
                    className="flex flex-col gap-8"
                    onSubmit={handleSubmit}
                >
                    <div className="flex items-center gap-2 md:border-r-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input 
                            type="text"
                            id="searchTerm"
                            placeholder='Search...'
                            className="border rounded-lg p-3 w-full"
                            value={sideBarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-3 flex-wrap items-center">
                        <label className="font-semibold">Type:</label>
                        <div className="flex gap-3 ">
                            <input 
                                type="checkbox" 
                                id="all"
                                className="w-5"
                                onChange={handleChange}
                                checked={sideBarData.type === 'all'}
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-3 ">
                            <input 
                                type="checkbox" 
                                id="rent"
                                className="w-5"
                                onChange={handleChange}
                                checked={sideBarData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-3 ">
                            <input 
                                type="checkbox" 
                                id="sale"
                                className="w-5"
                                onChange={handleChange}
                                checked={sideBarData.type === 'sale'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-3 ">
                            <input 
                                type="checkbox" 
                                id="offer"
                                className="w-5"
                                onChange={handleChange}
                                checked={sideBarData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex gap-3 flex-wrap items-center">
                        <label className="font-semibold">Amenities:</label>
                        <div className="flex gap-3 ">
                            <input 
                                type="checkbox" 
                                id="parking"
                                className="w-5"
                                onChange={handleChange}
                                checked={sideBarData.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-3 ">
                            <input 
                                type="checkbox" 
                                id="furnished"
                                className="w-5"
                                onChange={handleChange}
                                checked={sideBarData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select 
                            id="sort_order"
                            className="border rounded-lg p-3"
                            onChange={handleChange}
                            value={`${sideBarData.sort}_${sideBarData.order}`}
                        >
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>
                    <button className="bg-emerald-800 text-white text-xl border rounded-lg p-3 hover:opacity-95">Search</button>
                </form>
            </div>
            <div className="text-3xl font-semibold border-b-2 p-3 text-slate-800 mt-5">
                <h1>Listing Results:</h1>
            </div>
        </div>
    );
}
