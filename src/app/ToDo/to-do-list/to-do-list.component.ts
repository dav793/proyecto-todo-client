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
  formToDo: FormGroup;
  formToDoArray: FormGroup[];
  formDoneList: FormGroup;
  formDoneListArray: FormGroup[];

  todo1 = new ToDo({ body: 'my body', done: false, userId: '1' });
  todo2 = new ToDo({ body: 'lavar', done: true, userId: '2' });
  todo3 = new ToDo({ body: 'cocinar', done: false, userId: '3' });

  toDoList = [this.todo1, this.todo3];
  doneList = [this.todo2];

  constructor(private formBuilder: FormBuilder, private todoService: ToDoService) { }

  ngOnInit() {
    this.formToDo = this.createFormWithBuilderForToDos(this.toDoList);
    this.formDoneList = this.createFormWithBuilderForDoneList(this.doneList);
  }

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
        body: [toDo.body, []],
        done: [toDo.done, []],
        userId: [toDo.userId, []]
      });
    });
    return toDosGroups;
  }

  addToDos() {
    const toDo = new ToDo({});
    this.formToDoArray.push(this.formBuilder.group({
      body: [toDo.body, []],
      done: [toDo.done, []],
      userId: [toDo.userId, []]
    }));
    this.formToDo.markAsDirty();
  }

  removeTodo(index: number) {
    const toDosCopy: ToDo[] = Object.assign([], this.formToDo.value.toDoList);
    toDosCopy.splice(index, 1);

    const toDosGroups = this.setToDos(toDosCopy);
    const toDosFormArray = this.formBuilder.array(toDosGroups);

    this.formToDo.setControl('toDos', toDosFormArray);
    this.formToDo.markAsDirty();
  }

  // -----------------------------DoneList

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
        body: [toDo.body, []],
        done: [toDo.done, []],
        userId: [toDo.userId, []]
      });
    });
    return toDosGroups;
  }

  addToDoneList() {
    const element = new ToDo({});
    this.formDoneListArray.push(this.formBuilder.group({
      body: [element.body, []],
      done: [element.done, []],
      userId: [element.userId, []]
    }));
    this.formDoneList.markAsDirty();
  }

  removeFromDoneList(index: number) {
    const doneListCopy: ToDo[] = Object.assign([], this.formDoneList.value.doneList);
    doneListCopy.splice(index, 1);

    const doneListGroups = this.setToDos(doneListCopy);
    const doneListFormArray = this.formBuilder.array(doneListGroups);

    this.formDoneList.setControl('toDos', doneListFormArray);
    this.formDoneList.markAsDirty();
  }

}


