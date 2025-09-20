import React from "react";
import MyEditor from "./MyEditor";
import PaymentButton from "./components/PaymentButton";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>My React Editor</h1>
      <MyEditor />
      <PaymentButton />
    </div>
  );
};

export default App;