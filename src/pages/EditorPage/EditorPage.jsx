import "./EditorPage.css";
import { useParams } from "react-router-dom";
import { useState} from "react";
import { useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Editor from "../../components/Editor/Editor";
import Terminal from "../../components/Terminal/Terminal";
import { runCode, getResult } from "../../api/judge0";
import { templates } from "../../utils/templates";
import socket from "../../socket/socket";

function EditorPage() {
  const { roomId } = useParams();

const [loading, setLoading] = useState(false);
const savedWorkspace = JSON.parse(
  localStorage.getItem(`workspace-${roomId}`)
);

const [language, setLanguage] = useState(
  savedWorkspace?.language || "cpp"
);

const [code, setCode] = useState(
  savedWorkspace?.code || templates.cpp
);

const [currentInput, setCurrentInput] = useState("");
const [terminalHistory, setTerminalHistory] = useState([]);
const [users, setUsers] = useState([]);
useEffect(() => {
  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  return () => {
    socket.off("connect");
  };
}, []);

useEffect(() => {
  socket.emit("join-room", roomId);
}, [roomId]);
 
useEffect(() => {
  socket.on("receive-code", (newCode) => {
    setCode(newCode);
  });

  return () => {
    socket.off("receive-code");
  };
}, []);
useEffect(() => {
  socket.on("users-update", (usersList) => {
    setUsers(usersList);
  });

  return () => {
    socket.off("users-update");
  };
}, []);
useEffect(() => {
  const workspace = {
    code,
    language,
  };

  localStorage.setItem(
    `workspace-${roomId}`,
    JSON.stringify(workspace)
  );
}, [code, language, roomId]);
useEffect(() => {
  socket.on("receive-code", (newCode) => {
    console.log("📥 Received code");

    setCode(newCode);
  });

  return () => socket.off("receive-code");
}, []);
function handleCodeChange(newCode) {
  console.log("📤 Sending code");

  setCode(newCode);

  socket.emit("code-change", {
    roomId,
    code: newCode,
  });
}

async function handleRun() {
  try {
    setLoading(true);

    const needsInput =
      language === "cpp"
        ? /\bcin\s*>>|\bgetline\s*\(/.test(code)
        : language === "python"
        ? /\binput\s*\(/.test(code)
        : language === "java"
        ? /Scanner|BufferedReader/.test(code)
        : language === "javascript"
        ? /prompt\s*\(/.test(code)
        : false;

    if (needsInput && currentInput.trim() === "") {
      setTerminalHistory((prev) => [
        ...prev,
        {
          input: "",
          output: "⚠ Program requires input.",
          type: "error",
        },
      ]);

      setLoading(false);
      return;
    }

    const token = await runCode(code, language, currentInput);

    const result = await getResult(token);

    const finalOutput =
      result.stdout ||
      result.compile_output ||
      result.stderr ||
      "No Output";

    setTerminalHistory((prev) => [
      ...prev,
      {
        input: currentInput,
        output: finalOutput,
        type: "success",
      },
    ]);

    setCurrentInput("");

  } catch (error) {
    console.error(error);
    setTerminalHistory((prev) => [
      ...prev,
      {
        input: currentInput,
        output: "Something went wrong.",
        type: "error",
      },
    ]);
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="editor-page">

     <Navbar
  roomId={roomId}
  language={language}
  setLanguage={setLanguage}
  setCode={setCode}
  templates={templates}
  onRun={handleRun}
  loading={loading}
  />

      <div className="editor-main">
        <Sidebar
  users={users}
  language={language}
/>
        <Editor
  code={code}
  language={language}
  onCodeChange={handleCodeChange}
/>

      </div>
      <div className="bottom-panel">

 <Terminal
    terminalHistory={terminalHistory}
    currentInput={currentInput}
    setCurrentInput={setCurrentInput}
/>
</div>
    </div>
  );
}
export default EditorPage;