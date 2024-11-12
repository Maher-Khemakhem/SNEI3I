const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Product = require("./models/mydataSchema");
const productRoute = require("./routes/product.route");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

app.set('view engine', 'ejs');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/products",productRoute);


// Auto refresh setup
/*
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
*/
mongoose
  .connect('mongodb+srv://maherkhemakhem:OZXvWbLKbnAZqTpT@cluster0.6gotj.mongodb.net/all-data?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Routes
app.get('/', async (req, res) => {
  res.send("Hello from node API server updated");
});






