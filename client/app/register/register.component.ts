import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';

///////////////////////////////////////////
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  animal: string;
  name: string;
}
/////////////////////////////////////

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService,
    public dialog: MatDialog
    ) {}

  openDialog(): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        data: {name: this.name, animal: this.animal}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

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

  // setClassUsername() {
  //   return { 'has-danger': !this.username.pristine && !this.username.valid };
  // }
  // setClassEmail() {
  //   return { 'has-danger': !this.email.pristine && !this.email.valid };
  // }
  // setClassPassword() {
  //   return { 'has-danger': !this.password.pristine && !this.password.valid };
  // }

  register() {
    this.registerForm.value.create_at = Date.now();
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }

}

@Component({
  selector: 'app-register',
  templateUrl: 'dialog.html',
  styleUrls: ['./register.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
