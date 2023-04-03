import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/members';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  members:Member[]=[]

  baseUrl=environment.apiUrl;

  constructor(private http :HttpClient) { }

  getUsers(){
    if(this.members.length>0) return of (this.members)
   return this.http.get<Member[]>(this.baseUrl+'users',this.getHttpOptions()).pipe(
    map(members=>{
      this.members=members
      return members
    })
   )
  }
  getUser(username:string){
    const member=this.members.find(x=>x.userName===username)
    if(member) return of (member)
    return this.http.get<Member>(this.baseUrl+'users/'+username,this.getHttpOptions())
  }

  updateMember(member :Member){
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=>{
        const index=this.members.indexOf(member)
        this.members[index]={...this.members[index],...member}
      })
    )
  }

  getHttpOptions(){
    const userString=localStorage.getItem('user')
    if(!userString) return;
    const user=JSON.parse(userString)
    return{
      headers:new HttpHeaders({
        Authorization:'Bearer '+ user.token
      })
    }

  }
}
