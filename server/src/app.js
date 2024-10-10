const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const supabase = require('./config/supabase.js');
const authRoutes = require('./routes/authRoutes.js');
const imageUploadRoutes = require('./routes/imageUploadRoutes');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

if (!process.env.SUPABASE_JWT_SECRET) {
  console.error('SUPABASE_JWT_SECRET is not set in the environment variables');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/upload', uploadRoutes);
app.use('/auth', authRoutes);
app.use('/api/images', imageRoutes);

app.get('/', (req, res) => {
  res.send('Picky API is running');
});

const errorHandler = require('./middleware/errorHandler');

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
