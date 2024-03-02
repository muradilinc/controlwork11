import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import Item from './models/Item';
import User from './models/User';
import crypto from 'crypto';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['categories', 'items', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [game, tv, room] = await Category.create(
    {
      title: 'Game console',
      description: 'Gaming',
    },
    {
      title: 'TVs',
      description: 'Televizory',
    },
    {
      title: 'Room part',
      description: 'Room part',
    },
  );

  const [user1, user2] = await User.create(
    {
      username: 'godjo',
      password: 'satoru',
      nickname: 'strongest',
      phone: '+99904589',
      token: crypto.randomUUID(),
    },
    {
      username: 'minato',
      password: 'namikadze',
      nickname: 'yellow light',
      phone: '+999999999',
      token: crypto.randomUUID(),
    },
  );

  await Item.create({
    title: 'PS 5',
    image: 'fixtures/ps5.png',
    description: 'desc of ps5',
    category: game,
    owner: user1,
    price: 50000,
  });

  await Item.create({
    title: 'PS 4',
    image: 'fixtures/ps5.png',
    description: 'desc of ps4',
    category: game,
    owner: user2,
    price: 55000,
  });
  await Item.create({
    title: 'Tv lg45',
    image: 'fixtures/ps5.png',
    description: 'desc of TV',
    category: tv,
    owner: user1,
    price: 150000,
  });
  await Item.create({
    title: 'table',
    image: 'fixtures/ps5.png',
    description: 'desc of table',
    category: room,
    owner: user1,
    price: 5000,
  });
  await Item.create({
    title: 'sofa',
    image: 'fixtures/ps5.png',
    description: 'desc of sofa',
    category: room,
    owner: user2,
    price: 150000,
  });
  await Item.create({
    title: 'Arm chair',
    image: 'fixtures/ps5.png',
    description: 'desc of arm chair',
    category: room,
    owner: user2,
    price: 80000,
  });
  await Item.create({
    title: 'Tv samsung',
    image: 'fixtures/ps5.png',
    description: 'desc of tv samsung!',
    category: tv,
    owner: user1,
    price: 120000,
  });

  await db.close();
};

void run();
