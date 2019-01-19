import React from 'react';
import {Alert} from 'reactstrap';

const Todo = (props) => 

  <Alert color = "info">
    {props.children}
  </Alert>

  


export default Todo;