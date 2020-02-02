import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MultiService } from '../multi.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDoctorComponent } from './dialog-doctor/dialog-doctor.component';
@Component({
  selector: 'app-bac-si',
  templateUrl: './bac-si.component.html',
  styleUrls: ['./bac-si.component.css']
})
export class BacSiComponent implements OnInit {

  listBacsi: any[];
  constructor(private service: MultiService,
    public dialog: MatDialog) {
    this.listBacsi = [];
   }

  getAll: Subscription;
  ngOnInit() {
    this.getAllDoctor(0);
  }

  getAllDoctor(pageNum:any){
    this.getAll = this.service.getAllDoctors(pageNum).subscribe(res =>{
      this.listBacsi = res['content'];
    });
  }

  edit(item){
    const dialogRef = this.dialog.open(DialogDoctorComponent, {
      width: '80%',
      data: {
        doctor: item,
        title: "Edit Doctor",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.getAllDoctor(0);
      }
    });
  }

  add(){
    const dialogRef = this.dialog.open(DialogDoctorComponent, {
      width: '80%',
      data: {
        title: "Add Doctor",
        doctor: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result){
        this.getAllDoctor(0);
      }
    });
  }
  
  
  delete(item){
    console.log(JSON.stringify(item));
    this.service.deleteDoctor(JSON.stringify(item)).subscribe(res =>{
      this.getAllDoctor(0);
    })
  }
  ngOnDestroy(){
    if(this.getAll)
      this.getAll.unsubscribe();
  }
}

