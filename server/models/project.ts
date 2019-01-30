import * as mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  project_id: { type: String, required: true },
  description: String,
  manage_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  start_date: Date,
  end_date: Date,
  create_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  create_at: Date
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
