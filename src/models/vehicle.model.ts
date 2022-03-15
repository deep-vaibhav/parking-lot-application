import mongoose, { Schema } from "mongoose";

enum VehicleTypes {
  SUV = "SUV",
  HATCHBACK = "HATCHBACK",
  TWOWHEELER = "TWO_WHEELER",
}

const vehicleSchema = new Schema({
  vehicle_type: {
    type: String,
    enum: VehicleTypes,
    required: true,
  },
  vehicle_number: {
    type: String,
    required: true,
  },
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "Parking",
    },
  ],
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export { Vehicle };
