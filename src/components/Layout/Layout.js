import React from "react";
import Aux from "./../../hoc/Aux";
import "./Layout.css";

const Layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, BackdropBackdrop</div>
    <main className="content">{props.children}</main>
  </Aux>
);

export default Layout;
