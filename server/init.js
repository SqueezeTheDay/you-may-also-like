// loads example date to mongoDB on npm run seed

const db = require('../db/index');
const exampleData = require('../db/exampleData');

db.RelatedItems.insertMany(exampleData, (err, docs) => {
  if (err) {
    console.log('there was an error adding items to the database');
  } else {
    console.log('Many items were successfully added to the database', docs);
  }
});
