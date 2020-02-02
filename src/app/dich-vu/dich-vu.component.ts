import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MultiService } from '../multi.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogServiceComponent } from './dialog-service/dialog-service.component';
@Component({
  selector: 'app-dich-vu',
  templateUrl: './dich-vu.component.html',
  styleUrls: ['./dich-vu.component.css']
})
export class DichVuComponent implements OnInit {
  listdichvu: any[];
  constructor(private service: MultiService,
    public dialog: MatDialog) {
    this.listdichvu = [];
   }

  getAll: Subscription;
  ngOnInit() {
    this.getAllService(0);
  }

  getAllService(pageNum:any){
    this.getAll = this.service.getAllService(pageNum).subscribe(res =>{
      this.listdichvu = res['content'];
    });
  }

  edit(item){
    const dialogRef = this.dialog.open(DialogServiceComponent, {
      width: '80%',
      data: {
        service: item,
        title: "Edit Service",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.getAllService(0);
      }
    });
  }

  add(){
    const dialogRef = this.dialog.open(DialogServiceComponent, {
      width: '80%',
      data: {
        title: "Add Service",
        service: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result){
        this.getAllService(0);
      }
    });
  }
  
  
  delete(item){
    console.log(JSON.stringify(item));
    this.service.deleteService(JSON.stringify(item)).subscribe(res =>{
      this.getAllService(0);
    })
  }
  ngOnDestroy(){
    if(this.getAll)
      this.getAll.unsubscribe();
  }
}
