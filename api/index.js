const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { success } = require("../functions");   // <-- chemin important

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let CalculRouter = express.Router();

CalculRouter.route("/somme").post((req, res) => {
  let nb1 = req.body.n1;
  let nb2 = req.body.n2;
  let r = Number(nb1) + Number(nb2);
  res.json(success("la somme de " + nb1 + " et " + nb2 + " est:" + r));
});

CalculRouter.route("/produit").post((req, res) => {
  let nb1 = req.body.n1;
  let nb2 = req.body.n2;
  let r = Number(nb1) * Number(nb2);
  res.json(success("le produit de " + nb1 + " et " + nb2 + " est:" + r));
});
app.get("/", (req, res) => {
  res.json({ ok: "Good Job" });
});

app.use("/api/v1/calculs", CalculRouter);

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });


// For Vercel deployment
module.exports = app;