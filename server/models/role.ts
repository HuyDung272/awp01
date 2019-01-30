import * as mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  rolename: {type: String, required: true},
  description: String
});

const Role = mongoose.model('Role', roleSchema);

export default Role;

/*
//-------------------Role schema----------------------------------//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// created schema for Role
var roleSchema = new Schema({
  rolename: {type: String, required: true},
  description: String
});

var Role = mongoose.model('Role', roleSchema);

module.exports = Role;
*/
