import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormControl } from '@angular/forms';

import { ToDo } from '../to-do.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  ToDoList = [
    'Bañar al perro',
    'Cocinar',
    'Estudiar'
  ];

  DoneList = [];

  constructor() { }

  ngOnInit() {
  }


  LogOut() {

  }


}
