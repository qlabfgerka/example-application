package com.example.springbootbackend.task;

import com.example.springbootbackend.task.Task;

public class TaskAndUserIDWrapper {
    private Task task;
    private Long userId;

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
