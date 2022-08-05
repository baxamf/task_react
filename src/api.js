import axios from "axios";

const URL = "https://62d926c290883139359c0527.mockapi.io/tasks";

export default class Queries {
  static get() {
    return axios.get(URL);
  }
  static getSingle(id) {
    return axios.get(`${URL}/${id}`);
  }
  static add(newTask) {
    return axios.post(URL, newTask);
  }
  static del(id) {
    axios.delete(`${URL}/${id}`);
  }
  static edit(id, update) {
    axios.put(`${URL}/${id}`, update);
  }
}
