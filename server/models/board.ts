import * as mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  board_id: { type: String, required: true },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  description: String,
  start_date: Date,
  end_date: Date,
  create_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  create_at: Date
});

const Board = mongoose.model('Board', boardSchema);

export default Board;

