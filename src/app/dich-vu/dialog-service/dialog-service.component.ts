import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MultiService } from '../../multi.service';
@Component({
  selector: 'app-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.css']
})
export class DialogServiceComponent implements OnInit {
  name: string;
  intro: string;
  title: string;
  id: any;
  item: any;
  constructor(
    private service: MultiService,
    public dialogRef: MatDialogRef<DialogServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    if (data.service) {
      this.item = Object.assign({}, data.service);
      console.log(this.item.name);
      this.serviceUrls = Object.assign([], this.item.serviceImage);
      this.customerUrls = Object.assign([], this.item.customerImage);
      this.name = this.item.name;
      this.intro = this.item.intro;
      this.id = Object.assign({}, this.item._id);
    }
    else {
      this.name = "";
      this.intro = "";
    }
  }

  ngOnInit() {
  }
  serviceUrls = [];
  onSelectFileService(event) {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
      //   var reader = new FileReader();

      //   reader.onload = (event: any) => {
      //     console.log(event.target.result);
      //     this.serviceUrls.push(event.target.result);
      //   }

      //   reader.readAsDataURL(event.target.files[i]);
      // }
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      console.log(event.target.files[0]);
      this.service.uploadFile(formData).subscribe(res => {
        // console.log(res);
        this.serviceUrls.push({
          "id": res['value'].id,
          "url": res['value'].url
        });
      });
    }
  }
  removeImgService(index) {
    this.serviceUrls.splice(index, 1);
  }
  customerUrls = [];
  onSelectFileCustomer(event) {
    if (event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
      //   var reader = new FileReader();

      //   reader.onload = (event: any) => {
      //     console.log(event.target.result);
      //     this.customerUrls.push(event.target.result);
      //   }

      //   reader.readAsDataURL(event.target.files[i]);

      // }
      const formData_Custom = new FormData();
      formData_Custom.append("file", event.target.files[0]);
      this.service.uploadFile(formData_Custom).subscribe(res => {
        this.customerUrls.push({
          "id": res['value'].id,
          "url": res['value'].url
        });
        console.log(this.customerUrls);
      })
    }
  }

  removeImgCustom(i) {
    this.customerUrls.splice(i, 1);
  }

  addNew() {
    console.log("add neww   ", this.intro, this.name, this.customerUrls);
    var body = {
      "customerImage": this.customerUrls,
      "intro": this.intro,
      "name": this.name,
      "serviceImage": this.serviceUrls
    }
    if (!this.intro || !this.name)
      this.dialogRef.close(true);
    else {
      if (this.data.service) {
        this.service.addNewService({ "_id": this.id, "intro": this.intro, "name": this.name, "serviceImage": this.serviceUrls, "customerImage": this.customerUrls }).subscribe(res => {
          console.log(JSON.stringify({ "intro": this.intro, "name": this.name, "serviceImage": this.serviceUrls, "customerImage": this.customerUrls }));
          this.dialogRef.close(true);
        });
      }
      else{
        this.service.addNewService({ "intro": this.intro, "name": this.name, "serviceImage": this.serviceUrls, "customerImage": this.customerUrls }).subscribe(res => {
          console.log(JSON.stringify({ "intro": this.intro, "name": this.name, "serviceImage": this.serviceUrls, "customerImage": this.customerUrls }));
          this.dialogRef.close(true);
        });
      }
    }
    
  }
}
