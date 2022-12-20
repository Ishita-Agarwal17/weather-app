import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { TestScheduler } from 'rxjs/testing';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userData:any;
  weatherData: any;
  showWeather= false;

  constructor(private fb: FormBuilder , private weatherService:WeatherService) { }

  userForm = this.fb.group({
    Name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.email]],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });

  submitData(){
    localStorage.setItem("UserInfo", JSON.stringify(this.userForm.value));
    this.userForm.reset()
  }

  ngOnInit(): void {
    
    this.userData = localStorage.getItem("UserInfo");
    this.userData =JSON.parse(this.userData)

    if(this.userData){
      this.userForm.patchValue({
        Name: this.userData.Name,
        email: this.userData.email
     });
    
     this.userForm.get('address')?.get('city')?.setValue(this.userData.address.city);
     this.userForm.get('address')?.get('state')?.setValue(this.userData.address.state);
     this.userForm.get('address')?.get('postalCode')?.setValue(this.userData.address.postalCode); 
    }
  }

  getweatherData(){
    this.weatherService
    .getWeather(this.userForm.controls['address']?.controls['city'].value)
    .subscribe((data) => {
      this.showWeather = true;
      this.weatherData = data;
      console.log(this.weatherData);
    })
      
    
  }
}
