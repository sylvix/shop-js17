import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import productsRouter from './routers/products';
import categoriesRouter from './routers/categories';
import usersRouter from './routers/users';

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(config.port, () => {
    console.log('We are live on ' + config.port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
