import * as mongoose from 'mongoose';

const taskchema = new mongoose.Schema({
  task_id: {type: String, required: true},
  board_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  description: String,
  developer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  estimated: Date,
  due_date: Date,
  logged_date: Date,
  progress: String,
  create_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  create_at: Date
});

const Task = mongoose.model('Task', taskchema);

export default Task;

