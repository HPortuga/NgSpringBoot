import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

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
    private todoService: TodoDataService,
    private router: Router
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

  updateTodo(id) {
    this.router.navigate(['todos', id]);
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);        
        this.todos = response;
      }
    );
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }
}
