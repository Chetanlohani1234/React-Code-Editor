import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs"; 
import "prismjs/themes/prism.css";
import "./CodeEditor.css"; 

const CodeEditor = () => {
  const [code, setCode] = useState(""); 
  const textareaRef = useRef(null);
  const codePreviewRef = useRef(null);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleScroll = () => {
    if (textareaRef.current && codePreviewRef.current) {
      codePreviewRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault(); 

      const textarea = textareaRef.current;
      const cursorPosition = textarea.selectionStart;
      const newCode =
        code.slice(0, cursorPosition) + "\t" + code.slice(cursorPosition);

      setCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1;
      }, 0);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  return (
    <div className="code-editor-container">
      <pre
        className="code-editor-highlight"
        ref={codePreviewRef}
        aria-hidden="true"
      >
        <code
          className="language-javascript"
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(code, Prism.languages.javascript, "javascript"),
          }}
        ></code>
      </pre>

     
      <textarea
        className="code-editor-input"
        value={code}
        onChange={handleChange}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
        spellCheck="false"
      ></textarea>
    </div>
  );
};

export default CodeEditor;
