import express, { Application } from "express";
import cors from "cors";
import countryRoutes from "./routes/country.routes";
import morgan from "morgan";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.send("Country Information API is running 🚀");
// });

app.use("/countries", countryRoutes);

export default app;
