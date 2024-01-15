import { Router } from "express";
import eventController from "../api/controllers/musicController";

export const singleRouter = Router();
singleRouter.get("/singles", eventController.listAllSingle);
singleRouter.get("/single/:singleId", eventController.listOneSingle);
singleRouter.post("/single", eventController.saveSingle);
singleRouter.put("/single/:singleId", eventController.updateSingle);
singleRouter.delete("/single/:singleId", eventController.deleteSingle);
