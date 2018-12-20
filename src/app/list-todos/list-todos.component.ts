import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) { }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];
  message: string;

  constructor(
    private todoService: TodoDataService
  ) { }

  ngOnInit() {
    this.refreshTodos();
  }

  deleteTodo(id) {
    this.todoService.deleteTodo('in28minutes', id).subscribe(
      response => {
        this.refreshTodos();
        this.message = `Todo ${id} deleted!`;
      }
    );
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);        
        this.todos = response;
      }
    );
  }
}
