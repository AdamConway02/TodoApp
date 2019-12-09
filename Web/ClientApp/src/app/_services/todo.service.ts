import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Constants
import { environment } from 'src/environments/environment';
import { apis } from '../_constants/apis';

// Models
import { TodoModel } from '../_models/todo.model';
import { TodoStatusModel } from '../_models/todo-status.model';

// Modules
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // ----------------------------
  //      Properties
  // ----------------------------
  private apiRootUrl = environment.apiUrl;
  private url = `${this.apiRootUrl}/${apis.todos}`;



  // ----------------------------
  //      Constructor
  // ----------------------------

  // when prefixed with keyword private the mothod parameters become available in the scope of the class.
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService) {
  }

  // ----------------------------
  //      Methods
  // ----------------------------

  todosGetList() {
    this.spinner.show();
    return this.http.get<TodoModel[]>(this.url)
      .pipe(finalize(() => {
        this.spinner.hide();
      }));
  }

  todosAdditem(model: TodoModel) {
    this.spinner.show();
    return this.http.post<TodoModel>(this.url, model)
      .pipe(finalize(() => {
        this.spinner.hide();
      }));
  }

  todosUpdateStatus(model: TodoStatusModel) {
    this.spinner.show();
    const url = `${this.apiRootUrl}/${apis.getUpdateStatus(model.id)}`;
    return this.http.put(url, model)
      .pipe(finalize(() => {
        this.spinner.hide();
      }));
  }

  todosDelete(id: number) {
    this.spinner.show();
    return this.http.delete(`${this.url}/${id}`)
      .pipe(finalize(() => {
        this.spinner.hide();
      }));
  }
}
