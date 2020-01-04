import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { detailsservice } from '../shared/details.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.page.html',
  styleUrls: ['./registration-form.page.scss'],
})
export class RegistrationFormPage implements OnInit {
  registration_form: FormGroup;
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private aptservice:detailsservice
    ) { }

  ngOnInit() {
    this.registration_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[A-Za-z]+$/')
      ])),
       //email: (['']),
       mobile_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[6-9]\d{9}$/')
      ])),
       current_address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
       date_of_birth: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
       occupation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      father_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[A-Za-z]+$/')
      ])),
      father_mobile_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[6-9]\d{9}$/')
      ])),
      father_email_address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
       father_current_address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      guardian_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[A-Za-z]+$/')
      ])),
      guardian_mobile_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[6-9]\d{9}$/')
      ])),
      guardian_email_address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
       guardian_current_address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gender:['']
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

gender(value) {
  console.log('genderrr', value)
}

  register (formValues) {
    console.log('akjsgs',formValues)
    this.aptservice.createBooking(this.registration_form.value).then(res=>{
      localStorage.setItem('registrationDone', 'yes');
      console.log(res);
      this.registration_form.reset();
      this.router.navigate(['/dashboard']);
    }).catch(error=> console.log(error));
    }
  }
