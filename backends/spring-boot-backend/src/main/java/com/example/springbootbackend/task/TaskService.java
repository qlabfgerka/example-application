package com.example.springbootbackend.task;

import com.example.springbootbackend.user.User;
import com.example.springbootbackend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Task task, Long userId) {
        User user = this.userRepository.getById(userId);
        task.setUser(user);
        this.taskRepository.save(task);
        return task;
    }

    public List<Task> getTasks(Long userId) {
        return this.taskRepository.findTasksByUserId(userId);
    }

    public void removeTask(Long taskId) {
        this.taskRepository.deleteById(taskId);
    }

    public Task editTask(Task task) {
        this.taskRepository.updateTask(task.getId(), task.getTitle(), task.getDescription());
        return task;
    }
}
