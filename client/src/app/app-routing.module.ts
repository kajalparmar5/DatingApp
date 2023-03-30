import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guard/auth.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';

const routes: Routes = [
  { path:'',component:HomeComponent},
  { path: 'login', component:LoginComponent },
  { path:'members',component:MemberListComponent,canActivate:[AuthGuard]},
  { path:'members/:id',component:MemberDetailsComponent,canActivate:[AuthGuard] },
  { path:'list',component:ListComponent,canActivate:[AuthGuard]},
  { path:'messages',component:MessagesComponent,canActivate:[AuthGuard]},
  { path: 'not-found', component:NotFoundComponent },
  { path: 'server-error', component:ServerErrorComponent },
  { path:'**',component:NotFoundComponent ,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
