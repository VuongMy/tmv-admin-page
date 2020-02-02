import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MultiService } from '../../multi.service';

@Component({
  selector: 'app-dialog-doctor',
  templateUrl: './dialog-doctor.component.html',
  styleUrls: ['./dialog-doctor.component.css']
})
export class DialogDoctorComponent implements OnInit {

  name: string;
  intro: string;
  title: string;
  image: string;
  id: any;
  item: any;
  constructor(
    private service: MultiService,
    public dialogRef: MatDialogRef<DialogDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    if (data.doctor) {
      this.item = Object.assign({}, data.doctor);
      this.imgUrls = Object.assign([], [{
        "id": "",
        "url": this.item.image
      }]);
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
  imgUrls = [];
  onSelectFileService(event) {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      console.log(event.target.files[0]);
      this.service.uploadFile(formData).subscribe(res => {
        // console.log(res);
        this.imgUrls.push({
          "id": res['value'].id,
          "url": res['value'].url
        });
      });
    }
  }
  removeImgService(index) {
    this.imgUrls.splice(index, 1);
  }

  addNew() {
    console.log("add neww   ", this.intro, this.name, this.data.doctor);
    if (!this.intro || !this.name || !this.imgUrls[0])
      this.dialogRef.close(true);
    else {
      if (this.data.doctor) {
        this.service.addNewDoctor({ "_id": this.id, "intro": this.intro, "name": this.name, "image": this.imgUrls[0].url }).subscribe(res => {
          this.dialogRef.close(true);
        });
      }
      else {
        this.service.addNewDoctor({ "intro": this.intro, "name": this.name, "image": this.imgUrls[0].url }).subscribe(res => {
          this.dialogRef.close(true);
        });
      }
    }

  }
}