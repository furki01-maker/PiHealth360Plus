"use strict";
exports.__esModule = true;
var react_1 = require("react");
var headerStyle = {
    padding: 8,
    backgroundColor: "gray",
    color: "white",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
};
function Header(props) {
    return (<header style={headerStyle}>
      <div style={{ fontWeight: "bold" }}>Pi Bakery</div>

      <div>
        {props.user === null ? (<button onClick={props.onSignIn}>Sign in</button>) : (<div>
            @{props.user.username} <button type="button" onClick={props.onSignOut}>Sign out</button>
          </div>)}
      </div>
    </header>);
}
exports["default"] = Header;
