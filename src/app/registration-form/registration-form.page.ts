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
      name:[''],
    mobile:[''],
    address:[''],
    dob:[''],
    gender:[''],
    occupation:[''],
    fathername:[''],
    fathernumber:[''],
    fatheraddress:[''],
    fatheremail:[''],
    gname:[''],
    gnumber:[''],
    gaddress:[''],
    gemail:['']
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
    if(!this.registration_form.valid){
        return false;
    }
    else{
        this.aptservice.createBooking(this.registration_form.value).then(res=>{
          console.log(res);
          this.registration_form.reset();
          this.router.navigate(['/dashboard']);
        }).catch(error=> console.log(error));
    }
    console.log('akjsgs',formValues)
  }

}
