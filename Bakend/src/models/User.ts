// User.ts
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String},
  email: { type: String},
  contact: { type: String},
  address: { type: String},
  city: { type: String},
  zip: { type: String},
  // Other user properties
});

export default model('User', userSchema);
