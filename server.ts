import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDb from "./database/connect";
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";
import mealsRouter from "./routes/mealsRoute";
import morgan from "morgan";
import { notFoundMiddleware } from "./middlewares/notFound";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use(cors({ origin: true }));
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.join(__dirname, "..", "./client/public")));
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use("/", userRouter);
app.use("/", adminRouter);
app.use("/", mealsRouter);

// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "..", "./client/build", "index.html"));
// });

app.use(notFoundMiddleware);
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL as string);
    app.listen(port, () => {
      console.log(`⚡️server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
