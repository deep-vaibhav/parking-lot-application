import mongoose, { Schema } from "mongoose";

const parkingSchema = new Schema({
  parking_lot: {
    type: String,
  },
  amount_paid: {
    type: Number,
  },
  parking_entry_time: {
    type: Date,
    default: Date.now(),
  },
  parking_exit_time: {
    type: Date,
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
  },
});

const Parking = mongoose.model("Parking", parkingSchema);

export { Parking };
