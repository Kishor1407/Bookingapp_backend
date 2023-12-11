const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

const createHotel = async(req,res,next)=>{
    try {
        // console.log("fffffff");
        const newHotel = new Hotel(req.body);
        console.log(req.body);
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}

 const updateHotel = async(req,res,next)=>{
    try {
        const newHotel = new Hotel(req.body);
        console.log(req.body);
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}


 const deleteHotel = async(req,res,next)=>{
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json({ message: "Hotel deleted" });
    } catch (err) {
        next(err);
    }
}

 const getHotel = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}


 const getHotels = async(req,res,next)=>{
    try {
        const { min, max, ...others } = req.query;
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },
          }).limit(req.query.limit);
        if (!hotels) {
            // If the hotel is not found, you can create a custom error
            const error = new Error("Hotel not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}
 const countByCity = async(req,res,next)=>{
    const cities =req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        const hotels = await Hotel.find();
        // console.log("gehgsd")
        if (!hotels) {
            // If the hotel is not found, you can create a custom error
            const error = new Error("Hotel not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}
 const countByType = async(req,res,next)=>{
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    
        res.status(200).json([
          { type: "hotel", count: hotelCount },
          { type: "apartments", count: apartmentCount },
          { type: "resorts", count: resortCount },
          { type: "villas", count: villaCount },
          { type: "cabins", count: cabinCount },
        ]);
      } catch (err) {
        next(err);
      }
};

const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };

module.exports= {createHotel,updateHotel, deleteHotel, getHotel,getHotels,countByCity,countByType,getHotelRooms};
