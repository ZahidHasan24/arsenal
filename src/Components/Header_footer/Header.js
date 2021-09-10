import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ArsenalLogo } from "../ui/icons";
import { logoutHandler } from "../ui/misc";

const Header = ({ user }) => {
  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#f20400",
        boxShadow: "none",
        padding: "10px 0",
        borderBottom: "2px solid #fff",
      }}
    >
      <Toolbar style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <div className="header_logo">
            <ArsenalLogo link={true} linkTo="/" width="70px" height="70px" />
          </div>
        </div>
        <Link to="/the_team" className="menu-item">
          <Button color="inherit">The team</Button>
        </Link>
        <Link to="/the_matches" className="menu-item">
          <Button color="inherit">Matches</Button>
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="menu-item">
              <Button color="inherit">Dashboard</Button>
            </Link>

            <Button color="inherit" onClick={() => logoutHandler()}>
              Log out
            </Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
