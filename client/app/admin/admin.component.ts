import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


///////////////////////////////////////////
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource} from '@angular/material';
import User from 'server/models/user';
import { DataSource } from '@angular/cdk/table';

export interface AddUserDialogData {
  animal: string;
  name: string;
}



///////////////////////////////////////////////////
// Table
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
/////////////////////////////////////


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users = [];
  isLoading = true;

   /////////////////////////////////////
   animal: string;
   name: string;
   ///////////////////////////////////
   // Table
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

   //////////

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService,
              public dialog: MatDialog
    ) {}

  openDialog(): void {
      const dialogRef = this.dialog.open(AdminDialogComponent, {
        width: '400px',
        data: {name: this.name, animal: this.animal}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.getUsers();
      });
    }

  ngOnInit() {
    this.getUsers();
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );

  }

  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      data => this.toast.setMessage('user deleted successfully.', 'success'),
      error => console.log(error),
      () => this.getUsers()
    );
  }

}

@Component({
  selector: 'app-admin',
  templateUrl: 'admin-dialog.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminDialogComponent implements OnInit {

  registerForm: FormGroup;

  fullname = new FormControl('');

  username = new FormControl('', [Validators.required,
  Validators.minLength(2),
  Validators.maxLength(30),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  email = new FormControl('', [Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100)]);

  password = new FormControl('', [Validators.required,
  Validators.minLength(6)]);

  role = new FormControl('', [Validators.required]);

  create_at = new FormControl('');

  roles = {};
  isLoading = true;

  //
  animal: string;
  name: string;
  //

  closeDialog(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddUserDialogData
    ) {}


  ngOnInit() {
    this.getRoles();

    this.registerForm = this.formBuilder.group({
      fullname: this.fullname,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      create_at: this.create_at
    });
  }

  getRoles() {
    this.userService.getRoles().subscribe(
      data => this.roles = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  register() {
    this.registerForm.value.create_at = Date.now();
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.dialogRef.close();
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }
}

