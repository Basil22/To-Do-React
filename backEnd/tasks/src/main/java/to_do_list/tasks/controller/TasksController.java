package to_do_list.tasks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import to_do_list.tasks.entity.TasksEntity;
import to_do_list.tasks.service.TasksService;

@CrossOrigin("*")
@RestController
@RequestMapping("/tasks")
public class TasksController {

	@Autowired
	private TasksService taskService;
	
	@PostMapping("/add")
	public ResponseEntity<TasksEntity> addTask(@RequestBody TasksEntity task){
		return ResponseEntity.ok(taskService.addTask(task));
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<List<TasksEntity>> getAllTask(){
		return ResponseEntity.ok(taskService.getTasks());
	}
	
	@PutMapping("/complete")
	public ResponseEntity<TasksEntity> completeTask(@RequestParam int taskId){
		return ResponseEntity.ok(taskService.completeTask(taskId));
	}
	
	@GetMapping("/get")
	public ResponseEntity<TasksEntity> getById(@RequestParam int taskId){
		return ResponseEntity.ok(taskService.getById(taskId));
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<Void> deleteById(@RequestParam int taskId){
		taskService.deleteTasks(taskId);
		return ResponseEntity.noContent().build();
	}
}
