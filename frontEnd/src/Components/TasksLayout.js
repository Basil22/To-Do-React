import { Box, Input, Button, Card, Radio } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  addTask,
  completeTask,
  getAllTasks,
  deleteTask,
} from "../Services/tasksService";
import DeleteIcon from "@mui/icons-material/Delete";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../contexts/ThemeContext";

function TasksLayout() {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const { mode, toggleTheme } = useTheme();

  const [completedTask, setCompletedTask] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasks();

      setTaskList(tasks.filter((task) => !task.completed));
      setCompletedTask(tasks.filter((task) => task.completed));
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (taskInput.trim() === "") return;

    if (taskList.map((task) => task.taskName).includes(taskInput)) {
      alert("Task already exists");
      setTaskInput("");
      return;
    }

    const newTask = await addTask(taskInput);
    setTaskList((prevState) => [...prevState, newTask]);

    setTaskInput("");
  };

  const handleCompletedTasks = async (taskId) => {
    try {
      const task = taskList.find((t) => t.taskId === taskId);

      if (!task || task.completed) {
        return;
      }

      const newTask = await completeTask(taskId);

      setTaskList((prevState) => prevState.filter((t) => t.taskId !== taskId));

      setCompletedTask((prevState) => [...prevState, newTask]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUncompletedTask = async (taskId) => {
    try {
      const task = completedTask.find((t) => t.taskId === taskId);

      if (!task || !task.completed) {
        return;
      }

      const newTask = await completeTask(taskId);

      setCompletedTask((prevState) =>
        prevState.filter((t) => t.taskId !== taskId)
      );

      setTaskList((prevState) => [...prevState, newTask]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTasks = async (taskId) => {
    try {
      const taskInTaskList = taskList.find((t) => t.taskId === taskId);
      const taskInCompletedTask = completedTask.find(
        (t) => t.taskId === taskId
      );

      if (!taskInTaskList && !taskInCompletedTask) {
        console.log("Task not found in either list.");
        return;
      }

      await deleteTask(taskId);

      if (taskInTaskList) {
        setTaskList((prevState) =>
          prevState.filter((t) => t.taskId !== taskId)
        );
      }
      if (taskInCompletedTask) {
        setCompletedTask((prevState) =>
          prevState.filter((t) => t.taskId !== taskId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <h1 style={{ margin: 0 }}>My Tasks</h1>
        <Button
          onClick={toggleTheme}
          sx={{ minWidth: 0, padding: 0 }} // To make button smaller
        >
          {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 1, mb: 2, mt: 5 }}>
        <Input
          placeholder="Add Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <Button size="small" variant="contained" onClick={handleAddTask}>
          <AddIcon />
        </Button>
      </Box>
      <Box>
        {taskList.map((task) => (
          <Card key={task.taskId} sx={{ p: 1, mb: 2, maxWidth: 300 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <p key={task.taskId}>{task.taskName}</p>
              <Box display="flex" alignItems="center">
                <Radio
                  checked={task.completed}
                  size="small"
                  onClick={() => handleCompletedTasks(task.taskId)}
                />
                <DeleteIcon
                  sx={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDeleteTasks(task.taskId)}
                />
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
      {completedTask.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <h2>Completed Tasks</h2>
          {completedTask.map((task) => (
            <Card key={task.taskId} sx={{ p: 1, mb: 2, maxWidth: 300 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <p key={task.taskId} style={{ textDecoration: "line-through" }}>
                  {task.taskName}
                </p>
                <Box display="flex" alignItems="center">
                  <Radio
                    size="small"
                    checked
                    onClick={() => handleUncompletedTask(task.taskId)}
                  />
                  <DeleteIcon
                    sx={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDeleteTasks(task.taskId)}
                  />
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default TasksLayout;
