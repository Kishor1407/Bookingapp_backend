const express = require("express");
const router=express.Router();
const {createRoom,updateRoom, deleteRoom, getRoom,getRooms,updateRoomAvailability} = require("../controllers/room.js")
const {verifyAdmin} =require("../utils/verifyToken.js")


router.route("/:hotelid").post(verifyAdmin,createRoom);
router.route("/:id").put(verifyAdmin,updateRoom);
router.route("/availability/:id").put(updateRoomAvailability);
router.route("/:id/:hotelid").delete(verifyAdmin,deleteRoom);
router.route("/:id").get(getRoom);
router.route("/").get(getRooms);


module.exports = router;
