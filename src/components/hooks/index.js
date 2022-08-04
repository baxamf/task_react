import { useState } from "react";

export default function useFetch(callback) {
  const [tasks, setTasks] = useState([]);

  function run() {
    callback()
      .then((resp) => {
        setTasks(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return { run, tasks, setTasks };
}
