const config = require('../utils/config');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const mongoUrl = config.MONGODB_URI;

console.log('connecting to', mongoUrl);
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: {
    type: String,
    validate: {
      validator: function (v) {
        return /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}/.test(
          v
        );
      },
      message: (props) => `"${props.value}" is not a valid URL!`,
    },
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
