import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import axios from "axios";
import { useNavigate } from "react-router-dom";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import kid from "assets/kid.png";
import bg from "assets/bg.jpg";

function User() {
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    address: "",
    about: "",
    username: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001");
        setUser(response.data[0]); // Access the first user object from the response array
        setEditUser(response.data[0]); // Set editUser state
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // navigate("/login");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:3001/update/${editUser.id}`, editUser)
      .then((res) => {
        console.log("User updated successfully");
        setUser(editUser); // Update the user state
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Company</label>
                        <Input
                          defaultValue={user.company}
                          disabled
                          placeholder="Company"
                          type="text"
                          name="company"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          value={editUser.username}
                          placeholder="Username"
                          type="text"
                          name="username"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Email address</label>
                        <Input
                          value={editUser.email}
                          placeholder="@gmail.com"
                          type="email"
                          name="email"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          value={editUser.firstname}
                          placeholder="First Name"
                          type="text"
                          name="firstname"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          value={editUser.lastname}
                          placeholder="Last Name"
                          type="text"
                          name="lastname"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          value={editUser.address}
                          placeholder="Home Address"
                          type="text"
                          name="address"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          value={editUser.about}
                          cols="80"
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                          name="about"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      className="btn btn-primary"
                      onClick={handleUpdateUser}
                    >
                      Update Profile
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={bg} />
              </div>
              <CardBody>
                <div className="author">
                  <a
                    href="https://github.com/VanCarlo95"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={kid}
                    />
                    <h5 className="title">
                      {user.firstname + " " + user.lastname}
                    </h5>
                  </a>
                  <p className="description">{user.username}</p>
                </div>
                <p className="description text-center">"ChatGPT Expert"</p>
              </CardBody>
              <hr />
              <div className="button-container">
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="https://github.com/VanCarlo95"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-facebook-f" />
                </Button>
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="https://github.com/VanCarlo95"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-twitter" />
                </Button>
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="https://github.com/VanCarlo95"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-google-plus-g" />
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
