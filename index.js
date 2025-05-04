const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const productRouter=require('./router/ProductRouter');
const orderRouter=require('./router/orderRouter');
dotenv.config();
connectdb();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", require("./router/userRoutes"));
app.use("/api/products", require("./router/ProductRouter"));
app.use("/api/orders", require("./router/orderRouter"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/", (req, res) => {
    res.send("API is running...");
});
import cors from 'cors'; 
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
