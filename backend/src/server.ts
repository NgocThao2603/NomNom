import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import dishRoutes from './routes/dishRoutes';

dotenv.config();

const app = express();

app.use(express.json());
// Routes declaration
import dishesRoute from './routes/dish/dish';

// Use routes
app.use('/dish', dishesRoute);

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// API kiểm tra kết nối
app.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Kết nối thành công!', result: rows });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi kết nối MySQL', error });
  }
});

app.use('/api/dishes', dishRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
