package com.rest.webservices.resfulwebservices.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TodoJpaResource {

   @Autowired
   private TodoHardcodedService todoService;

   @Autowired
   private TodoJpaRepository todoJpaRepository;

   @GetMapping("/jpa/users/{username}/todos")
   public List<Todo> getAllTodos(@PathVariable String username) {
      return todoJpaRepository.findByUsername(username);
   }

   @DeleteMapping("/jpa/users/{username}/todos/{id}")
   public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
      todoJpaRepository.deleteById(id);
      return ResponseEntity.noContent().build();
   }

   @GetMapping("/jpa/users/{username}/todos/{id}")
   public Todo getTodo(@PathVariable String username, @PathVariable long id) {
      return todoJpaRepository.findById(id).get();
   }

   @PutMapping("/jpa/users/{username}/todos/{id}")
   public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id,
                                          @RequestBody Todo todo) {
      Todo todoUpdated = todoJpaRepository.save(todo);
      return new ResponseEntity<Todo>(todo, HttpStatus.OK);
   }

   @PostMapping("/jpa/users/{username}/todos")
   public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todo todo) {
      Todo createdTodo = todoJpaRepository.save(todo);
      todo.setUsername(username);
      URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(createdTodo.getId()).toUri();

      return ResponseEntity.created(uri).build();
   }
}
