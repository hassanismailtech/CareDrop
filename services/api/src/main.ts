import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`CareDrop API is running on http://localhost:${PORT}`);
});