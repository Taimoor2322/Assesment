// userController.ts
import User from '../models/User';

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const updateUser = async (id: string, data: any) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string) => {
  console.log('====================================', id);

  return await User.findByIdAndDelete(id);
};
export const insertUser = async (userData: any) => {
  // Create a new User instance with the provided userData
  const newUser = new User(userData);
  
  try {
    // Save the new user to the database
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error:any) {
    // Handle any errors that occur during the insertion process
    throw new Error(`Error inserting user: ${error.message}`);
  }
};

export async function getAllUsers(page: number, limit: number, sortField: string, sortOrder: 'asc' | 'desc') {
  const skip = (page - 1) * limit;
  const sort = { [sortField]: sortOrder };

  const users = await User.find()
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return users;
}
