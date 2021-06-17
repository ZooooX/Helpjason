import { Component, OnInit } from '@angular/core';
import { MemberService } from './services/member.service';
import {NgForm} from '@angular/forms';
import { IMember } from './models/member.model';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  pickedMembers : IMember[] = [];

  constructor(private memberService : MemberService, private io : WebSocketService){}
 
  ngOnInit() : void{

    //Call getAll function to initiate pickedMembers array with current database
    this.memberService.getAll().subscribe((res) => {
      this.pickedMembers = res;
    },
    (err) => {
      console.log(err);
    });

    //update the picked member array when the dataChange event is received
    this.io.listen("dataChange").subscribe((data : any) => {
      this.pickedMembers = data.data;
    });
  }
  
  //On form submit, call create request
  onSubmit(memberForm : NgForm) : void{
    this.memberService.create(memberForm.controls.name.value).subscribe((data : any) => {
      console.log(data.message);
    },
    (err) => {
      console.log(err);
    });
    memberForm.controls.name.reset();

  }

  //On delete submit, call delete request
  deleteItem(name : string){
    console.log(name);
    this.memberService.delete(name).subscribe((data : any) => {
      console.log(data.message);
    },
    (err) => {
      console.log(err);
    });
  }
}
