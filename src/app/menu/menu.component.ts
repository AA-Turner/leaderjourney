import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { Globals } from '../globals';
//import { RoleSelectComponent } from '../roleselect/roleselect.component';
import { TrainingComponent } from '../training/training.component';

@Component({
  selector: 'ons-page[menu]',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
})
export class MenuComponent implements OnInit {
  selected_role = {};
  plp = [];
  fa = "";
  sf = "";
  sg = "";
  gd = "";
  
  constructor(private navi: OnsNavigator,
              private globals: Globals,) {
  } 
 
  
  
  push() {
    this.navi.nativeElement.pushPage(TrainingComponent);
  }
  
 formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

  find_mandatory (mantype) {
    var expiry="1900-01-01"
    for(var i=0;i<this.globals.compassdata.object.mandate.length; i++){
      var item = this.globals.compassdata.object.mandate[i];
      if(item.expiry>expiry&&item.mandCode==mantype) {
         expiry = item.expiry;
      }
    } 
    return expiry;
  }

  calc_date_value(d) {
    return (parseInt(d.substring(0,4)))*12 +parseInt(d.substring(5,7))-1;
  }

  check_expiry(date,expiry){
    if (expiry < date) {
    return "od"; 
  }  
  if (this.calc_date_value(expiry)-this.calc_date_value(date)<3) { 
    return "du"
  }
  return "ok"
  }
  get_mandatory(){
  var date = this.formatDate()
  var expiry = this.find_mandatory("FA");
  this.fa = this.check_expiry(date,expiry)
  expiry = this.find_mandatory("SA");
  this.sf =  this.check_expiry(date,expiry)
  expiry = this.find_mandatory("SG");
  this.sg =  this.check_expiry(date,expiry)
    
  }
  
  ngOnInit() {
this.selected_role = this.globals.compassdata.object.roles.find(r=>r.id == this.globals.roleid )
this.plp = this.globals.compassdata.object.plps[this.globals.roleid];
this.get_mandatory() 
 
  }
}