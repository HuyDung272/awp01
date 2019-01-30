import Board from '../models/board';
import BaseCtrl from './base';

export default class BoardCtrl extends BaseCtrl {
  model = Board;

  // Get all
  getAll = (req, res) => {
    this.model.find({})
    .populate('project_id')
    .populate('create_by')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getByProject = (req, res) => {
    this.model.find({
      project_id: req.params.id
    })
    .populate('project_id')
    .populate('create_by')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }



}
