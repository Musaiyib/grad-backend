require("dotenv").config({ path: require("find-config")(".env") });
const express = require("express");
const colors = require("colors");
const connectDB = require("./config");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const paymentRoute = require("./routes/paymentRoute");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/payments", paymentRoute);

const port = process.env.PORT || 4000;
app.listen(port, console.log(`Listening at port ${port}`));
