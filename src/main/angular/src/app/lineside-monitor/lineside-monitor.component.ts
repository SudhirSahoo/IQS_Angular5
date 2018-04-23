import {Component, OnInit, ViewChild} from "@angular/core";
//import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {NgModel, FormGroup} from "@angular/forms";
//import { MdRadioModule, MaterialModule } from "@angular/material";

import {LineSideInspectionService} from '../lineside-inspection/lineside-inspection.service';
import { LineSideInspection } from '../lineside-inspection/lineside-inspection';
import { Models } from '../models/models';


@Component({
  selector: 'app-lineside-monitor',
  templateUrl: './lineside-monitor.component.html',
  styleUrls: ['./lineside-monitor.component.css']
})
export class LinesideMonitorComponent implements OnInit {

  private inspectionList: LineSideInspection[];
  private modelsList: Models[];
    models: Models[] = [];

  /*getInspections(): void {
    this.inspectionService.getInspections().subscribe(inspections => this.inspections = inspections);
  }*/

    constructor(private http: HttpClient,
                private router: Router,
                private inspectionService: LineSideInspectionService) {
    }

  ngOnInit() {
      this.http
            .get('http://localhost:4200/assets/model.json')
            .toPromise()
            .then(response => {
               //let data = response;
               this.models = response;
              //  console.log(this.modelsList);
            })
            .catch(error => {
                //alert("Error...");
             //   this.alertService.error(error);
            });
      
      this.http
            .get('http://localhost:4200/assets/inspection.json')
            .toPromise()
            .then(response => {
               //let data = response;
               //if (data.inspectionList) this.inspectionList = data.inspectionList;
                this.inspectionList = response;
            })
            .catch(error => {
                //alert("Error...");
             //   this.alertService.error(error);
            });
      
  }
    
    changeCountByModel(modelId: number) {
        this.http
            .get('/api/inspection/'+modelId)
            .toPromise()
            .then(response => {
               this.inspectionList = response.inspectionList;
              // if (data.inspectionList) this.inspectionList = data.inspectionList;
                
            })
            .catch(error => {
                //alert("Error...");
             //   this.alertService.error(error);
            });
    }

}
