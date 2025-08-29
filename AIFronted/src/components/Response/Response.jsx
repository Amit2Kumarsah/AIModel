import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Response.css";

const GeminiOutput = ({ response, question, interval = 50 }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  const [displayedLines, setDisplayedLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < response.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, response[lineIndex]]);
        setLineIndex((prev) => prev + 1);
      }, interval);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, response, interval]);

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const language = className ? className.replace("language-", "") : "text";
    const codeText = String(children).trim();

    return (
      <div className="code-container">
        <pre className={className}>
          <code>{codeText}</code>
        </pre>
        <button className="copy-btn" onClick={() => handleCopy(codeText)}>
          Copy
        </button>
      </div>
    );
  };

  return (
    <div style={{width:"90%"}}>
      <p className="question">{question}</p>
      <ReactMarkdown
        children={displayedLines.join("\n")}
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
        }}
      />
    </div>
  );
};

export default GeminiOutput;
