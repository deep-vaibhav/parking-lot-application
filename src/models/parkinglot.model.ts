import mongoose, { Schema } from "mongoose";

enum VehicleTypes {
  SUV = "SUV",
  HATCHBACK = "HATCHBACK",
  TWOWHEELER = "TWO_WHEELER",
}

const parkingLotSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  rates: {
    SUV: {
      type: Number,
    },
    HATCHBACK: {
      type: Number,
    },
    TWO_WHEELER: {
      type: Number,
    },
  },
  capacity: {
    SUV: {
      total: { type: Number, required: true },
      available: { type: Number },
    },
    HATCHBACK: {
      total: { type: Number, required: true },
      available: { type: Number },
    },
    TWO_WHEELER: {
      total: { type: Number, required: true },
      available: { type: Number },
    },
  },
  parkings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Parking",
    },
  ],
});

const ParkingLot = mongoose.model("ParkingLot", parkingLotSchema);

export { ParkingLot };
