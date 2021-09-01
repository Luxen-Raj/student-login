import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreatePersonPage } from '../create-person/create-person';

/**
 * Generated class for the PersonListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person-list',
  templateUrl: 'person-list.html',
})
export class PersonListPage {
//  studentList: any = []
  studentList: any = [{
    firstname: "Suriya",
    lastname: "Kumar",
    regNo:1,
    profileimg : '',
    mobile: "9876543210",
    fathername: "vicky",
    dob: "2009-08-12T17:41:56.305Z",
    Email: "suriya@gmail.com",
    Address: "Poojaaaa"
  },{
    firstname: "Vijay",
    lastname: "M",
    regNo:2,
    profileimg : '',
    mobile: "9977552211",
    fathername: "Ram",
    dob: "2015-08-12T17:41:56.305Z",
    Email: "vijay@gmail.com",
    Address: "Poojaaaa"
  },
];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
    ) {

       let data = this.navParams.data
       console.log('data=>  ', data);

     //  localStorage.getItem('tenantId')
   //    console.log(' localStorage.getItem=>  ',  localStorage.getItem('studentList'));



     

  // console.log(' localStorage.getItem=>  ',  localStorage.getItem('studentList'));
  // console.log(' localStorage.getItem=> 22222222  ', JSON.parse(localStorage.getItem("studentList") || "[]"));
  

  // let studentList = JSON.parse(localStorage.getItem("studentList") || "[]");

  // if(studentList.length >=1){
  //   this.studentList = studentList;
  //   console.log("this.studentList  2",this.studentList)

  // }



  }

  ionViewWillEnter() {
    console.log(' localStorage.getItem=> 22222222  ', JSON.parse(localStorage.getItem("studentList") || "[]"));

    let studentList = JSON.parse(localStorage.getItem("studentList") || "[]");

    if(studentList.length >=1){
      this.studentList = studentList;
      console.log("this.studentList  2",this.studentList)
    }else{
    localStorage.setItem('studentList', JSON.stringify(this.studentList));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonListPage');
  }

  
  add(){
    this.navCtrl.push(CreatePersonPage)

    
  }

  action(list){
    let actionSheet = this.actionSheetCtrl.create({
      title: list.firstname,
      buttons: [
        {
          text: 'Edit',
          //role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(CreatePersonPage ,{editData :list,type:'edit'})

          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Archive clicked');
            this.remove(list);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  remove(item){

    console.log(' this.personList data =>  ', this.studentList);

    for (var i = 0; i < this.studentList.length; i++) {

      if (this.studentList[i].regNo == item.regNo ) {
        this.studentList.splice(i, 1);
      }
    } 

    console.log(' this.personList data =>  ',  this.studentList);
    localStorage.setItem('studentList', JSON.stringify(this.studentList));

  }
  
}
