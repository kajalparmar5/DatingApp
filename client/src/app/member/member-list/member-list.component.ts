import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/members';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members:Member[]=[];

  constructor(private memberSErvice:MemberService){}
  ngOnInit() {
      this.loadMembers();
  }

  loadMembers(){
    this.memberSErvice.getUsers().subscribe({
     next: res=>{
        this.members=res;
      }
    }
      
    )
  }

}
