import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the CreatePersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-person',
  templateUrl: 'create-person.html',
})
export class CreatePersonPage {
  
  myGroup: FormGroup;
  editData: any;

  regNo: AbstractControl;
  firstname: AbstractControl;
  lastname: AbstractControl;
  fathername: AbstractControl;
  dob: AbstractControl;
  mobile: AbstractControl;
  Email: AbstractControl;
  Address: AbstractControl;
  base64profile:any;
  studentList: any=[];
  rollNocheck: boolean = false;
  studentList2: any[];

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
   // allowEdit: true
   }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController

    ) {



     this.editData = this.navParams.data.editData;
    console.log("editData",this.editData)

    this.myGroup = formbuilder.group({
      regNo: [''],
      firstname: [''],
      lastname: [''],
      fathername: [''],
      dob: [''],
      mobile: [''],
      Email: ['', [ Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Address: [''],
    });

    this.regNo = this.myGroup.controls['regNo'];
    this.firstname = this.myGroup.controls['firstname'];
    this.lastname = this.myGroup.controls['lastname'];
    this.fathername = this.myGroup.controls['fathername'];
    this.dob = this.myGroup.controls['dob'];
    this.mobile = this.myGroup.controls['mobile'];
    this.Email = this.myGroup.controls['Email'];
    this.Address = this.myGroup.controls['Address'];


    if (this.editData) {

      this.myGroup.get('regNo').setValue(this.editData.regNo);
      this.myGroup.get('firstname').setValue(this.editData.firstname);
      this.myGroup.get('lastname').setValue(this.editData.lastname);
      this.myGroup.get('fathername').setValue(this.editData.fathername);
      this.myGroup.get('dob').setValue(this.editData.dob);
      this.myGroup.get('mobile').setValue(this.editData.mobile);
      this.myGroup.get('Email').setValue(this.editData.Email);
      this.myGroup.get('Address').setValue(this.editData.Address);

      this.base64profile = this.editData.profileimg;
  
    }

  }

  ionViewWillEnter() {
    console.log(' localStorage.getItem=> 22222222  ', JSON.parse(localStorage.getItem("studentList") || "[]"));

    this.studentList = JSON.parse(localStorage.getItem("studentList") || "[]");

      console.log("this.studentList  2",this.studentList)
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePersonPage');
  }

  
  checkRoleNo(event){

    console.log("event",event)
  
    this.rollNocheck = false
  
    for(let dept of this.studentList){

      if(dept.regNo == event.value){
        this.rollNocheck = true;
      }
      
    };
  
    }



  
  actionsheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose',
      buttons: [
        
        {
          icon: 'camera',
          text: 'Camera',
          handler: () => {
            console.log('Camera clicked');
            this.openCamera();
          }
        }, {
          icon: 'image',
          text: 'Choose from Gallery',
          handler: () => {
            console.log('gallery clicked');
            this.openGalary();
          }
        },{
          icon: 'close',
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


  openCamera(){

    this.camera.getPicture(this.cameraOptions).then((imgData) => {
      console.log('image data =>  ', imgData);
      this.base64profile = 'data:image/jpeg;base64,' + imgData;

  // this.camera.getPicture(options).then((imageData) => {
  //   this.base64profile = 'data:image/jpeg;base64,' + imageData;
   }, (err) => {
    console.log(err);
   });
   
    

   
  }

  openGalary(){

    const options:  CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
     // allowEdit: true
      }
   
      this.camera.getPicture(options).then((imgData) => {
       console.log('image data =>  ', imgData);


    // const options:  CameraOptions = {
    //   quality: 50,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   allowEdit: true
    //   }
   
    //   this.camera.getPicture(options).then((imgData) => {
    //    console.log('image data =>  ', imgData);

       this.base64profile = 'data:image/jpeg;base64,' + imgData;

       }, (err) => {
       console.log(err);
       })

  } 


  save(){
  console.log("this.studentList  1",this.studentList)
    
    this.studentList.push({

      profileimg : this.base64profile,
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      regNo: this.regNo.value,
      mobile: this.mobile.value,
      fathername: this.fathername.value,
      dob: this.dob.value,
      Email: this.Email.value,
      Address: this.Address.value,

    });

  console.log("this.studentList  2",this.studentList)

 // this.navCtrl.pop({data:this.studentList})

 localStorage.setItem('studentList', JSON.stringify(this.studentList));

 this.navCtrl.pop();

 //localStorage.setItem('id', this.studentList);

  }

  
  update(){

    this.studentList2 =[]

  //  this.studentList.array.forEach(element => {
    for(let element of this.studentList){

      if(element.regNo == this.editData.regNo){
        this.studentList2.push({

          profileimg : this.base64profile,
          firstname: this.firstname.value,
          lastname: this.lastname.value,
          regNo: this.regNo.value,
          mobile: this.mobile.value,
          fathername: this.fathername.value,
          dob: this.dob.value,
          Email: this.Email.value,
          Address: this.Address.value,
    
        });
      }else{
        this.studentList2.push(element)
      }
      
    };
    console.log("this.studentList  2",this.studentList2);
   localStorage.setItem('studentList', JSON.stringify(this.studentList2));

    this.navCtrl.pop();

  }


}
