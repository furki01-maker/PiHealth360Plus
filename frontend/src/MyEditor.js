"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_quill_1 = require("react-quill");
var dompurify_1 = require("dompurify");
require("react-quill/dist/quill.snow.css");
var MyEditor = function () {
    var _a = (0, react_1.useState)(""), value = _a[0], setValue = _a[1];
    var handleChange = function (content) {
        setValue(dompurify_1["default"].sanitize(content)); // HTML sanitize
    };
    return (<div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <react_quill_1["default"] value={value} onChange={handleChange}/>
      <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", minHeight: "100px" }}>
        <h2>Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: value }}/>
      </div>
    </div>);
};
exports["default"] = MyEditor;
