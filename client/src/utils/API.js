import axios from "axios";
import openSocket from "socket.io-client";
const socket = openSocket('http://localhost:3001');
let config = {
  headers: {'Authorization' : `bearer ${localStorage.getItem('jwt')}`}
}
export default {

  receiveFromBackEnd: (dataTo) => socket.emit('received-for-everyone',dataTo),
  getAllTodos: () => axios.get('/api/todo/',  config),
  registerUser: (info) => axios.post('/api/auth/register', info),
  loginUser: (info, headers) => axios.post('/api/auth/login', info, headers),
  disconnectSocket: () => socket.emit('disconnecting'),
  updateTask: (id, update) => axios.post(`/api/todo/_id/${id}`, update, config)

}