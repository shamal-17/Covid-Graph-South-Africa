import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  /**
   * table data
   */
  covidDataByCountry: any = [];
  isShowTable:boolean=true;
  displayedColumns: string[] = ['Country', 'Confirmed', 'Recovered', 'Deaths', 'Active', 'Date'];
  dataSource = new MatTableDataSource(this.covidDataByCountry);

   resultsLength = 0;
   currentPage=1;
  /**
   * graph data
   */
  title = 'Daily Covid Confirmed Cases (South Africa)';
  type = 'AreaChart';
  data = [];
  columnNames = ['Report', 'Confirmed Cases'];
  options = {
  };
  width = 900;
  height = 400;
  constructor(private http: HttpClient,private datePipe:DatePipe) { }

  ngOnInit() {
    this.getData();
  }

  /**
   * to show detail table
   */
  showDetails(){
this.isShowTable=false;
  }

  array = []
  getData() {
    this.http.get('https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-12-01T00:00:00Z').
      subscribe((data:any) => {
        this.covidDataByCountry = data;
        this.dataSource.data = this.covidDataByCountry;
        if (data) {
           data.forEach(el=>{
            let arra1 = [];
            arra1.push(this.datePipe.transform(el.Date,'dd-MMM-yyyy'), el.Confirmed);
            this.array.push(arra1)
           })
           this.data = this.array
           this.resultsLength=data.length;
        }
      }, err => console.log(err));
  }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

}
