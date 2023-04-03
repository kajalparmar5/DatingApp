import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/members';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  member:Member|undefined
  galleryOptions:NgxGalleryOptions[]=[]
  galleryImages:NgxGalleryImage[]=[]

  constructor( private memberService:MemberService,private rout:ActivatedRoute){}
  ngOnInit(){
      this.loadMember()
      this.galleryOptions=[{
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }]
  }

  getImages(){
    if(!this.member) return []
    const imageUrls=[]
    for(const photo of this.member.photos){
      imageUrls.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url
      })
    }
    return imageUrls
  }

  loadMember(){
    const username=this.rout.snapshot.paramMap.get('username')
    if(!username) return;
    this.memberService.getUser(username).subscribe({
      next:res=>{
        this.member=res,
        this.galleryImages=this.getImages();
      }
    })
  }
}
