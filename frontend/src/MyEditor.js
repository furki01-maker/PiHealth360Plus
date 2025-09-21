import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyEditor = () => {
  const [value, setValue] = useState("");

  const handleChange = (content) => {
    setValue(content);
  };

  return (
    <div>
      <ReactQuill value={value} onChange={handleChange} />
      <div>
        <h2>Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
};

export default MyEditor;