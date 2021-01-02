import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { useSelector } from "react-redux";

function Products() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState("");
  const category = useSelector((state) => state.category);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductImage = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  console.log(productPictures);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Name"
            value={name}
            placeholder={`Product Name`}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Quantity"
            value={name}
            placeholder={`Quantity`}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Price"
            value={name}
            placeholder={`Price`}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Description"
            value={name}
            placeholder={`Description`}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          {productPictures.length > 0
            ? productPictures.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}

          <input
            type="file"
            name="productImage"
            onChange={handleProductImage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default Products;
