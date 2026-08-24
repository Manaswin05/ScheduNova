import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow specific origin in production, all origins in dev
const allowedOrigin = process.env.FRONTEND_URL || '*';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'schedunova-node-api' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/schedunova')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Node backend running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });
