// index.ts
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from '@graphql-tools/schema';
import connectDB from './utils/database';
import { userResolver } from './resolvers/userResolver';
import { insertUser } from './controllers/userController';

// Load GraphQL schema
const typeDefs = importSchema('./src/schemas/userSchema.graphql');
const schema = makeExecutableSchema({ typeDefs, resolvers: [userResolver] });

// Initialize ApolloServer
const server = new ApolloServer({ schema });
const app = express();

const startServer = async () => {
  await server.start(); // Wait for ApolloServer to start
  server.applyMiddleware({ app });
};

startServer().then(() => {
  // Connect to MongoDB
  connectDB();
  // app.use('/createUser' , insertUser)

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
