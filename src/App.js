import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Queries from "./api";
import Error from "./components/UI/Error/Error";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState({ state: false, text: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const response = await Queries.get();
    setTasks(response);
  }

  const errorHandler = (state, text) => {
    setError({ text, state });
  };

  const errorUpdater = (e) => {
    e.stopPropagation();
    error.state && setError(false, "");
  };

  const addRerender = (updateTask) => {
    setTasks([...tasks, updateTask]);
  };

  const removeRerender = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const editRerender = (id, title) => {
    const task = tasks.find((task) => task.id === id);
    const editedTask = { ...task, title: title };
    setTasks(tasks.map((task) => (task.id === id ? editedTask : task)));
  };

  const completedRerender = (id, completed) => {
    const task = tasks.find((task) => task.id === id);
    const editedTask = { ...task, completed };
    setTasks(tasks.map((task) => (task.id === id ? editedTask : task)));
  };

  return (
    <div onClick={errorUpdater} className="App">
      <Form rerender={addRerender} error={errorHandler} />
      {error.state ? <Error>{error.text}</Error> : null}
      {tasks.length ? (
        <TodoList
          tasks={tasks}
          rerender={{ removeRerender, editRerender, completedRerender }}
        />
      ) : null}
    </div>
  );
}

export default App;
