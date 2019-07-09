const app = require("express")();
const bodyParser = require("body-parser");

// Express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route middlewares
const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on ${process.env.SERVER_PORT}`)
);
