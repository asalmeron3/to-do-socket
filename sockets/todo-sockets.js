const todoController = require('../controllers/todoController');
let users = [];
let clientIds;

module.exports = (io) => {
  io.on('connection', (client) => {
    users.push(client)

    client.on('received-for-everyone', (data) => {
      todoController.create( data , (newDataEntry) => {
        users.forEach(eachClient => eachClient.emit('send-to-everyone', newDataEntry))
      })  
     });

    client.on('disconnecting', () => {
      users = users.filter(eachClient => eachClient.id != client.id);
    })
  });
}