import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';

export default function Ragister() {
  const[username,setUsername] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  
  let submitData =()=>{
    console.log(username);
    console.log(email);
    console.log(password);


    var data = {
      "username":username,
      "email": email,
      "password": password
    };
    fetch('https://infinite-falls-62114.herokuapp.com/api/auth/local/register',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
        
        body: JSON.stringify(data)

      
    })
    .then((response)=>{
      return response.json()

    }).then((response)=>{
      console.log(response)
      if(response.error){
        swal("Failed!", response.error.message, "error");
      }
      if(response.user){
        swal("Good Job!", JSON.stringify(response.user), "success");
      }

    }).catch((e)=>{ //e = error
      console.log(e)
  });
  }
  return (
    <Container>
    <Row>
        <Col xs={{ offset:3,span:6 }}>
            <h1>Registeration System With Fetch Api</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={username} onChange={(e)=>{ setUsername(e.target.value)  }} placeholder="Enter username" />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={(e)=>{ setEmail(e.target.value)  }} placeholder="Enter email" />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={password} onChange={(e)=>{ setPassword(e.target.value)  }} placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={ ()=>{ submitData() } }>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

  )
}
