import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, FormGroup, FormArray, Form } from '@angular/forms';
import { Observable } from 'rxjs';


import { ToDoService } from '../to-do.service';

import { ToDo } from '../to-do.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  formToDo: FormGroup;
  formDoneList: FormGroup;

  todo1 = new ToDo({ body: 'my body', done: false, userId: '1' });
  todo2 = new ToDo({ body: 'lavar', done: true, userId: '2' });
  todo3 = new ToDo({ body: 'cocinar', done: false, userId: '3' });

  toDoList = [];
  doneList = [];

  todoWatcherSubs = [];
  doneListWatcherSubs = [];
  constructor(private formBuilder: FormBuilder, private todoService: ToDoService) { }

  ngOnInit() {
    this.toDoList = [this.todo1, this.todo3];
    this.doneList = [this.todo2];
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
    this.setupToDosWatchers(groupToDos.get('toDos') as FormArray);
    return groupToDos;
  }

  get formToDoArray(): FormArray | null {
    if (!this.formToDo) {
      return null;
    }
    return (this.formToDo.get('toDos') as FormArray);
  }

  setToDos(toDos: ToDo[]): FormGroup[] {
    const toDosGroups = toDos.map((toDo: ToDo) => {
      return this.formBuilder.group({
        body: [toDo.body, []],
        done: [toDo.done, []],
        userId: [toDo.userId, []]
      });
    });
    return toDosGroups;
  }

  setupToDosWatchers(formArray: FormArray | null) {
    if (!formArray)
      return;
    this.todoWatcherSubs.forEach(sub => sub.unsubscribe());   // limpiar watchers existentes
    formArray.controls.forEach((group) => {
      const sub = group.get('done').valueChanges.subscribe(val => {
        let equals = false;
        let index = 0;
        const todoAux = group.value;
        while (!equals && index < this.toDoList.length) {
          if (this.toDoList[index].compareToDos(todoAux)) {
            equals = true;
          } else {
            index++;
          }
        }
        this.addToDoneList(this.toDoList[index]);
        this.toDoList.splice(index, 1);
        console.log(this.toDoList);
        console.log(this.doneList);
        this.removeTodo(index);

      });
      this.todoWatcherSubs.push(sub);
    });
  }

  addToDos(toDo: ToDo) {
    toDo.done = false;
    this.toDoList.push(toDo);
    this.formToDoArray.push(this.formBuilder.group({
      body: [toDo.body, []],
      done: [toDo.done, []],
      userId: [toDo.userId, []]
    }));
    this.formToDo.markAsDirty();
    this.setupToDosWatchers(this.formToDoArray);
  }

  removeTodo(index: number) {
    const toDosCopy: ToDo[] = Object.assign([], this.formToDo.value);
    toDosCopy.splice(index, 1);
    // console.log(toDosCopy);/////////////////////////////////////////////////

    const toDosGroups = this.setToDos(toDosCopy);
    const toDosFormArray = this.formBuilder.array(toDosGroups);

    this.formToDo.setControl('done', toDosFormArray);
    this.formToDo.markAsDirty();
  }

  // -----------------------------DoneList--------------------------------------------------------

  createFormWithBuilderForDoneList(model: ToDo[]): FormGroup {
    const doneGroups = this.setDoneList(model);
    const groupDone = this.formBuilder.group({
      doneArray: this.formBuilder.array(doneGroups)
    });
    this.setupDoneListWatchers(groupDone.get('doneArray') as FormArray);
    return groupDone;
  }

  get formDoneListArray(): FormArray | null {
    if (!this.formDoneList) {
      return null;
    }
    return (this.formDoneList.get('doneArray') as FormArray);
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

  setupDoneListWatchers(formArray: FormArray | null) {
    if (!formArray)
      return;
    this.doneListWatcherSubs.forEach(sub => sub.unsubscribe());   // limpiar watchers existentes
    formArray.controls.forEach((group) => {
      const sub = group.get('done').valueChanges.subscribe(val => {
        let equals = false;
        let index = 0;
        console.log(group);
        const todoAux = group.value;
        while (!equals && index < this.doneList.length) {
          if (this.doneList[index].compareToDos(todoAux)) {
            equals = true;
          } else {
            index++;
          }
        }
        this.addToDos(this.doneList[index]);
        this.removeFromDoneList(index);
      });
      this.doneListWatcherSubs.push(sub);
    });
  }

  addToDoneList(element: ToDo) {
    element.done = true;
    this.doneList.push(element);
    this.formDoneListArray.push(this.formBuilder.group({
      body: [element.body, []],
      done: [element.done, []],
      userId: [element.userId, []]
    }));
    this.formDoneList.markAsDirty();
  }

  removeFromDoneList(index: number) {
    const doneListCopy: ToDo[] = Object.assign([], this.formDoneList.value);
    doneListCopy.splice(index, 1);

    const doneListGroups = this.setDoneList(doneListCopy);
    const doneListFormArray = this.formBuilder.array(doneListGroups);

    this.formDoneList.setControl('done', doneListFormArray);
    this.formDoneList.markAsDirty();
  }

}


