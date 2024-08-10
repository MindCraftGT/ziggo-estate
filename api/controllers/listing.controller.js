import Listing from "../model/listing.model.js";
import { errorHandler } from "../utils/error.js";

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

// Update a listing
export const updateListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your own listings!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

// Get a listing by its ID
export const getListing = async(req, res, next) => {
    try {
       const listing = await Listing.findById(req.params.id);
       if(!listing) {
        return next(errorHandler(404, 'Invalid'));
       }
       res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};