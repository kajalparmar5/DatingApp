import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HttpBackend, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { SharedModule } from './_module/shared/shared.module';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { ErrorInterceptorComponent } from './_interceptor/error-interceptor/error-interceptor.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MessagesComponent,
    ListComponent,
    MemberListComponent,
    MemberDetailsComponent,
    TestErrorComponent,
    ErrorInterceptorComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   SharedModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorComponent ,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
