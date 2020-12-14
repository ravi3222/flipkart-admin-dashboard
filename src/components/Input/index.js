import React from "react";
import { Form } from "react-bootstrap";

function Input({ label, type, placeholder, error, value, onChange }) {
  return (
    <Form.Group controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Form.Text className="text-muted">{error} </Form.Text>
    </Form.Group>
  );
}

export default Input;
