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
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { deleteFormData, getFormData } from '../states/submission/submission.action';
import { selectSubmissionList } from '../states/submission/submission.selector';

export interface PeriodicElement {
  id:string;
  name: string;
  department: string;
  address: string;
  city: string;
  state: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  isNoData:boolean=true
  formData$:Observable<any[]>
  
  displayedColumns: string[] = ["id",'name', 'department', 'address', 'city', 'state', 'action'];

  dataSource: MatTableDataSource<PeriodicElement>=new MatTableDataSource<PeriodicElement>([]);

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private formDataService:FormDataService, private store: Store<AppState>,) {
    this.formData$=this.store.select(selectSubmissionList)
  }

  ngOnInit(): void {
    this.formData$.subscribe(data=> {
      console.log(data)
      if(data.length){
        this.isNoData=false
      }

      else{
        this.isNoData=true
      }

      this.dataSource.data=data
  
    })

    this.store.dispatch(getFormData())
    
  }

  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit(): void {
    this.sorting();
  }

  sorting(): void {
    if (this.sort) {
      console.log("saf")
      this.dataSource.sort = this.sort;
    }
    else {
      setTimeout(() => this.sorting(), 100);
    }
  }

  openDialog(): void {
    this.dialog.open(DialogOverviewComponent);

  }

  remove(id:string):void{
    this.store.dispatch(deleteFormData({deleteData:id}))
  }


  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
