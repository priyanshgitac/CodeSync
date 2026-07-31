import "./Sidebar.css";

function Sidebar({ users, language }) {
  return (
    <div className="sidebar">

      <h3>Explorer</h3>

      <div className="file active">
        main.{language === "cpp"
          ? "cpp"
          : language === "python"
          ? "py"
          : language === "java"
          ? "java"
          : "js"}
      </div>

      <hr />

      <h3>👥 Participants ({users.length})</h3>

      {users.length === 0 ? (
        <p>No users</p>
      ) : (
        users.map((user, index) => (
          <div className="user" key={user}>
            🟢 User {index + 1}
          </div>
        ))
      )}

    </div>
  );
}

export default Sidebar;