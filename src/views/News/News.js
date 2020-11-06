import React, { useState, useEffect } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import api from "../../services/api";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get("/posts");

      setPosts(response.data);
    }
    loadPosts();
  }, []);
  console.log(posts);
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={6}>
          {posts.map((post, key) => (
            <Grow key={key} in="true">
              <Card key={key} className={classes.root}>
                <CardHeader color="primary">
                  <h3 className={classes.newsTitle}>{post.title}</h3>
                </CardHeader>
                <CardBody>
                  <p className={classes.cardCategory}>{post.body}</p>
                </CardBody>
                <CardFooter>
                  <div className={classes.stats}>
                    <EditIcon /> Write by {post.owner.name}, {post.owner.role}
                  </div>
                </CardFooter>
              </Card>
            </Grow>
          ))}
        </GridItem>
      </GridContainer>
    </div>
  );
}
