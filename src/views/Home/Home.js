import React from "react";
import { Link } from "react-router-dom";

import Grow from "@material-ui/core/Grow";

import bg from "assets/img/backgroundHome.jpg";
import logo from "assets/img/spacex-logo.png";
import Button from "components/CustomButtons/Button";

import "assets/css/HomePage.css";

export default function Home() {
  return (
    <>
      <img src={bg} alt="background" className="background" />
      <Grow in="true">
        <div className="content">
          <img src={logo} alt="logo" />
          <h1>Welcome abord collaborator!</h1>
          <div className="card">
            <h4>
              This is our newsletter, here you can get all information about
              recent news from SpaceX
            </h4>
            <Link to="/admin/news">
              <Button color="primary" className="button">
                Get inside!
              </Button>
            </Link>
          </div>
        </div>
      </Grow>
    </>
  );
}
