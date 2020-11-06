/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Input from "../Input/Input";
import Button from "../CustomButtons/Button";

import api from "../../services/api";

import { Form } from "@unform/web";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "grid",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #005288",
    borderRadius: "10px",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
    width: "300px",
  },
  inputs: {
    display: "flex",
    font: "inherit",
    color: "#000",
    border: "2px solid #005288",
    borderRadius: "5px",
    width: "70%",
    height: "1.1876em",
    margin: "0",
    padding: "8px",
    minWidth: "0",
    background: "none",
    boxSizing: "content-box",
    letterSpacing: "inherit",
    animationDuration: "10ms",
  },
  button: {
    marginTop: "40px",
    marginBottom: "20px",
  },
}));

export default function TransitionsModal(props) {
  // const formRef = useRef(null);
  const { editData } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const formRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // TODO: form for post and user
  function renderForm() {
    if (editData.Data.length === 5) {
      return "Update Post";
    } else if (editData.Data.length === 6) {
      return "Update User";
    }
  }
  async function handleSubmit(data) {
    const lengthData = Object.keys(data).length;

    if (lengthData === 4) {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().notRequired(),
          email: Yup.string().email().notRequired(),
          role: Yup.string().notRequired(),
          avatar: Yup.string().url().notRequired(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/users/${editData.id}`, data);

        window.location.reload();
      } catch (err) {
        const validationErrors = {};

        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });

          formRef.current.setErrors(validationErrors);
        }
      }
    } else if (lengthData === 2) {
      try {
        const schema = Yup.object().shape({
          title: Yup.string().notRequired(),
          body: Yup.string().notRequired(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/posts/${editData.id}`, data);

        window.location.reload();
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
  }
  function filterData(editData) {
    let newEditData = JSON.parse(JSON.stringify(editData));
    delete newEditData["created_at"];
    delete newEditData["updated_at"];
    delete newEditData["Data"];
    delete newEditData["owner_id"];
    delete newEditData["owner"];
    return newEditData;
  }

  const filteredData = Object.keys(filterData(editData));
  return (
    <div>
      <IconButton color="primary" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Form onSubmit={handleSubmit} ref={formRef}>
              <h2 id="transition-modal-title">{renderForm()}</h2>
              {filteredData.map((field, key) => {
                if (key === 0) return null;
                if (field === "user") {
                  return (
                    <Input
                      key={key}
                      label={field}
                      className={classes.inputs}
                      name={field}
                      defaultValue={editData[field]}
                    />
                  );
                }
                return (
                  <Input
                    key={key}
                    label={field}
                    className={classes.inputs}
                    name={field}
                    defaultValue={editData[field]}
                  />
                );
              })}
              <Button
                color="primary"
                justify="center"
                className={classes.button}
                type="submit"
              >
                Save
              </Button>
            </Form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
