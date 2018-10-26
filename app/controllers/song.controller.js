const Joi = require('joi');
const mongoose = require('mongoose');
const Song = mongoose.model('Song');

/* Create Item */
const createFunc = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      url: Joi.string().required(),
      rating: Joi.number()
        .integer()
        .min(0)
        .max(5)
        .optional(),
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).json(error);
    }
    console.log(Song);
    const song = await Song.create(value);
    return res.json(song);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

/* Find all Items */
const findAllFunc = async (req, res) => {
  try {
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 10,
    };
    const songs = await Song.paginate({}, options);
    return res.json(songs);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

/* Find Item by id */
const findOneFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ err: 'could not find song' });
    }
    return res.json(song);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

/* Delete Item by id */
const deleteFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findOneAndRemove({ _id: id });
    if (!song) {
      return res.status(404).json({ err: 'could not find song' });
    }
    return res.json(song);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

/* Update Item by id */
const updateFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const schema = Joi.object().keys({
      title: Joi.string().optional(),
      url: Joi.string().optional(),
      rating: Joi.number()
        .integer()
        .min(0)
        .max(5)
        .optional(),
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).json(error);
    }
    const song = await Song.findOneAndUpdate({ _id: id }, value, { new: true });
    if (!song) {
      return res.status(404).json({ err: 'could not find song' });
    }
    return res.json(song);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

module.exports =  {
  create: createFunc,
  findAll: findAllFunc,
  findOne: findOneFunc,
  delete: deleteFunc,
  update: updateFunc
};
