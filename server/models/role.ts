import * as mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  rolename: {type: String, required: true},
  description: String
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
