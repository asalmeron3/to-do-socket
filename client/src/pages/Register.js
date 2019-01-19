import React, { Component } from "react";
import API from "../utils/API";
import {Button, Form, Input, FormGroup, FormText, Container, Row, Col} from "reactstrap";

class Login extends Component {
  state = {
    username: "",
    password1: "",
    password2: "",
    registered: false,
    login_username: "",
    login_password: ""

  };

  handleInputChange = (e) =>{
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  };

  register = (e) => {
    e.preventDefault();
    if ( this.state.password1 === this.state.password2) {
      const info = {
        username: this.state.username,
        password: this.state.password1
      }
      API.registerUser(info)
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('jwt',res.data.token)
          window.location.replace('/todos')
        }
      }).catch(err => console.log(err))
    }
    
  }
  login = (e) => {
    e.preventDefault();
    const info = {
      username: this.state.login_username,
      password: this.state.login_password
    }
    API.loginUser(info)
    .then(res => {
      if (res.data.success) {
        localStorage.setItem('jwt',res.data.token)
        window.location.replace('/todos')
      }
    }).catch(err => console.log(err))
  }
  
  toggleRegistered = (e) => {
    e.preventDefault();
    this.setState({registered: !this.state.registered})
  }
  
  render() {
    return (
      <Container>
        <Row >
            <Col xs = {{size: 10, offset: 1 }} sm = {{size: 10, offset: 1 }} md = {{size: 6, offset: 3 }} lg = {{size: 4, offset: 4 }} xl = {{size: 4, offset: 4 }}>
            <Form>
              {this.state.registered ? 
                <FormGroup>
                  <Input name = 'login_username' placeholder = "Username" val = {this.state.login_username} onChange = {this.handleInputChange} />
                  <Input name = 'login_password' placeholder = "Password" val = {this.state.login_password} onChange = {this.handleInputChange} />
                  <Button color = 'primary' onClick = {this.login}> Login </Button>
                  <FormText> New User? <u onClick = {this.toggleRegistered}> Register here.</u></FormText>
                </FormGroup>
                :
                <FormGroup>
                  <Input name = 'username' placeholder = "Username" val = {this.state.username} onChange = {this.handleInputChange} />
                  <Input name = 'password1' placeholder = "Password" val = {this.state.password1} onChange = {this.handleInputChange} />
                  <Input name = 'password2' placeholder = "Re-Enter Password" val = {this.state.password2} onChange = {this.handleInputChange} />
                  <Button color = 'primary' onClick = {this.register}> Register </Button>
                  <FormText> Already registered, <u onClick = {this.toggleRegistered}> Login here.</u></FormText>
                </FormGroup>
              }
            </Form>
          </Col>
        </Row>
        <Row>
          <p> Recruiter Login - username: interview password: him</p>
        </Row>
      </Container>
    )
  }
}

export default Login;