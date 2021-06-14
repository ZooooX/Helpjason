import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {IMember} from '../models/member.model';


//const API_URI = "http://localhost:3000/api/member";
const API_URI = "https://helpjason.herokuapp.com/api/member";

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http : HttpClient) { }

  create(name : string){
    return this.http.post(API_URI,{name:name}, httpOptions);
  }

  getAll(){
    return this.http.get<IMember[]>(API_URI, httpOptions);
  }

  delete(name : string){
    return this.http.delete(`${API_URI}/${name}`, httpOptions);
  }
}
