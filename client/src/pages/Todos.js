import React, { Component } from 'react';
import API from '../utils/API';
import openSocket from "socket.io-client";
import {Button, Form, FormGroup, InputGroup, InputGroupAddon, Input, ListGroup, ListGroupItem, ListGroupItemHeading, Row, Col, Container, Label} from 'reactstrap';

const socket = openSocket('http://localhost:3001');

class Todo extends Component {
  state = {
    todos:[],
    todoInput: '',
  }
  sendToDbAndReceive = (event) => { 
    event.preventDefault();
    API.receiveFromBackEnd({task: this.state.todoInput})
  }

  changeInput = (event) => {
    if(event.target.name) {
      this.setState({[event.target.name]: event.target.value})
    }
  }

  updateCompleted = (event) =>{
    let id = event.target.getAttribute('data-dbid');
    const completed = event.target.getAttribute('checked') === '';
    console.log(event.target)
    // API.updateTask(id, {completed: !completed})
    // .then(res => {
    //   let copyTodos = this.state.todos;
    //   copyTodos.map( eachTodo => {
    //     if(eachTodo._id === res.data._id){
    //       eachTodo.completed = res.data.completed
    //     }
    //     return eachTodo
    //   })
    //   this.setState({todos: copyTodos})
    // } )
    // .catch(err => console.log(err))
  }
  componentDidMount() {
    API.getAllTodos()
    .then(res => {
      this.setState({todos: res.data})
    })
    .catch(err => console.log(err))

    socket.on('send-to-everyone', (dataFrom) => {
      this.setState({todos: this.state.todos.concat([dataFrom])})
    })
  }

  componentWillUnmount() {
    API.disconnectSocket()
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render() {
    
    return (
      <Container>
        <Row>
          <Col  xs = "12" sm = "12" md = {{size: 8, offset: 2 }} lg = {{size: 8, offset: 2 }} xl = {{size: 8, offset: 2 }}>
            <Form>
              <FormGroup >
                <InputGroup>
                  <Input id = 'todoInputField' name = 'todoInput' onChange={this.changeInput} placeholder = "Add a task todo" value = {this.state.value} />
                  <InputGroupAddon addonType = 'append'>
                    <Button color = 'primary' onClick = {this.sendToDbAndReceive}> Submit </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col  xs = {{size: 8, offset: 2 }} sm = {{size: 8, offset: 2 }} md = {{size: 6, offset: 3 }} lg = {{size: 6, offset: 3 }} xl = {{size: 6, offset: 3 }}>
            <ListGroup>
              <ListGroupItemHeading> Shared Todo List</ListGroupItemHeading>
                {this.state.todos.map( (eachTask, i) => 
                <ListGroupItem key = {i}>
                  <Form>
                    <FormGroup check inline>
                      <Label check>
                        <Input type = 'checkbox'  data-dbid = {eachTask._id} onChange = {this.updateCompleted} />
                          {eachTask.task}
                      </Label>
                    </FormGroup>
                  </Form>
                </ListGroupItem>
                )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Todo;
