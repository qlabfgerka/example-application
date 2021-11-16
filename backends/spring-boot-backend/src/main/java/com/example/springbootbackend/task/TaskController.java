package com.example.springbootbackend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "task")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task createTask(@RequestBody TaskAndUserIDWrapper body) {
        return this.taskService.createTask(body.getTask(), body.getUserId());
    }

    @GetMapping("{id}")
    public List<Task> getTasks(@PathVariable Long id) {
        return this.taskService.getTasks(id);
    }

    @DeleteMapping("{id}")
    public void removeTask(@PathVariable Long id) {
        this.taskService.removeTask(id);
    }

    @PutMapping
    public Task editTask(@RequestBody TaskAndUserIDWrapper task) {
        System.out.println("BODY: " + task.getTask());
        return this.taskService.editTask(task.getTask());
    }
}
