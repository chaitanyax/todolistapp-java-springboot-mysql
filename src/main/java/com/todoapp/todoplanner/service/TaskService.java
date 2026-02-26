package com.todoapp.todoplanner.service;

import com.todoapp.todoplanner.model.Task;
import com.todoapp.todoplanner.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setCategory(taskDetails.getCategory());
        task.setPriority(taskDetails.getPriority());
        task.setStatus(taskDetails.getStatus());
        task.setDueDate(taskDetails.getDueDate());

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> searchTasks(String title) {
        return taskRepository.findByTitleContainingIgnoreCase(title);
    }
}
