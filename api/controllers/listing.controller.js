import Listing from "../model/listing.model.js";

// Create a new listing
export const createListing = async(req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

//this function needs to be redone to ensure that it allows deletion of a listing from the database using POSTMAN
export const deleteListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    };

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only delete your own listings!'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing deleted successfully!');
    } catch (error) {
        next(error);
    }
}