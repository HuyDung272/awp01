
import { Component, OnInit , Inject, ViewChild } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../shared/services/auth.service';
import { ProjectService } from '../project/project.service';
import { BoardService } from './board.service';
import { ActivatedRoute } from '@angular/router';



import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

///////////////////////////////////////////
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource} from '@angular/material';
/////////////////////////////////////


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit  {

  _id: any;

  boards = [];

  projects = [];

  isLoading = true;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private boardService: BoardService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              public dialog: MatDialog
    ) {}


  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.getBoards();
    this.getProjectInfo();
  }

  getProjectInfo() {
    this.projectService.getProjectByProject({_id : this._id}).subscribe(
      data => this.projects = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getAllBoards() {
      this.boardService.getAllBoards().subscribe(
        data => this.boards = data,
        error => console.log(error),
        () => this.isLoading = false
      );
  }

  getBoards() {
    this.boardService.getBoardByProject({ project_id : this._id }).subscribe(
      data => this.boards = data,
      error => console.log(error),
      () => this.isLoading = false
    );
}


  deleteBoard(board) {
    this.boardService.deleteBoard(board).subscribe(
      data => this.toast.setMessage('Board deleted successfully.', 'success'),
      error => console.log(error),
      () => this.getBoards()
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: this._id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBoards();
    });
  }

  openUpdateDialog(board): void {
    const dialogRef = this.dialog.open(BoardDialogUpdateComponent, {
      width: '400px',
      data: board._id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBoards();
    });
  }

}

@Component({
  selector: 'app-board',
  templateUrl: 'board-dialog.html',
  styleUrls: ['./board.component.scss']
})
export class BoardDialogComponent implements OnInit {

  registerForm: FormGroup;

  project_id = new FormControl('');

  board_id = new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  description = new FormControl('', [Validators.required,
  Validators.minLength(0),
  Validators.maxLength(100),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  start_date = new FormControl('', Validators.required);

  end_date = new FormControl('', Validators.required);

  create_by = new FormControl('');

  create_at = new FormControl('');

  isLoading = true;

  closeDialog() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private boardService: BoardService,
    private router: Router,
    public toast: ToastComponent,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}



  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      project_id: this.project_id,
      board_id: this.board_id,
      description: this.description,
      start_date: this.start_date,
      end_date: this.end_date,
      create_by: this.create_by,
      create_at: this.create_at
    });
  }

  register() {
    this.registerForm.value.project_id = this.data;
    this.registerForm.value.create_at = Date.now();
    this.registerForm.value.create_by = this.auth.currentUser._id,
    this.boardService.addBoard(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('successfully created new Board!', 'success');
        this.dialogRef.close();
      },
      error => this.toast.setMessage('error', 'danger')
    );
  }
}


@Component({
  selector: 'app-board',
  templateUrl: 'board-dialog-update.html',
  styleUrls: ['./board.component.scss']
})
export class BoardDialogUpdateComponent implements OnInit {

  isLoading = true;

  board: any;

  constructor(private auth: AuthService,
              public dialogRef: MatDialogRef<BoardDialogUpdateComponent>,
              public toast: ToastComponent,
              private boardService: BoardService,
              @Inject(MAT_DIALOG_DATA) public _id: any) { }

  ngOnInit() {
    this.getBoard();
  }

  getBoard() {
    this.boardService.getBoard({_id: this._id}).subscribe(
      data => this.board = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(board) {
    this.boardService.editBoard(board).subscribe(
      res => {
        this.toast.setMessage('Board settings saved!', 'success'),
        this.dialogRef.close();
      },
      error => console.log(error)
    );
  }

}
