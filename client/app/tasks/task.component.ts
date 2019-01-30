
import { Component, OnInit , Inject, ViewChild } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../shared/services/auth.service';
import { ProjectService } from '../project/project.service';
import { BoardService } from '../boards/board.service';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

///////////////////////////////////////////
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService } from './task.service';

/////////////////////////////////////

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit  {

  ///////
  todo = [
    {id: '1', name: '11'},
    {id: '2', name: '22'},
    {id: '3', name: '33'},
    {id: '4', name: '44'},
    {id: '5', name: '55'},
    {id: '6', name: '66'},
  ];

  done = [
    {id: '1', name: '1'},
    {id: '2', name: '2'},
    {id: '3', name: '3'},
    {id: '4', name: '4'},
    {id: '5', name: '5'},
    {id: '6', name: '6'},
  ];

  isLoading = true;

  board = {
    project_id: '',
    board_id: '',
  };

  projects = [];

  _id: any; // board ID
  _project_id: any;
  _board_id: any;
  opentasks = [];
  donetasks = [];
  inprogresstasks = [];

  constructor(public auth: AuthService,
    public toast: ToastComponent,
    private boardService: BoardService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    public dialog: MatDialog
) {}


  ngOnInit() {
    if (!this.auth.isDev) {
      this._id = this.route.snapshot.params['id'];
      this._board_id = this._id.slice(0, 24);
      this._project_id = this._id.slice(25, 50);
      this.getBoardInfo();
      this.getProjectInfo();
    }
    this.getOpenTask();
    this.getDoneTask();
    this.getInProgressTask();
    this.isLoading = false;
  }

  getOpenTask() {
    if (this.auth.isAdmin || this.auth.isPM) {
      this.taskService.getTaskByBoardId({board_id: this._board_id}, 'open').subscribe(
        data => this.opentasks = data,
        error => console.log(error),
        () => this.isLoading = false
      );
    } else {
      this.taskService.getTaskByDev({developer_id: this.auth.currentUser._id}, 'open').subscribe(
        data => this.opentasks = data,
        error => console.log(error),
        () => this.isLoading = false
      );
    }
  }

  getInProgressTask() {
    if (this.auth.isAdmin || this.auth.isPM) {
      this.taskService.getTaskByBoardId({board_id: this._board_id}, 'inprogress').subscribe(
        data => this.inprogresstasks = data,
        error => console.log(error),
        () => this.isLoading = false
      );
    } else {
      this.taskService.getTaskByDev({developer_id: this.auth.currentUser._id}, 'inprogress').subscribe(
        data => this.inprogresstasks = data,
        error => console.log(error),
        () => this.isLoading = false
      );
    }
  }

  getDoneTask() {
    if (this.auth.isAdmin || this.auth.isPM) {
      this.taskService.getTaskByBoardId({board_id: this._board_id}, 'done').subscribe(
        data => this.donetasks = data,
        error => console.log(error),
        () => this.isLoading = false
      );
    } else {
      this.taskService.getTaskByDev({developer_id: this.auth.currentUser._id}, 'done').subscribe(
        data => this.donetasks = data,
        error => console.log(error),
        () => this.isLoading = false
      );
    }
  }

  getBoardInfo() {
    this.boardService.getBoard({_id: this._board_id}).subscribe(
      data => this.board = data,
      error => console.log(error),
    );
  }

  getProjectInfo() {
    this.projectService.getProjectByProject({_id : this._project_id}).subscribe(
      data => this.projects = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: this._id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getOpenTask();
    this.getDoneTask();
    });
  }

  openUpdateDialog(task): void {
    const dialogRef = this.dialog.open(TaskDialogUpdateComponent, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getOpenTask();
    this.getDoneTask();
    });
  }

  save(task, progress) {
    task.progress = progress;
    this.taskService.editTask(task).subscribe(
      res => {
        this.toast.setMessage('Task settings saved!', 'success');
        // this.dialogRef.close();
      },
      error => console.log(error)
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      if (event.container.id === 'cdk-drop-list-1') {
        this.save(event.container.data[event.currentIndex], 'In Progress');
        console.log('In Progress');
      } else if (event.container.id === 'cdk-drop-list-0') {
        this.save(event.container.data[event.currentIndex], 'Open');
        console.log('Open');
      } else {
        this.save(event.container.data[event.currentIndex], 'Done');
        console.log('Done');
      }

      // console.log(event.container.data[event.currentIndex]);
    }
  }
}


@Component({
  selector: 'app-task',
  templateUrl: 'task-dialog.html',
  styleUrls: ['./task.component.scss']
})
export class TaskDialogComponent implements OnInit {

  registerForm: FormGroup;

  project_id = new FormControl('');
  board_id = new FormControl('');

  task_id = new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  description = new FormControl('', [Validators.required,
  Validators.minLength(0),
  Validators.maxLength(100),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  estimated = new FormControl('', Validators.required);

  due_date = new FormControl('', Validators.required);

  logged_date = new FormControl('', Validators.required);

  create_by = new FormControl('');

  progress = new FormControl('');

  create_at = new FormControl('');

  developer_id = new FormControl('');

  isLoading = true;

  devUsers = {};



  closeDialog() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    public toast: ToastComponent,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}



  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      project_id: this.project_id,
      board_id: this.board_id,
      task_id: this.task_id,
      description: this.description,
      estimated: this.estimated,
      due_date: this.due_date,
      logged_date: this.logged_date,
      progress: this.progress,
      create_by: this.create_by,
      create_at: this.create_at,
      developer_id: this.developer_id
    });
    this.getPMUsers();
  }



  getPMUsers() {
    this.userService.getPMUsers({_id : 'Developer'}).subscribe(
      data => this.devUsers = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  register() {
    this.registerForm.value.board_id = this.data.slice(0, 24);
    this.registerForm.value.project_id = this.data.slice(25, 50);
    this.registerForm.value.create_at = Date.now();
    this.registerForm.value.create_by = this.auth.currentUser._id,
    this.registerForm.value.progress = 'Open',
    this.taskService.addTask(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('successfully created new Task!', 'success');
        this.dialogRef.close();
      },
      error => this.toast.setMessage('error', 'danger')
    );
  }

}

@Component({
  selector: 'app-task',
  templateUrl: 'task-dialog-update.html',
  styleUrls: ['./task.component.scss']
})
export class TaskDialogUpdateComponent implements OnInit {

  isLoading = true;

  constructor(private auth: AuthService,
              public dialogRef: MatDialogRef<TaskDialogUpdateComponent>,
              public toast: ToastComponent,
              private boardService: BoardService,
              @Inject(MAT_DIALOG_DATA) public task: any) { }
  ngOnInit() {

  }



}

