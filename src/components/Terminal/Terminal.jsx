import "./Terminal.css";
import { useEffect, useRef } from "react";

function Terminal({
  terminalHistory,
  currentInput,
  setCurrentInput,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [terminalHistory]);

  return (
    <div className="terminal">

      <div className="terminal-header">
        TERMINAL
      </div>

      <div className="terminal-body">

        {terminalHistory.map((item, index) => (
          <div key={index} className="terminal-entry">

            <div className="terminal-command">
              <span className="prompt">&gt;</span> {item.input}
            </div>

            <pre
              className={
                item.type === "error"
                  ? "terminal-error"
                  : "terminal-success"
              }
            >
              {item.output}
            </pre>

          </div>
        ))}

        <div className="terminal-current">

          <span className="prompt">&gt;</span>

          <textarea
            className="terminal-input"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Enter program input..."
            rows={1}
          />

        </div>

        <div ref={bottomRef}></div>

      </div>

    </div>
  );
}

export default Terminal;