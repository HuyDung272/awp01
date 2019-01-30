
import { Component, OnInit , Inject, ViewChild} from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { ProjectService } from './project.service';


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

///////////////////////////////////////////
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource} from '@angular/material';
/////////////////////////////////////


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  users = [];

  projects = [];

  isLoading = true;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService,
              private projectService: ProjectService,
              public dialog: MatDialog
    ) {}


  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    if (this.auth.isAdmin) {
      this.projectService.getAllProjects().subscribe(
        data => this.projects = data,
        error => console.log(error),
        () => this.isLoading = false
      );
    } else {
      this.projectService.getProjectByPM({manage_by : this.auth.currentUser._id}).subscribe(
        data => this.projects = data,
        error => console.log(error),
        () => this.isLoading = false
      );
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );

  }

  deleteProject(project) {
    this.projectService.deleteProject(project).subscribe(
      data => this.toast.setMessage('Project deleted successfully.', 'success'),
      error => console.log(error),
      () => this.getProjects()
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProjects();
    });
  }

  openUpdateDialog(_id): void {
    const dialogRef = this.dialog.open(ProjectDialogUpdateComponent, {
      width: '400px',
      data : _id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProjects();
    });
  }

}

@Component({
  selector: 'app-project',
  templateUrl: 'project-dialog.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  registerForm: FormGroup;

  project_id = new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  description = new FormControl('', [Validators.required,
  Validators.minLength(0),
  Validators.maxLength(100),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  manage_by = new FormControl('', [Validators.required]);

  start_date = new FormControl('', Validators.required);
  end_date = new FormControl('', Validators.required);


  create_by = new FormControl('');
  create_at = new FormControl('');

  pmUsers = {};
  isLoading = true;

  closeDialog() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private projectService: ProjectService,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,

    ) {}



  ngOnInit() {
    this.getPMUsers();

    this.registerForm = this.formBuilder.group({
      project_id: this.project_id,
      description: this.description,
      manage_by: this.manage_by,
      start_date: this.start_date,
      end_date: this.end_date,
      create_by: this.create_by,
      create_at: this.create_at
    });
  }

  getPMUsers() {
    this.userService.getPMUsers({_id : 'Project manager'}).subscribe(
      data => this.pmUsers = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  register() {
    this.registerForm.value.create_at = Date.now();
    this.registerForm.value.create_by = this.auth.currentUser._id,
    this.projectService.addProject(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.dialogRef.close();
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }
}

@Component({
  selector: 'app-project',
  templateUrl: 'project-dialog-update.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectDialogUpdateComponent implements OnInit {

  project: any;
  user = {};
  isLoading = true;

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              public dialogRef: MatDialogRef<ProjectDialogUpdateComponent>,
              private projectService: ProjectService,
              @Inject(MAT_DIALOG_DATA) public _id: any) { }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService.getProject({_id: this._id}).subscribe(
      data => this.project = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(project) {
    this.projectService.editProject(project).subscribe(
      res => {
        this.toast.setMessage('Project settings saved!', 'success'),
        this.dialogRef.close();
      },
      error => console.log(error)
    );
  }

}
