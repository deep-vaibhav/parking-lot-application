import {
  exitVehicle,
  getVehicleParkingHistory,
  parkVehicle,
  registerParkingLot,
} from "../controllers";

const express = require("express");
const router = express.Router();

router.post("/register", registerParkingLot);
router.post("/:parking_lot_name/park", parkVehicle);
router.post("/:parking_lot_name/exit", exitVehicle);
router.get("/parking/:vehicle_number", getVehicleParkingHistory);

module.exports = router;
