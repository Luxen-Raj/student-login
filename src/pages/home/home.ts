import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonListPage } from '../person-list/person-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  listPage(){
    this.navCtrl.push(PersonListPage)
  }

}
