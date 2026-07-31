import "./Navbar.css";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

function Navbar({
   roomId,
  language,
  setLanguage,
  setCode,
  templates,
  onRun,
  loading
}){
  return (
    <div className="navbar">

      <div className="logo">
        ⚡ CodeSync
      </div>

      <div
  className="room"
  onClick={() => {
    navigator.clipboard.writeText(roomId);
    alert("Room ID copied!");
  }}
  style={{ cursor: "pointer" }}
>
  📋 Room: {roomId}
</div>

      <div className="actions">

      <LanguageSelector
  language={language}
  setLanguage={setLanguage}
  setCode={setCode}
  templates={templates}
/>

<button
        onClick={() => {
       navigator.clipboard.writeText(window.location.href);
       alert("Room link copied!");
      }}
   >
      Share
</button>

        <button
    onClick={onRun}
    disabled={loading}
>
    {loading ? "Running..." : "Run ▶"}
</button>
      </div>
    </div>
  );
}

export default Navbar;