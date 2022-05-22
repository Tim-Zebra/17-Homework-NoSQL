const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = [];
  
  const thoughts = [];

  // Add 10 users to arrays
  for (let i = 0; i < 10; i++) {
    const username = getRandomName();

    // Thoughts are looked up by username, this creates the thought using the instance of the username.
    createThought(username);

    users.push({
      username
    });
  }

  // Creates 0-5 thoughts
  const createThought = (username) => {
    let thoughtNum = Math.random(6);
    for(let k = 0; k < thoughtNum; k++) {
      let thoughtText = getRandomAssignments();

      thoughts.push({
        thoughtText,
        username,
      })
    }
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  await Thought.collection.insertMany(thoughts);

  // Add courses to the collection and await the results
  // await Course.collection.insertOne({
  //   courseName: 'UCLA',
  //   inPerson: false,
  //   students: [...students],
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
