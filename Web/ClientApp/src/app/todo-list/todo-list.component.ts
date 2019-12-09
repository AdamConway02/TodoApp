import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../_models/todo.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

// Constants
import { icons } from '../_constants/icons';

// Services
import { TodoService } from '../_services/todo.service';
import { TodoStatusModel } from '../_models/todo-status.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  // ----------------------------
  //      Properties
  // ----------------------------
  icons = icons;

  todos: TodoModel[];
  error = '';


  formAddItem = this.fb.group({
    name: ['']
  });

  formEditItem = this.fb.group({
    name: ['']
  });

  editItemId;



  // ----------------------------
  //      Constructor
  // ----------------------------

  constructor(
    private fb: FormBuilder,
    private todoSvc: TodoService) { }


  // ----------------------------
  //      Methods
  // ----------------------------

  // ----------------------------
  //      Event Handlers

  ngOnInit() {
    this.loadTodoList();
  }

  onClick_toggleItem(item: TodoModel) {
    item.isDone = !item.isDone;
    this.updateItemStatus(new TodoStatusModel({ id: item.id, isDone: item.isDone }));
  }

  onClick_deleteItem(id: number) {
    this.deleteItem(id);
  }

  onClick_editItem(id: number) {
    this.editItemId = id;
  }

  onKeydown_addItem_name() {
    this.addItem();
  }

  onSubmit_formAddItem() {
    this.addItem();
  }


  // ----------------------------
  //      Other


  addItem() {
    const model = (this.formAddItem.value);
    this.todoSvc.todosAdditem(model).subscribe(
      // on success
      (r) => {
        this.formAddItem.reset();
        this.loadTodoList();
      },
      // on error
      (error) => {
        this.error = error;
      });
  }

  updateItemStatus(model: TodoStatusModel) {

    this.todoSvc.todosUpdateStatus(model).subscribe(
      // on success
      (r) => {
        this.loadTodoList();
      },
      // on error
      (error) => {
        this.error = error;
      });
  }

  deleteItem(id: number) {
    this.todoSvc.todosDelete(id).subscribe(
      // on success
      (r) => {
        this.loadTodoList();
      },
      // on error
      (error) => {
        this.error = error;
      });
  }

  loadTodoList() {
    this.todoSvc.todosGetList().subscribe(
      // on success
      (r) => {
        this.todos = r;
      },
      // on error
      (error) => {
        this.error = error;
      });
  }

}
