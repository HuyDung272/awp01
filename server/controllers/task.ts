import Task from '../models/task';
import BaseCtrl from './base';

export default class TaskCtrl extends BaseCtrl {
  model = Task;

  getOpenByBoardId = (req, res) => {
    this.model.find({
      board_id: req.params.id,
      progress: 'Open'
    })
    .populate('board_id')
    .populate('project_id')
    .populate('developer_id')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getInProgressByBoardId = (req, res) => {
    this.model.find({
      board_id: req.params.id,
      progress: 'In Progress'
    })
    .populate('board_id')
    .populate('project_id')
    .populate('developer_id')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getDoneByBoardId = (req, res) => {
    this.model.find({
      board_id: req.params.id,
      progress: 'Done'
    })
    .populate('board_id')
    .populate('project_id')
    .populate('developer_id')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getOpenByDev = (req, res) => {
    this.model.find({
      developer_id: req.params.id,
      progress: 'Open'
    })
    .populate('board_id')
    .populate('project_id')
    .populate('developer_id')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getInProgressByDev = (req, res) => {
    this.model.find({
      developer_id: req.params.id,
      progress: 'In Progress'
    })
    .populate('board_id')
    .populate('project_id')
    .populate('developer_id')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getDoneByDev = (req, res) => {
    this.model.find({
      developer_id: req.params.id,
      progress: 'Done'
    })
    .populate('board_id')
    .populate('project_id')
    .populate('developer_id')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

}


/*
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


*/
