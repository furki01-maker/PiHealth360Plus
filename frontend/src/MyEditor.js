import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyEditor = () => {
  const [value, setValue] = useState("");

  const handleChange = (content) => {
    setValue(content);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <ReactQuill value={value} onChange={handleChange} />
      <div style={{ marginTop: "20px" }}>
        <h2>Preview:</h2>
        <div
          style={{ border: "1px solid #ccc", padding: "10px", minHeight: "100px" }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
};

export default MyEditor;