import { Router } from "express";
import * as RepairsController from "./repairs.controller";
import { requestValidator, verifyToken } from "../../middlewares";
import { Repair } from "./repairs.model";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

const router = Router();

router.get("/", verifyToken, RepairsController.findAll);
router.get("/:id", verifyToken, requestValidator({ params: ParamsWithId }), RepairsController.findOne);
router.put("/:id",  verifyToken, requestValidator({ params: ParamsWithId, body: Repair }), RepairsController.updateOne);
router.post(
  "/",
  requestValidator({ body: Repair }),
  RepairsController.createOne
);
router.delete("/:id", verifyToken, requestValidator({ params: ParamsWithId }), RepairsController.deleteOne);

export default router;
