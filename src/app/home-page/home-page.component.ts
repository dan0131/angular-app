import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private _httpClient: HttpClient,
  ) { }
  
  data :any;
  ngOnInit() {
    this.getStats().subscribe(res=>{
      console.log(res)
      if(res.success)
      {
        this.data = res;
        console.log(this.data)
      }
    });
  }

  getStats() {
    return this._httpClient.get<any>("https://hpb.health.gov.lk/api/get-current-statistical")
      .pipe(
        map(res => res || {} as any)
      );
  }


}
