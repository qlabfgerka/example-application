package org.acme.task;

import org.acme.user.User;
import org.acme.user.UserRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class TaskService {
    @Inject
    private TaskRepository taskRepository;

    @Inject
    private UserRepository userRepository;

    public Task createTask(Task task, Long userId) {
        User user = this.userRepository.findById(userId);
        task.setUser(user);
        this.taskRepository.persist(task);

        return task;
    }

    public List<Task> getTasks(Long userId) {
        return this.taskRepository.list("user_id", userId);
    }

    public void removeTask(Long taskId) {
        this.taskRepository.delete("id", taskId);
    }

    public Task editTask(Task task) {
        this.taskRepository.update(
                "title = ?1, description = ?2 WHERE id = ?3",
                task.getTitle(),
                task.getDescription(),
                task.getId());
        return task;
    }
}
