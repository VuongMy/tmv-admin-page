import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MultiService } from '../../multi.service';
@Component({
  selector: 'app-dialog-introduction',
  templateUrl: './dialog-introduction.component.html',
  styleUrls: ['./dialog-introduction.component.css']
})
export class DialogIntroductionComponent implements OnInit {

  name: string;
  title: string;
  image: string;
  video: string;
  item: any;
  id: Number;
  colName: string;
  constructor(
    private service: MultiService,
    public dialogRef: MatDialogRef<DialogIntroductionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.id = data.id;
    this.item = Object.assign({}, data.value);
    switch (this.id) {
      case 0:
        this.name = this.item.clinic;
        this.imgUrls = this.item.clinicImage;
        this.colName = "Clinic";
        break;
      case 1:
        this.name = this.item.myIntro;
        this.imgUrls = this.item.introImage;
        this.video = this.item.introVideo;
        this.colName = "Introduction";
        break;
      case 2:
        this.name = this.item.myOffice;
        this.imgUrls = this.item.myOfficeImage;
        this.colName = "Office";
        break;
      default:
        break;
    }
    // this.imgUrls.push(this.image);
  }

  ngOnInit() {
  }
  imgUrls = [];
  onSelectFileService(event) {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      console.log(event.target.files[0]);
      this.service.uploadFile(formData).subscribe(res => {
        // console.log(res);
        // this.imgUrls.push({
        //   "id": res['value'].id,
        //   "url": res['value'].url
        // });
        this.imgUrls.push(res['value'].url);
      });
    }
  }
  removeImgService(index) {
    console.log("before remove" ,this.imgUrls[0]);
    this.imgUrls.splice(index, 1);
    console.log("remove" ,this.imgUrls[0]);
  }

  addNew() {
    console.log("add neww   ", this.image, this.name);
    if (!this.name)
      this.dialogRef.close(false);
    else {
      // if(!this.imgUrls[0]) 
      //   this.imgUrls[0] = '';
      switch (this.id) {
        case 0:
          this.service.updateClinic({ "clinic": this.name, "clinicImage": this.imgUrls}).subscribe(res => {
            this.dialogRef.close(true);
          });
          break;
        case 1:
          this.service.updateIntro({ "myIntro": this.name, "introImage": this.imgUrls, "introVideo": "" }).subscribe(res => {
            this.dialogRef.close(true);
          });
          break;
        case 2:
          this.service.updateOffice({ "myOffice": this.name, "myOfficeImage": this.imgUrls}).subscribe(res => {
            this.dialogRef.close(true);
          });
          break;
        default:
          break;
      }
    }

  }
}