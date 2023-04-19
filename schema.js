const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLSchema } = require('graphql');

const CourseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    author: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    topic: { type: GraphQLNonNull(GraphQLString) },
    url: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    course: {
      type: CourseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => coursesData.find(course => course.id === args.id),
    },
    courses: {
      type: GraphQLList(CourseType),
      args: {
        topic: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        if (args.topic) {
          return coursesData.filter(course => course.topic === args.topic);
        }
        return coursesData;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
});
