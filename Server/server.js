const express = require('express');
const dotenv = require('dotenv');
const { json } = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
