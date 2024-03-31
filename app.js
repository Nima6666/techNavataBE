const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// databases connections
const ConnectDB = require("./DataBase/ConnectDb");
ConnectDB();

// middleware
app.use(cors());
app.use(express.json());

const contactRoute = require("./Routes/UserRoutes");
app.use("/api", contactRoute);

app.listen(PORT, () => {
    console.log(` Server listening on ${PORT}`);
});
