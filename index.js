
const express = require('express');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
require("./config/database.js").connect();



const routes = require('./routes/train');
app.use("/api", user);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
