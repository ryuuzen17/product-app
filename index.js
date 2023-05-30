const express = require("express");
const app = express();
const port = 3000;
const { router } = require("./route/produkRoute");
const expressLsyouts = require("express-ejs-layouts");
const { client } = require("./db/db");

//memanggil ejs
app.set("view engine", "ejs");
app.use(expressLsyouts);
app.use(express.urlencoded({ extended: true }));

//built-in middleware
app.use(express.static("public"));
app.use(router);
app.get("/utama", (req, res) => {
  client.query("select * from produk", (err, result) => {
    if (!err) {
      res.render("utama", { title: "Product app", layout: "layouts/main-layouts", produk: result.rows });
    }
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h3>404</h3>");
});
client.connect((err) => {
  if (!err) {
    console.log("conected");
  } else {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
