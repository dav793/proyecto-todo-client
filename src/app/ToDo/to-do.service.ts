import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToDo } from '../ToDo/to-do.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

}
