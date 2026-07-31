import "./Editor.css";
import MonacoEditor from "@monaco-editor/react";

function Editor({ code, onCodeChange, language }) {
  return (
    <div className="editor">
      <MonacoEditor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => onCodeChange(value || "")}
      />
    </div>
  );
}

export default Editor;