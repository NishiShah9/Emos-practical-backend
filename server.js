const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const ProductRoute = require("./Routes/ProductRoute");
const { MESSAGE, ROUTES } = require("./common/constant");

// add config
const app = express();
const port = process.env.PORT || 8000;
dotenv.config();

//middle ware
app.use(express.json());
app.use(cors());
//db config
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(MESSAGE.MONGODB_CONNECTED))
  .catch((err) => console.log(err));

//Api endpoint routes
app.use(ROUTES.PRODUCT, ProductRoute);

//listener
app.listen(port, () => console.log(MESSAGE.SERVER_PORT_RUNNING, port));
