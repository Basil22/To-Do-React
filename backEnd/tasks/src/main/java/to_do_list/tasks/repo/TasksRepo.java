package to_do_list.tasks.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import to_do_list.tasks.entity.TasksEntity;

@Repository
public interface TasksRepo extends JpaRepository<TasksEntity, Integer>{

}
