import React, { useEffect, useState, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomButton from "components/CustomButtons/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Check from "@material-ui/icons/Check";
import Grow from "@material-ui/core/Grow";

import Input from "../../components/Input/Input";
import Snackbar from "components/Snackbar/Snackbar.js";

import styles from "../../assets/jss/material-dashboard-react/components/tableListSyle";

import { Form } from "@unform/web";
import * as Yup from "yup";

import api from "../../services/api";

const useStyles = makeStyles(styles);

export default function TableList() {
  const [openUserModal, setOpenUserModal] = React.useState(false);
  const [openPostModal, setOpenPostModal] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tl, setTL] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [type, setType] = React.useState();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/users");
      setUsers(response.data);
    }
    async function loadPosts() {
      const response = await api.get("/posts");
      setPosts(response.data);
    }

    loadPosts();
    loadUsers();
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  }, []);

  const showNotification = (place, message, type) => {
    switch (place) {
      case "tl":
        if (!tl) {
          setType(type);
          setMessage(message);
          setTL(true);
          setTimeout(function () {
            setTL(false);
          }, 6000);
        }
        break;
      case "tc":
        if (!tc) {
          setType(type);
          setMessage(message);
          setTC(true);
          setTimeout(function () {
            setTC(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };

  const handleOpenUserModal = () => {
    setOpenUserModal(true);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };
  const handleOpenPostModal = () => {
    setOpenPostModal(true);
  };

  const handleClosePostModal = () => {
    setOpenPostModal(false);
  };

  async function handleDelete(prop) {
    if (prop.Data.length === 6) {
      await api.delete(`/users/${prop.id}`);
      const newUsers = users.filter((user) => user.id !== prop.id);
      setUsers(newUsers);

      showNotification("tl", "User deleted from the system", "danger");
    } else {
      await api.delete(`/posts/${prop.id}`);
      const newPosts = posts.filter((post) => post.id !== prop.id);
      setPosts(newPosts);
      showNotification("tl", "Post deleted from the system", "danger");
    }
  }

  async function handleUserSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        role: Yup.string().required(),
        avatar: Yup.string().url().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post("/users", data);

      setUsers([...users, response.data]);
      setOpenUserModal(false);

      showNotification("tc", "User was create with sucess", "success");
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  async function handlePostSubmit(data) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        body: Yup.string().required(),
        owner_id: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post("/posts", data);

      setPosts([...posts, response.data]);
      setOpenPostModal(false);
      showNotification("tc", "Post was create with sucess", "success");
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  function usersFormatted(users) {
    users.map((user) => {
      user["Data"] = [
        user.id,
        user.name,
        user.email,
        user.role,
        user.avatar,
        "Actions",
      ];
    });
    return users;
  }

  function postsFormatted(posts) {
    posts.map((post) => {
      post["Data"] = [
        post.id,
        post.title,
        post.body,
        post.owner.name,
        "Actions",
      ];
    });
    return posts;
  }
  const classes = useStyles();
  return (
    <>
      <Snackbar
        place="tc"
        color={type}
        icon={Check}
        message={message}
        open={tc}
        closeNotification={() => setTC(false)}
        close
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openUserModal}
        onClose={handleCloseUserModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openUserModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Create a new user</h2>
            <Form onSubmit={handleUserSubmit} ref={formRef}>
              <Input
                label="Name"
                className={classes.inputs}
                name="name"
                placeHolder="Type your name..."
              />
              <Input
                label="Email"
                className={classes.inputs}
                name="email"
                placeHolder="Type your email..."
              />
              <Input
                label="Role"
                className={classes.inputs}
                name="role"
                placeHolder="Type your role..."
              />
              <Input
                label="Avatar ( Only URL's )"
                className={classes.inputs}
                name="avatar"
                placeHolder="Send you link avatar"
              />
              <CustomButton color="primary" type="submit">
                Create a new post
              </CustomButton>
            </Form>
          </div>
        </Fade>
      </Modal>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Grow in="true">
            <Card>
              <CardHeader color="primary">
                <div>
                  <h4 className={classes.cardTitleWhite}>
                    Table of users from SpaceX
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                    Here some informations about our collaborators
                  </p>
                </div>
                <CustomButton color="rose" onClick={handleOpenUserModal}>
                  New user
                </CustomButton>
              </CardHeader>
              <CardBody>
                <Table
                  handleDelete={handleDelete.bind()}
                  tableHeaderColor="primary"
                  tableHead={["Name", "Email", "Role", "Avatar", "Actions"]}
                  tableData={usersFormatted(users)}
                />
              </CardBody>
            </Card>
          </Grow>
        </GridItem>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openPostModal}
          onClose={handleClosePostModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openPostModal}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Create a new post</h2>
              <Form onSubmit={handlePostSubmit} ref={formRef}>
                <Input
                  label="Title"
                  className={classes.inputs}
                  name="title"
                  placeHolder="Type the title for your post..."
                />
                <Input
                  label="Body"
                  className={classes.inputs}
                  name="body"
                  placeHolder="Type the body for your post..."
                />
                <Input
                  label="User"
                  className={classes.inputs}
                  dataSelect={users}
                  name="owner_id"
                />

                <CustomButton color="primary" type="submit">
                  Create a new post
                </CustomButton>
              </Form>
            </div>
          </Fade>
        </Modal>
        <GridItem xs={12} sm={12} md={12}>
          <Grow in="true">
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Table of news from SpaceX
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Here is some informations about the lastest news from SpaceX
                </p>
                <CustomButton color="rose" onClick={handleOpenPostModal}>
                  New post
                </CustomButton>
              </CardHeader>
              <CardBody>
                <Table
                  handleDelete={handleDelete.bind()}
                  tableHeaderColor="primary"
                  tableHead={["Title", "Body", "Owner", "Actions"]}
                  tableData={postsFormatted(posts)}
                />
              </CardBody>
            </Card>
          </Grow>
        </GridItem>
      </GridContainer>
    </>
  );
}
