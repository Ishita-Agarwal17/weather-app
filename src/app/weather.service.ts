import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeather(location:any){
    return this.http.get(
        'http://api.weatherstack.com/current?access_key=0de1441d35cf1d6020570eb8a30d08a5&query=' + location 
    );
}
}
