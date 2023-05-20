const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB: ", error.message);
  });

const phonebookShema = mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters long!"],
    required: true,
  },
  number: {
    type: String,
    minLength: [8, "Number must be at least 8 characters long!"],
    validate: {
      validator: function (v) {
        let test = /\d{3}-\d{7}/.test(v);
        if (test) return test;
        test = /\d{2}-\d{8}/.test(v);
        return test;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Phone number required!"],
  },
});

phonebookShema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Entry", phonebookShema);
