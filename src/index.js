import express from 'express';
import cors from 'cors';
import usersRoute from './routes/users.route.js';
import transactionsRoute from './routes/transactions.route.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRoute);
app.use(transactionsRoute);

const port = process.env.PORT || 3333;
app.listen(port);