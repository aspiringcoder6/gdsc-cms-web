import express, { Express } from "express";
import dotenv from "dotenv";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import route from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
app.use(methodOverride("_method"));
app.use(cookieParser());

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

route(app);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
