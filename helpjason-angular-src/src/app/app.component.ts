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
    this.memberService.getAll().subscribe((res) => {
      this.pickedMembers = res;
    },
    (err) => {
      console.log(err);
    });

    this.io.listen("dataChange").subscribe((data : any) => {
      this.pickedMembers = data.data;
    });
  }

  onSubmit(memberForm : NgForm) : void{
    this.memberService.create(memberForm.controls.name.value).subscribe((res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
  }

  deleteItem(name : string){
    console.log(name);
    this.memberService.delete(name).subscribe((res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
  }
}
