const Room = require("../models/Room.js");
const Hotel = require("../models/Hotel.js");
const {createError} =require("../utils/error.js")

const createRoom = async (req,res,next) => {
    const hotelId = req.params.hotelid;
    const newRoom= new Room(req.body)
    try{
        const savedRoom = await newRoom.save()
         try{
            await Hotel.findByIdAndUpdate(hotelId,{$push :{rooms: savedRoom._id}});
         }
         catch(err){
            next(err)
         }
         res.status(200).json(savedRoom);
    }
    catch(err){
        next(err);
    }
};
const updateRoom = async(req,res,next)=>{
    try {
        const newRoom = new Room(req.body);
        console.log(req.body);
        const updatedHotel = await Room.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };

 const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };
 const getRoom = async(req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id);

        if (!Room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}


 const getRooms = async(req,res,next)=>{
    try {
        const rooms = await Room.find();
        // console.log("gehgsd")
        if (!rooms) {
            // If the room is not found, you can create a custom error
            const error = new Error("Room not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}

module.exports= {createRoom,updateRoom, deleteRoom, getRoom,getRooms,updateRoomAvailability};