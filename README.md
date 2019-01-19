# To-Do-Socket
- This app uses SocketIO to send new todo items to all clients that are logged in. This is a MERN stack app styled with reactstrap.

## Goal
- The goal of building this app was to familiarize myself with SocketIO, PassportJS, Bcrypt and reactstrap.

## Additions
- Each todo on the list needs to have a checkbox icon that toggles and updates task completion in the database.
  * Lines 24 - 40 : client/src/pages/Todos
- Checkbox needs to be persistent based on information received from the database.
- Each todo needs to have an 'X' button for deleting task from the database.
