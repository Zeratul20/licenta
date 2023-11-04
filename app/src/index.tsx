import { createApp } from "./createApp";

let cors = require("cors");

const app = createApp();

app.use(cors());
app.start();
