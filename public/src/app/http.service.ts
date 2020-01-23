import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getNotes() {
    return this._http.get('/notes')
  }
  getNoteById(id) {
    return this._http.get(`/notes/${id}`);
  }

  createNote(newNote: any) {
    console.log("in service ", newNote)
    return this._http.post('/new', newNote)
  }
  deleteNote(id) {
    return this._http.delete(`/remove/${id}`)
  }
}