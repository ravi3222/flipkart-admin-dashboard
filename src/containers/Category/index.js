import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../redux/actions";
import Input from "../../components/Input";
import ModalUI from "../../components/ModalUI";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

function Category() {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");

    // const cat = {
    //   categoryName,
    //   parentCategoryId,
    //   categoryImage,
    // };

    console.log("form", form);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let mycategories = [];

    for (let category of categories) {
      mycategories.push(
        {
          label: category.name,
          value: category._id,
          children:
            category.children.length > 0 && renderCategories(category.children),
        }
        // <li key={category.name}>
        //   {category.name}
        //   {category.children.length > 0 ? (
        //     <ul>{renderCategories(category.children)}</ul>
        //   ) : null}
        // </li>
      );
    }

    return mycategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log([
      { checked: checked },
      { expanded: expanded },
      { categories: categories },
      { checkedArray: checkedArray },
      { expandedArray: expandedArray },
    ]);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if ((type = "expanded")) {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });

    setUpdateCategoryModal(false);
  };

  const renderUpdateCategoryModal = () => {
    return (
      <ModalUI
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        modalTitle={`Update Category`}
        size="lg"
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Input
                    value={item.name}
                    placeholder={`Category Name`}
                    onChange={(e) =>
                      handleCategoryInput(
                        "name",
                        e.target.value,
                        index,
                        "expanded"
                      )
                    }
                  />
                </Col>
                <Col>
                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) =>
                      handleCategoryInput(
                        "parentId",
                        e.target.value,
                        index,
                        "expanded"
                      )
                    }
                  >
                    <option>Select category</option>
                    {createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select className="form-control">
                    <option value="">Select Type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            );
          })}

        <Row>
          <Col>
            <h6>Checked</h6>
          </Col>
        </Row>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Input
                    value={item.name}
                    placeholder={`Category Name`}
                    onChange={(e) =>
                      handleCategoryInput(
                        "name",
                        e.target.value,
                        index,
                        "checked"
                      )
                    }
                  />
                </Col>
                <Col>
                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) =>
                      handleCategoryInput(
                        "parentId",
                        e.target.value,
                        index,
                        "checked"
                      )
                    }
                  >
                    <option>Select category</option>
                    {createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select className="form-control">
                    <option value="">Select Type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            );
          })}

        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </ModalUI>
    );
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    console.log(idsArray);
    dispatch(deleteCategoriesAction(idsArray)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
        setDeleteCategoryModal(false);
      }
    });
  };

  const renderDeleteCategoryModal = () => {
    console.log("delete", checkedArray);
    return (
      <ModalUI
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={deleteCategories}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <li>
            <span key={index}>{item.name}</span>
          </li>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <li>
            <span key={index}>{item.name}</span>
          </li>
        ))}
      </ModalUI>
    );
  };

  const renderAddCategoryModal = () => {
    return (
      <ModalUI
        show={show}
        handleClose={handleClose}
        modalTitle={`Add New Category`}
      >
        <Input
          value={categoryName}
          placeholder={`Category Name`}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>Select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </ModalUI>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul> */}
            {/* {renderCategories(category.categories)} */}
            {/* {JSON.stringify(createCategoryList(category.categories))} */}
            {/* </ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button onClick={deleteCategory}>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>
      {renderAddCategoryModal()}
      {renderUpdateCategoryModal()}
      {renderDeleteCategoryModal()}
    </Layout>
  );
}

export default Category;
