import React, { useState, useEffect } from "react";
import { Client } from "@gradio/client";

function ScriptGenerator() {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState(5);
  const [englishScriptPath, setEnglishScriptPath] = useState("");
  const [urduScriptPath, setUrduScriptPath] = useState("");
  const [keywordFilePath, setKeywordFilePath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [englishScript, setEnglishScript] = useState("");
  const [urduScript, setUrduScript] = useState("");

  useEffect(() => {
    const savedEnglishPath = localStorage.getItem("englishScriptPath");
    const savedUrduPath = localStorage.getItem("urduScriptPath");
    const savedKeywordPath = localStorage.getItem("keywordFilePath");

    if (savedEnglishPath) setEnglishScriptPath(savedEnglishPath);
    if (savedUrduPath) setUrduScriptPath(savedUrduPath);
    if (savedKeywordPath) setKeywordFilePath(savedKeywordPath);
  }, []);

  const generateScript = async (topic, duration) => {
    try {
      const client = await Client.connect("Backened/SCRIPTGENERATOR");
      const result = await client.predict("/generate_script", {
        topic: topic,
        duration: duration,
      });
      return result.data;
    } catch (error) {
      console.error("Error generating script:", error);
      return "";
    }
  };

  const translateToUrdu = async (englishScript) => {
    try {
      const client = await Client.connect("Backened/SCRIPTGENERATOR");
      const result = await client.predict("/translate_to_urdu", {
        english_script: englishScript,
      });
      return result.data;
    } catch (error) {
      console.error("Error translating to Urdu:", error);
      return "";
    }
  };

  const saveEnglishFile = async (content, topic) => {
    try {
      const client = await Client.connect("Backened/SCRIPTGENERATOR");
      const result = await client.predict("/save_english_file", {
        content: content,
        topic: topic,
      });
      return result.data;
    } catch (error) {
      console.error("Error saving English file:", error);
      return "";
    }
  };

  const saveUrduFile = async (content, topic) => {
    try {
      const client = await Client.connect("Backened/SCRIPTGENERATOR");
      const result = await client.predict("/save_urdu_file", {
        content: content,
        topic: topic,
      });
      return result.data;
    } catch (error) {
      console.error("Error saving Urdu file:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Generate English Script
    const engScript = await generateScript(topic, duration);
    if (engScript) {
      setEnglishScript(engScript);

      // Translate to Urdu
      const urduScript = await translateToUrdu(engScript);
      if (urduScript) {
        setUrduScript(urduScript);
      }

      // Save English File
      const engFilePath = await saveEnglishFile(engScript, topic);
      if (engFilePath) {
        setEnglishScriptPath(engFilePath);
        localStorage.setItem("englishScriptPath", engFilePath);
      }

      // Save Urdu File
      const urduFilePath = await saveUrduFile(urduScript, topic);
      if (urduFilePath) {
        setUrduScriptPath(urduFilePath);
        localStorage.setItem("urduScriptPath", urduFilePath);
      }

      setMessage("Task completed successfully!");
    } else {
      setMessage("Error generating script.");
    }

    setIsLoading(false);
  };

  const handleDownloadScripts = async () => {
    try {
      // Download English Script
      if (englishScriptPath) {
        const englishFile = await fetch(englishScriptPath);
        const englishBlob = await englishFile.blob();
        downloadFile(englishBlob, "english_script.txt");
      }

      // Download Urdu Script
      if (urduScriptPath) {
        const urduFile = await fetch(urduScriptPath);
        const urduBlob = await urduFile.blob();
        downloadFile(urduBlob, "urdu_script.txt");
      }

      // Download Keyword File
      if (keywordFilePath) {
        const keywordFile = await fetch(keywordFilePath);
        const keywordBlob = await keywordFile.blob();
        downloadFile(keywordBlob, "keywords.txt");
      }

      setMessage("Scripts downloaded successfully!");
    } catch (error) {
      console.error("Error downloading scripts:", error);
      setMessage("Failed to download scripts.");
    }
  };

  const downloadFile = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="App">
      <header>
        <h1>Science Script Generator</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Scientific Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Video Duration (minutes):</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
          </select>
        </div>
        <div>
          <label>Directory for English Script:</label>
          <input
            type="text"
            value={englishScriptPath}
            onChange={(e) => setEnglishScriptPath(e.target.value)}
            placeholder="Enter directory path"
            required
          />
        </div>
        <div>
          <label>Directory for Urdu Script:</label>
          <input
            type="text"
            value={urduScriptPath}
            onChange={(e) => setUrduScriptPath(e.target.value)}
            placeholder="Enter directory path"
            required
          />
        </div>
        <div>
          <label>Directory for Keyword File:</label>
          <input
            type="text"
            value={keywordFilePath}
            onChange={(e) => setKeywordFilePath(e.target.value)}
            placeholder="Enter directory path"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Generating Script..." : "Generate Script"}
        </button>
        {message && <p>{message}</p>}
      </form>

      {englishScript && (
        <div>
          <h2>Generated English Script</h2>
          <p>{englishScript}</p>
        </div>
      )}

      {urduScript && (
        <div>
          <h2>Translated Urdu Script</h2>
          <p>{urduScript}</p>
        </div>
      )}

      {/* Add Download Scripts Button */}
      <button onClick={handleDownloadScripts} disabled={!englishScriptPath || !urduScriptPath || !keywordFilePath}>
        Download Scripts
      </button>
    </div>
  );
}

export default ScriptGenerator;