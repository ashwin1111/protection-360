import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.page.html',
  styleUrls: ['./registration-form.page.scss'],
})
export class RegistrationFormPage implements OnInit {
  registration_form: FormGroup;
  

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registration_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      fatherName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      occupation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  showright(){
    document.getElementById('rightbar').style.right='0px';
}

showleft(){
  if(document.getElementById('leftbar').style.left=="-270px"){
    document.getElementById('leftbar').style.left="0px";
  }else{
    document.getElementById('leftbar').style.left="-270px";
  }
}

hideleft(){
  if(document.getElementById('leftbar').style.left=="0px"){
    document.getElementById('leftbar').style.left="-270px";
  }

  if(document.getElementById('rightbar').style.right=="0px"){
    document.getElementById('rightbar').style.right="-270px";
  }
}

  register (formValues) {
    console.log('akjsgs',formValues)
  }

}
