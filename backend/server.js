import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDb from './config/connectToMongoDB.js';

dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//     }
// );

app.listen(port, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${port}`);
    }
);
