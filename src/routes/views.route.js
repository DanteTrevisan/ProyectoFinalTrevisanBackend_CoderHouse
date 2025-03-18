import { Router, Request, Response } from "express";
import ProductManagerDB from "../dao/services/ProductManagerDB.js";
import validateQueryParams from "../validators/queryParams.js";
import { CartManagerDB } from "../dao/services/CartManagerDB.js";

const viewsRouter = Router()

export default viewsRouter;