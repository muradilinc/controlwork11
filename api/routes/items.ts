import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import { imagesUpload } from '../helpers/multer';
import Item from '../models/Item';
import auth, { RequestWithUser } from '../middleware/auth';

const itemsRouter = Router();

itemsRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Item.find().populate('owner');

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const product = await Item.findById(_id);

    if (!product) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(product);
  } catch (e) {
    next(e);
  }
});

itemsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const item = new Item({
        category: req.body.category,
        title: req.body.title,
        price: parseFloat(req.body.price),
        description: req.body.description,
        image: req.file ? req.file.filename : null,
        owner: req.user?._id,
      });

      await item.save();
      res.send(item);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

export default itemsRouter;
