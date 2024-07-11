import { Router } from "express";
import { getBalance, transferBalance } from "../controllers/controller.account";
import { verifyJwtToken } from "../middleware/jwtMiddleware";

const accountRouter = Router();

accountRouter.use(["/", "/transfer"], verifyJwtToken);
accountRouter.get("/", getBalance);
accountRouter.post("/transfer", transferBalance);

export { accountRouter };
