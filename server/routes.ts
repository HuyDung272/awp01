import * as express from 'express';

import UserCtrl from './controllers/user';
import RoleCtrl from './controllers/role';
import ProjectCtrl from './controllers/project';
import BoardCtrl from './controllers/board';
import TaskCtrl from './controllers/task';

import User from './models/user';
import Role from './models/role';
import Project from './models/project';
import Board from './models/board';
import Task from './models/task';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const roleCtrl = new RoleCtrl();
  const projectCtrl = new ProjectCtrl();
  const boardCtrl = new BoardCtrl();
  const taskCtrl = new TaskCtrl();

  ///////////////////////////////////////////////////
  // Users
  ///////////////////////////////////////////////////
  // Login
  router.route('/login').post(userCtrl.login);
  // Get All User
  router.route('/users').get(userCtrl.getAll);
  // Get List Project Manager
  router.route('/pmusers/:id').get(userCtrl.getPMUser);
  // Count number Users
  router.route('/users/count').get(userCtrl.count);
  // Add new user
  router.route('/user').post(userCtrl.insert);
  // Get user
  router.route('/user/:id').get(userCtrl.get);
  // Update user
  router.route('/user/:id').put(userCtrl.update);
  // Delete user
  router.route('/user/:id').delete(userCtrl.delete);


  ///////////////////////////////////////////////////
  // Roles
  ///////////////////////////////////////////////////
  // Get all role
  router.route('/roles').get(roleCtrl.getAll);

  ///////////////////////////////////////////////////
  // Projects
  ///////////////////////////////////////////////////
  // Get all Projects
  router.route('/projects').get(projectCtrl.getAll);
  // Get projects by Project Manager
  router.route('/projects/:id').get(projectCtrl.getByPM);
  // Add new project
  router.route('/project').post(projectCtrl.insert);
  // Get Information of Project
  router.route('/project/project/:id').get(projectCtrl.getByProject);
  // Get Projects by Board
  router.route('/project/board/:id').get(projectCtrl.getByBoard);
  // Get Projects
  router.route('/project/:id').get(projectCtrl.get);
  // Delete project
  router.route('/project/:id').delete(projectCtrl.delete);
  // Update project
  router.route('/project/:id').put(projectCtrl.update);

  ///////////////////////////////////////////////////
  // Board
  ///////////////////////////////////////////////////
  // Get all Boards
  router.route('/boards').get(boardCtrl.getAll);
  // Get all boards of project
  router.route('/boards/:id').get(boardCtrl.getByProject);
  // Add new board
  router.route('/board').post(boardCtrl.insert);
  // Get all broads
  router.route('/board/:id').get(boardCtrl.get);
  // delete broad
  router.route('/board/:id').delete(boardCtrl.delete);
  // update board
  router.route('/board/:id').put(boardCtrl.update);

  ///////////////////////////////////////////////////
  // Task
  ///////////////////////////////////////////////////
  // Get all Task
  router.route('/tasks').get(taskCtrl.getAll);
  // add new Task
  router.route('/task').post(taskCtrl.insert);
  // Get tasks open
  router.route('/tasks/open/:id').get(taskCtrl.getOpenByBoardId);
  // Get tasks done
  router.route('/tasks/done/:id').get(taskCtrl.getDoneByBoardId);
  // Get tasks open inprogress
  router.route('/tasks/inprogress/:id').get(taskCtrl.getInProgressByBoardId);
  // Get tasks open by dev
  router.route('/tasks/dev/open/:id').get(taskCtrl.getOpenByDev);
  // Get tasks done by dev
  router.route('/tasks/dev/done/:id').get(taskCtrl.getDoneByDev);
  // Get tasks open inprogress by dev
  router.route('/tasks/dev/inprogress/:id').get(taskCtrl.getInProgressByDev);
  // update task
  router.route('/task/:id').put(taskCtrl.update);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
