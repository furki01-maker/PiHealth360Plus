import React, { useState } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";

const MyEditor: React.FC = () => {
  const [value, setValue] = useState("");

  const handleChange = (content: string) => {
    setValue(DOMPurify.sanitize(content));
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