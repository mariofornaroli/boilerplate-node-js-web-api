const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;
const songSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Song must have title'],
  },
  url: {
    type: String,
    required: [true, 'Song must have url'],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});
songSchema.plugin(mongoosePaginate);
mongoose.model('Song', songSchema);
