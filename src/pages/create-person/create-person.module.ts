import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePersonPage } from './create-person';

@NgModule({
  declarations: [
    CreatePersonPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePersonPage),
  ],
})
export class CreatePersonPageModule {}
