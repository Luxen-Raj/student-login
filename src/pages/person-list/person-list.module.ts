import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonListPage } from './person-list';

@NgModule({
  declarations: [
    PersonListPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonListPage),
  ],
})
export class PersonListPageModule {}
