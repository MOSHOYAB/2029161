const express = require("express");
const app = express();
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 4000;


app.use(express.json());

require("./config/database.js").connect();


const user = require("./routes/user");
app.use("/train", user);


app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})
// index.js
// const express = require('express');
// const trainRoutes = require('./routes/trainRoutes');

// const app = express();
// require('dotenv').config();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use('/api', trainRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
