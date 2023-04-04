import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule.forRoot({ type: 'square-loader', }),
    BsDropdownModule,
    FileUploadModule
  ],
  exports:[
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    BsDropdownModule,
    NgxSpinnerModule,
    FileUploadModule
  ]
})
export class SharedModule { }
