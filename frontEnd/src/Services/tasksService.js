const BASE_URL = "http://localhost:8080/tasks/";

export const getAllTasks = async () => {
  try {
    const response = await fetch(BASE_URL + "getAll");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const addTask = async (taskName) => {
  try {
    const response = await fetch(BASE_URL + "add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const completeTask = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}complete?taskId=${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}delete?taskId=${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (err) {
    console.error(err);
  }
};
