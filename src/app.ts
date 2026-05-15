import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  //   res.send("Hello World!");
  res.status(200).json({
    message: "Espress Server Siktechi",
    author: "sadhin bro",
  });
});
app.use("/api/users", userRouter);

export default app;
