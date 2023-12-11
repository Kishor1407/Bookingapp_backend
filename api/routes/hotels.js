const express = require("express");
// const Hotel = require("../models/Hotel");
// const createError = require("../utils/error.js");
const {createHotel,updateHotel,deleteHotel,getHotel,getHotels,countByCity,countByType,getHotelRooms} = require("../controllers/hotel.js")
// const updateHotel = require("../controllers/hotel")
// const deleteHotel = require("../controllers/hotel")
// const getHotel = require("../controllers/hotel")
// const getHotels = require("../controllers/hotel")
const {verifyAdmin} =require("../utils/verifyToken.js")
const router = express.Router();

// Create a new hotel
router.route("/").post(verifyAdmin,createHotel);
router.route("/:id").put(verifyAdmin,updateHotel);
router.route("/:id").delete(verifyAdmin,deleteHotel);
router.route("/find/:id").get(getHotel);
router.route("/").get(getHotels);
router.route("/countByCity").get(countByCity);
router.route("/countByType").get(countByType);
router.get("/room/:id",getHotelRooms);
// router.route("/countByType").get(getHotels);


module.exports = router;



