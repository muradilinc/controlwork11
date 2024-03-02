import express from 'express';
import usersRouter from './routes/users';
import mongoose from 'mongoose';
import config from './config';
import categoriesRouter from './routes/category';
import itemsRouter from './routes/items';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log('connecting port: ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
    console.log('disconnected');
  });
};

void run();
