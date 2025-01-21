const express = require('express');
const dotenv = require('dotenv');
const app = express();
const db = require('./config/db');  

dotenv.config();  
app.use(express.json());  


const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
