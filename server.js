const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Define the GraphQL schema
const schema = buildSchema(`
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }

  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  }
`);

// Define the data of a few courses in an array
const coursesData = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://www.udemy.com/course/nodejs-express-mongodb-dev-to-deployment/'
  },
  {
    id: 3,
    title: 'GraphQL with Node.js: The Complete Developers Guide',
    author: 'Stephen Grider',
    description: 'Learn and master GraphQL by building real-world Node applications with Prisma, Node.js, Apollo Client, and more!',
    topic: 'GraphQL',
    url: 'https://www.udemy.com/course/graphql-with-nodejs-the-complete-developers-guide/'
  }
];

// Define the resolver functions for the GraphQL schema
const root = {
  course: ({ id }) => coursesData.find(course => course.id === id),
  courses: ({ topic }) => {
    if (topic) {
      return coursesData.filter(course => course.topic === topic);
    }
    return coursesData;
  }
};

// Create the Express server
const app = express();

// Enable CORS middleware
app.use(cors());

// Add the GraphQL endpoint to the Express server
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`GraphQL server is running on http://localhost:${port}/graphql`);
});