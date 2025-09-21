"use strict";
exports.__esModule = true;
var react_1 = require("react");
var modalStyle = {
    background: 'white',
    position: 'absolute',
    left: '15vw',
    top: '40%',
    width: '70vw',
    height: '25vh',
    border: '1px solid black',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
};
function SignIn(props) {
    return (<div style={modalStyle}>
      <p style={{ fontWeight: 'bold' }}>You need to sign in first.</p>
      <div>
        <button onClick={props.onSignIn} style={{ marginRight: '1em' }}>Sign in</button>
        <button onClick={props.onModalClose}>Close</button>
      </div>
    </div>);
}
exports["default"] = SignIn;
