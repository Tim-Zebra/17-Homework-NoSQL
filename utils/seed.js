const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomName, getRandomThought, getRandomReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  await Reaction.deleteMatn({});

  // Create empty array to hold the users
  const users = [];
  
  const thoughts = [];

  // Add 6 users to arrays
  for (let i = 0; i < 6; i++) {
    const username = getRandomName();

    users.push({
      username
    });
  }

  // Creates 20 thoughts and randomly assigns them to users, also adds reactions
    for(let k = 0; k < 20; k++) {
      let randomNum = randomNumber(users.length);
      
      const thoughtText = getRandomThought();

      const username = users[randomNum].username;

      // Adds up to 5 reactions
      const reactions = [];
      for(let k = 0; k < randomNumber(5); k++) {
    
        const reactionBody = getRandomReaction();
        const username = getRandomName();

        reactions.push({
          reactionBody,
          username,
        })
      }

      thoughts.push({
        thoughtText,
        username,
        reactions,
      })
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
  console.table(thoughts);
  console.table(reactions);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

// Max is the highest number that should be received. Need to add 1 to max when using Math.floor to acheive.
const randomNumber = (max) => Math.floor(Math.random() * max+1);