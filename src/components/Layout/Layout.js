import React from "react";
import "./Layout.css";

const Layout = (props) => (
  <>
    <div>Toolbar, SideDrawer, BackdropBackdrop</div>
    <main className="content">{props.children}</main>
  </>
);

export default Layout;
