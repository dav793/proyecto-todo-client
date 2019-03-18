import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { ToDoService } from '../to-do.service';

import { ToDo } from '../to-do.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  form: FormGroup;
  ToDoList = [
    'Bañar al perro',
    'Cocinar',
    'Estudiar'
  ];

  DoneList = ['ver Pelis'];

  constructor(private formBuilder: FormBuilder, private todoService: ToDoService) { }

  ngOnInit() { }


  LogOut() {

  }

  getToDos() {
    // return // se tiene que hacer el http request desde el servidor
  }

  getDoneList() {
    // return // se tiene que hacer el http request desde el servidor
  }

  createFormWithBuilderForToDos(model: ToDo[]): FormGroup {
    const toDosGroups = this.setToDos(model);
    const groupToDos = this.formBuilder.group({
      toDos: this.formBuilder.array(toDosGroups)
    });
    return groupToDos;
  }

  setToDos(toDos: ToDo[]) {
    const toDosGroups = toDos.map((toDo: ToDo) => {
      return this.formBuilder.group({
        body:     [ toDo.body, [] ],
        done:     [ toDo.done, [] ],
        userId:   [ toDo.userId, [] ]
      });
    });
    return toDosGroups;
  }

  createFormWithBuilderForDoneList(model: ToDo[]): FormGroup {
    const doneGroups = this.setDoneList(model);
    const groupDone = this.formBuilder.group({
      doneArray: this.formBuilder.array(doneGroups)
    });
    return groupDone;
  }

  setDoneList(doneList: ToDo[]) {
    const toDosGroups = doneList.map((toDo: ToDo) => {
      return this.formBuilder.group({
        body:     [ toDo.body, [] ],
        done:     [ toDo.done, [] ],
        userId:   [ toDo.userId, [] ]
      });
    });
    return toDosGroups;
  }


}


