const { client } = require("../db/db");

const getData = (req, res) => {
  res.render("fromCreateUpdate", { title: "register", produk: "", errors: "", layout: "layouts/main-layouts" });
};
const createProduct = (req, res) => {
  const { nama_produk, keterangan, harga, jumlah } = req.body;
  client.query(`insert into produk(nama_produk, keterangan, harga, jumlah) values('${nama_produk}','${keterangan}','${harga}',${jumlah})`, (err, result) => {
    if (!err) {
      res.redirect("/utama");
    } else {
      console.log(err);
    }
  });
};
const detailProduct = (req, res) => {
  let id = req.params.id;
  client.query("select * from produk", (err, result) => {
    if (!err) {
      let produk = result.rows.filter((data) => data.produk_id == id);
      res.render("fromCreateUpdate", { title: "detail", produk, errors: "", layout: "layouts/main-layouts" });
    }
  });
};
const updateProduct = (req, res) => {
  const { nama_produk, keterangan, harga, jumlah } = req.body;
  let id = req.params.id;
  client.query(
    `update produk set nama_produk='${nama_produk}', keterangan='${keterangan}', harga='${harga}', jumlah='${jumlah}'
          where produk_id=${id}`,
    (err, result) => {
      if (!err) {
        res.redirect("/utama");
      } else {
        res.send(`error ${err.message}`);
      }
    }
  );
};
const deleteProduct = (req, res) => {
  let id = req.params.id;
  client.query(`delete from produk where produk_id=${id}`, (err, result) => {
    if (!err) {
      res.redirect("/utama");
    } else {
      res.send(`error ${err.message}`);
    }
  });
};

module.exports = { getData, createProduct, detailProduct, updateProduct, deleteProduct };
