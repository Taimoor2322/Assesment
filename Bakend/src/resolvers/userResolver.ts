// userResolver.ts
import { getUserById, updateUser, deleteUser , insertUser, getAllUsers  } from '../controllers/userController';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'The `JSON` scalar type represents JSON-encoded data.',
  serialize(value: any) {
    return JSON.stringify(value);
  },
  parseValue(value: any) {
    return JSON.parse(value);
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value);
    }
    return null;
  },
});

export const userResolver = {
    Query: {
        user: async (_:any, { id }: { id: string }) => {
          try {
            return await getUserById(id);
          } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
          }
        },
        allUsers: async (_: any, { page = 1, limit = 10, sortField = 'name', sortOrder = 'asc' }: { page?: number, limit?: number, sortField?: string, sortOrder?: 'asc' | 'desc' }) => {
          try {
            return await getAllUsers(page, limit, sortField, sortOrder);
          } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
          }
        },
      },
  Mutation: {
    updateUser: async (_:any, { id, data }: { id: string, data: any }) => {
        try {
          return await updateUser(id, data);
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      },
      deleteUser: async (_:any,{ id }: { id: string }) => {
        try {
          return await deleteUser(id);
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      },
      insertUser: async (_parent:any, { userData }: { userData: any }, _context:any) => {
        try {
            return await insertUser(userData);
          } catch (error) {
            console.error('Error inserting user:', error);
            throw error;
          }
        }
  },
};
