import React from "react";
import Layout from "../../components/Layout";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../components/Input";
import { login } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Signin() {
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email: "rahul1@gmail.com",
      password: "123456",
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
                value=""
                type="email"
                onChange={() => {}}
              />

              <Input
                label="Password"
                placeholder="Password"
                value=""
                type="password"
                onChange={() => {}}
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
