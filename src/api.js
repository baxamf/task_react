import axios from "axios";

const URL = "https://62d926c290883139359c0527.mockapi.io/tasks";

export default class Queries {
  static async get() {
    const response = await axios.get(URL);
    return response.data;
  }
  static async add(newTask) {
    const response = await axios.post(URL, newTask);
    return response.data;
  }
  static del(id) {
    axios.delete(`${URL}/${id}`);
  }
  static edit(id, title) {
    console.log(title);
    axios.put(`${URL}/${id}`, title);
  }
  static complete(id, completed) {
    axios.put(`${URL}/${id}`, { completed });
  }
}
