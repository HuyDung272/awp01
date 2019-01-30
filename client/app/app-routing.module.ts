import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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




import { DialogComponent } from './register/register.component';
import { AdminDialogComponent } from './admin/admin.component';

import { AuthGuardLogin, AuthGuardAdmin } from './shared/services';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register1', component: DialogComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'projects1', component: ProjectDialogComponent },
  { path: 'projects2', component: ProjectDialogUpdateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admindialog', component: AdminDialogComponent,  canActivate: [AuthGuardAdmin]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'boards/:id', component: BoardComponent },
  { path: 'boards/:id', component: BoardDialogComponent },
  { path: 'boards/:id', component: BoardDialogUpdateComponent },
  { path: 'tasks', component: TaskComponent},
  { path: 'tasks', component: TaskDialogComponent },
  { path: 'tasks', component: TaskDialogUpdateComponent },
  { path: 'tasks/:id', component: TaskComponent},
  { path: 'tasks/:id', component: TaskDialogComponent },
  { path: 'tasks/:id', component: TaskDialogUpdateComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
