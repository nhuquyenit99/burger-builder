import React from "react";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <>
        <Toolbar drawerToggleClicked={this.sideDrawToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawClosedHandler}
        />
        <main className="content">{this.props.children}</main>
      </>
    );
  }
}
export default Layout;
