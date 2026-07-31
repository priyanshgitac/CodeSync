import "./LanguageSelector.css";

function LanguageSelector({ language, setLanguage, setCode, templates }) {
  return (
    <select
      className="language-selector"
      value={language}
      onChange={(e) => {
  const selectedLanguage = e.target.value;
  setLanguage(selectedLanguage);
  setCode(templates[selectedLanguage]);
}}
    >
      <option value="cpp">C++</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="javascript">JavaScript</option>
    </select>
  );
}

export default LanguageSelector;