import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Note } from './models/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  notes:Note[];
  newNote:Note = new Note();
  errors = [];

  constructor(private _httpService:HttpService){}

  ngOnInit(){
    this.getNotesFromService();
  }

  getNotesFromService(){
    this._httpService.getNotes().subscribe((data:Note[])=>{
      this.notes = data;
    })
  }

  createNote() {
    console.log("in component, note: ", this.newNote)
    let observable = this._httpService.createNote(this.newNote);
    observable.subscribe(data => {
      if (data['errors']){
        this.errors = data['errors']
      }else{
        this.errors = [];
        this.getNotesFromService()
      }
    })

  }
  deleteNote(id) {
    let observable = this._httpService.deleteNote(id);
    observable.subscribe(data => {
      console.log("successfully deleted cake")
      this.getNotesFromService()
    })
  }
}
