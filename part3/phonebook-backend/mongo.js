const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give the password as argument.');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopenbt:${password}@cluster0.a1c0bw8.mongodb.net/PhonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookShema = mongoose.Schema({
  name: String,
  number: String,
});

const PhonebookEntry = mongoose.model('Entry', phonebookShema);

if (process.argv.length === 3) {
  PhonebookEntry.find({}).then((result) => {
    console.log('Phonebook:');
    result.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 4) {
  console.log('Plese give name as well as phone number.');
  process.exit(1);
}

if (process.argv.length === 5) {
  const entry = new PhonebookEntry({
    name: process.argv[3],
    number: process.argv[4],
  });

  entry.save().then(() => {
    console.log(
      `Added ${entry.name} with number ${entry.number} to the phonebook.`
    );
    mongoose.connection.close();
  });
}

if (process.argv.length > 5) {
  console.log('Please provide the data in the folloging format:');
  console.log('"firstname lastname" phonenumber');
  process.exit(1);
}
