import { ObjectId } from "mongodb";
import { Repair, Repairs, RepairWithId } from "./repairs.model";
import { NextFunction, Request, Response } from "express";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

export async function findAll(
  req: Request,
  res: Response<RepairWithId[]>,
  next: NextFunction
) {
  try {
    const repairs = await Repairs.find().toArray();
    res.status(200).json(repairs);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, RepairWithId>,
  res: Response<RepairWithId >,
  next: NextFunction
) {
  try {
    const repair = await Repairs.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!repair) {
      res.status(404);
      throw new Error(`Repair with id ${req.params.id} not found`);
    }
    res.status(200).json(repair);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<Record<string, never>, RepairWithId, Repair>,
  res: Response<RepairWithId>,
  next: NextFunction
) {
  try {
    const insertedRepair = await Repairs.insertOne({...req.body, createdAt: new Date()});
    if(!insertedRepair.acknowledged) {
      res.status(500);
      throw new Error("Failed to insert repair");
    }
    res.status(201).json({_id: insertedRepair.insertedId, ...req.body});
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, RepairWithId, Repair>,
  res: Response<RepairWithId>,
  next: NextFunction
) {
  try {
    const updatedRepair = await Repairs.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      {returnDocument: "after"}
    );
    if (!updatedRepair.value) {
      res.status(404);
      throw new Error(`Repair with id ${req.params.id} not found`);
    }
    res.status(200).json(updatedRepair.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) {
  try {
    const deletedRepair = await Repairs.findOneAndDelete(
      { _id: new ObjectId(req.params.id) }, {}
    );
    if (!deletedRepair) {
      res.status(404);
      throw new Error(`Repair with id ${req.params.id} not found`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}