import { Router } from "express";
import { getDishes } from "../../controllers/dish/dish";

const router = Router();

router.route("/").get(getDishes);

export default router;
