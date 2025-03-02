package to_do_list.tasks.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class TasksEntity {

	@Id
	@GeneratedValue
	private int taskId;
	
	private String taskName;
	
	private boolean isCompleted = false;
	
	public TasksEntity(){
		
	}

	public TasksEntity(int taskId, String taskName, boolean isCompleted) {
		super();
		this.taskId = taskId;
		this.taskName = taskName;
		this.isCompleted = isCompleted;
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public boolean isCompleted() {
		return isCompleted;
	}

	public void setCompleted(boolean isCompleted) {
		this.isCompleted = isCompleted;
	}

	
}
