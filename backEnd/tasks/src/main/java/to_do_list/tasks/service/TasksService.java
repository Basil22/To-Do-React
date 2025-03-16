package to_do_list.tasks.service;

import java.util.List;

import to_do_list.tasks.entity.TasksEntity;

public interface TasksService {
	
	public TasksEntity addTask(TasksEntity task);
	public TasksEntity getById(int taskId);
	public List<TasksEntity> getTasks();
	public String deleteTasks(int taskId);
	public String updateTask(int taskId, TasksEntity task);
	public TasksEntity completeTask(int taskId);
	
}
