import { Component, Inject, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';

import {
  MatDialog,
} from '@angular/material/dialog';
import { FormDataService } from '../service/form-data.service';

export interface PeriodicElement {
  id:string;
  name: string;
  department: string;
  address: string;
  city: string;
  state: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {id:"E101", name: 'Ram', department: "D1", address: 'A1', city:"Coimbatore", "state": "Tamil Nadu"},
//   {id:"E102", name: 'Arjun', department: "D2", address: 'A2', city:"Madurai", "state": "Tamil Nadu"},
//   {id:"E103", name: 'Kishore', department: "D3", address: 'A3', city:"Salem", "state": "Tamil Nadu"},
//   {id:"E104", name: 'Benil', department: "D4", address: 'A4', city:"Trichy", "state": "Tamil Nadu"},
//   {id:"E105", name: 'Jeyam', department: "D5", address: 'A5', city:"Erode", "state": "Tamil Nadu"},
//   {id:"E106", name: 'Revi', department: "D6", address: 'A6', city:"Tiruppur", "state": "Tamil Nadu"},
//   {id:"E107", name: 'Nikita', department: "D7", address: 'A7', city:"Thanjavur", "state": "Tamil Nadu"},
//   {id:"E108", name: 'Vijay', department: "D8", address: 'A8', city:"Tirunelveli", "state": "Tamil Nadu"},
//   {id:"E109", name: 'Nova', department: "D9", address: 'A9', city:"Palani", "state": "Tamil Nadu"},
//   {id:"E110", name: 'Eric', department: "D10", address: 'A10', city:"Namakkal", "state": "Tamil Nadu"},

// ];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit{
  formData:any;
  
  displayedColumns: string[] = ["id",'name', 'department', 'address', 'city', 'state', 'action'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource: MatTableDataSource<PeriodicElement>;

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private formDataService:FormDataService) {
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.formDataService.getFormData().subscribe(data => {
      this.formData = data;
      this.dataSource.data = this.formData;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submit') {
        this.loadData();
      }
    });
  }

  remove(id:string):void{
    this.formDataService.postDelete(id).subscribe(data=>{
      this.formData= data;
      this.dataSource.data=this.formData;
    })
  }


  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
