
import {DragDropModule} from '@angular/cdk/drag-drop';


import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';

import { MaterialModule } from './shared/modules';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ProjectService } from './project/project.service';
import { BoardService } from './boards/board.service';
import { TaskService } from './tasks/task.service';
import {
  UserService, AuthService,
  AuthGuardLogin, AuthGuardAdmin,
  AppGlobals, BaseService
} from './shared/services';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectComponent, ProjectDialogComponent, ProjectDialogUpdateComponent } from './project/project.component';
import { BoardComponent, BoardDialogComponent, BoardDialogUpdateComponent } from './boards/board.component';
import { TaskComponent, TaskDialogComponent, TaskDialogUpdateComponent } from './tasks/task.component';
// tslint:disable-next-line:no-unused-expression
import { DialogComponent } from './register/register.component';
import { AdminDialogComponent, AdminUpdateDialogComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    ProjectComponent,
    ProjectDialogComponent,
    DialogComponent,
    AdminDialogComponent,
    AdminUpdateDialogComponent,
    BoardComponent,
    BoardDialogComponent,
    BoardDialogUpdateComponent,
    ProjectDialogUpdateComponent,
    TaskComponent,
    TaskDialogComponent,
    TaskDialogUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    JwtModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCardModule,
    DragDropModule,

  ],
  providers: [// all are singleton
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    ProjectService,
    UserService,
    AppGlobals,
    BaseService,
    BoardService,
    TaskService,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
