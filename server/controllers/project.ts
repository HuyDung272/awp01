import Project from '../models/project';
import BaseCtrl from './base';

export default class ProjectCtrl extends BaseCtrl {
  model = Project;

  // Get all
  getAll = (req, res) => {
    this.model.find({})
    .populate('manage_by')
    .populate('create_by')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getByPM = (req, res) => {
    this.model.find({
      manage_by: req.params.id
    })
    .populate('manage_by')
    .populate('create_by')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  getByProject = (req, res) => {
    this.model.find({
      _id: req.params.id
    })
    .populate('manage_by')
    .populate('create_by')
    .exec( (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }


  // Get by id
  getByBoard = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }

}

/*
exports.showAllProjects = function (req, res){
    Project.find({
    })
    .populate('manage_by')
    .populate('create_by')
    .exec(function (error, projects){
        if(projects){
            res.json(projects);
        }else if(error){
            console.log("errorrrrrr" + error.stack);
        }
    });
}
*/
