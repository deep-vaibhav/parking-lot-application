import { Request, Response } from "express";
import { Parking } from "../models/parking.model";
import { ParkingLot } from "../models/parkinglot.model";
import { Vehicle } from "../models/vehicle.model";

export const registerParkingLot = async (req: Request, res: Response) => {
  try {
    const params = {
      name: req.body.name,
      capacity: {
        SUV: { total: req.body.suv_capacity, available: req.body.suv_capacity },
        HATCHBACK: {
          total: req.body.hatchback_capacity,
          available: req.body.hatchback_capacity,
        },
        TWO_WHEELER: {
          total: req.body.two_wheeler_capacity,
          available: req.body.two_wheeler_capacity,
        },
      },
      rates: {
        SUV: req.body.suv_rate,
        HATCHBACK: req.body.hatchback_rate,
        TWO_WHEELER: req.body.two_wheeler_rate,
      },
    };
    const parkingLot = new ParkingLot(params);

    await parkingLot.save();
    return res.status(200).send({ err: null, data: parkingLot });
  } catch (err) {
    res.status(500).send({ err, data: null });
  }
};

export const parkVehicle = async (req: Request, res: Response) => {
  try {
    // get parking lot
    const parkingLot = await ParkingLot.findOne({
      name: req.params.parking_lot_name,
    });

    // add new vehicle
    const vehicleParams = {
      vehicle_type: req.body.vehicle_type,
      vehicle_number: req.body.vehicle_number,
    };
    let vehicle = new Vehicle(vehicleParams);
    vehicle = await vehicle.save();

    // check if given parking lot has space available for this vehicle
    const space = parkingLot.capacity[req.body.vehicle_type].available;

    // if space is available, park
    if (space > 0) {
      const parking = new Parking({
        parking_lot: parkingLot.name,
        vehicle: vehicle._id,
      });
      await parking.save();

      // decrement available count from parking lot
      await ParkingLot.findOneAndUpdate(
        { _id: parkingLot._id },
        {
          $inc: { [`capacity.${req.body.vehicle_type}.available`]: -1 },
        }
      );

      return res
        .status(200)
        .send({ err: null, data: "Vehicle parked successfully!" });
    }
    // if space is not available, leave
    return res.status(200).send({ err: null, data: "Space not available!" });
  } catch (err) {
    res.status(500).send({ err, data: null });
  }
};

export const exitVehicle = async (req: Request, res: Response) => {
  try {
    // get parking lot
    const parkingLot = await ParkingLot.findOne({
      name: req.params.parking_lot_name,
    });

    // get exiting vehicle
    const vehicle = await Vehicle.findOne({
      vehicle_number: req.body.vehicle_number,
    });

    const parking = await Parking.findOne({ vehicle: vehicle._id });

    const parking_exit_time: any = new Date();
    const parking_entry_time: any = new Date(parking.parking_entry_time);

    // get hours parked
    const hoursParked =
      Math.round(Math.abs((parking_exit_time - parking_entry_time) / 36e5)) + 1;

    const rate = parkingLot.rates[vehicle.vehicle_type];

    // calculate parking amount due
    const amount_due = hoursParked * rate;

    await Parking.findOneAndUpdate(
      {
        _id: parking._id,
      },
      {
        $set: {
          parking_exit_time,
          amount_paid: amount_due,
        },
      }
    );

    // increment available space of vehicle in parking lot
    await ParkingLot.findOneAndUpdate(
      { _id: parkingLot._id },
      {
        $inc: { [`capacity.${req.body.vehicle_type}.available`]: 1 },
      }
    );

    return res
      .status(200)
      .send({ err: null, data: "Vehicle exit successfull!" });
  } catch (err) {
    res.status(500).send({ err, data: null });
  }
};

export const getVehicleParkingHistory = async (req: Request, res: Response) => {
  try {
    const parkings = await Parking.find({
      vehicle_number: req.body.vehicle_number,
    });
    return res.status(200).send({ err: null, data: parkings });
  } catch (err) {
    res.status(500).send({ err, data: null });
  }
};
