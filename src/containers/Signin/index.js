import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../components/Input";
import { login } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Signin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signin;
