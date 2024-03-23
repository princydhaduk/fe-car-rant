import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{
  blog: any[] = [];

  constructor(private api:ApiService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.getBlogData();
  }

  getBlogData(): void{
    this.api.getBlog().subscribe((res: any) => {
      if(res){
        res.forEach((ele: any) => {
          ele['img'] = '../../../assets/images/' + ele.Image;
        });
        this.blog = res;
        console.log("Res---",res);
        
      }
    });
  }
}
