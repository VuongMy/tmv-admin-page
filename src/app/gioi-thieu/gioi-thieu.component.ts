import { Component, OnInit } from '@angular/core';
import { MultiService } from '../multi.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogIntroductionComponent } from './dialog-introduction/dialog-introduction.component';
@Component({
  selector: 'app-gioi-thieu',
  templateUrl: './gioi-thieu.component.html',
  styleUrls: ['./gioi-thieu.component.css']
})
export class GioiThieuComponent implements OnInit {
  //clinic: 0, intro: 1, office: 2
  clinic: Clinic = {
    "clinic": "",
    "clinicImage": ""
  };
  intro: MyIntro = {
    "myIntro": "",
    "introVideo": "",
    "introImage": ""
  };
  office: Office = {
    "myOffice": "",
    "myOfficeImage": ""
  };
  constructor(private service: MultiService,
    public dialog: MatDialog) {
    this.clinic = {
      "clinic": "",
      "clinicImage": ""
    };
    this.intro = {
      "myIntro": "",
      "introVideo": "",
      "introImage": ""
    };
    this.office = {
      "myOffice": "",
      "myOfficeImage": ""
    }
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getClinic().subscribe((res: Clinic) => {
      this.clinic = res;
    });
    this.service.getIntro().subscribe((res: MyIntro) => {
      this.intro = res;
    });
    this.service.getOffice().subscribe((res: Office) => {
      this.office = res;
    });
  }
  editClinic(item) {
    const dialogRef = this.dialog.open(DialogIntroductionComponent, {
      width: '80%',
      data: {
        id: 0,
        value: item,
        title: "Edit Clinic",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.service.getClinic().subscribe((res: Clinic) => {
          this.clinic = res;
        });
      }
    });
  }

  editOffice(item) {
    const dialogRef = this.dialog.open(DialogIntroductionComponent, {
      width: '80%',
      data: {
        id: 2,
        value: item,
        title: "Edit Office",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.getOffice().subscribe((res: Office) => {
          this.office = res;
        });
      }
    });
  }

  editIntro(item) {
    const dialogRef = this.dialog.open(DialogIntroductionComponent, {
      width: '80%',
      data: {
        id: 1,
        value: item,
        title: "Edit Intro",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.getIntro().subscribe((res: MyIntro) => {
          this.intro = res;
        });
      }
    });
  }
}

export interface Clinic {
  "clinic": string;
  "clinicImage": string;
}

export interface MyIntro {
  "myIntro": string;
  "introVideo": string;
  "introImage": string;
}

export interface Office {
  "myOffice": string;
  "myOfficeImage": string;
}