package com.example.springbootbackend.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.user.id = ?1")
    List<Task> findTasksByUserId(Long userId);

    @Transactional
    @Modifying
    @Query("UPDATE Task t SET t.title = ?2, t.description = ?3 WHERE t.id = ?1")
    void updateTask(Long taskId, String title, String description);
}
