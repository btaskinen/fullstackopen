import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (object) => {
  const request = axios.delete(`${baseUrl}/${object.id}`);
  return request.then(() => `${object.name} was successfully deleted.`);
};

export default {
  getAll,
  create,
  update,
  deletePerson,
};
