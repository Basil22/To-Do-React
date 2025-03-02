package to_do_list.tasks.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to_do_list.tasks.entity.TasksEntity;
import to_do_list.tasks.repo.TasksRepo;

@Service
public class TasksServiceImpl implements TasksService{
	
	@Autowired
	private TasksRepo taskRepo;

	@Override
	public TasksEntity addTask(TasksEntity task) {
		task.setCompleted(false);
		return taskRepo.save(task);
	}

	@Override
	public List<TasksEntity> getTasks() {
		return taskRepo.findAll();
	}

	@Override
	public void deleteTasks(int taskId) {
		taskRepo.deleteById(taskId);
	}

	@Override
	public String updateTask(int taskId, TasksEntity task) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TasksEntity completeTask(int taskId) {
		TasksEntity task = taskRepo.findById(taskId).get();
		task.setCompleted(!task.isCompleted());
		return taskRepo.save(task);
	}
	
	@Override
	public TasksEntity getById(int taskId) {
		return taskRepo.findById(taskId).get();
	}

}
