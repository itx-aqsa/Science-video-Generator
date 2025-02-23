import React, { useState, useEffect } from 'react';

function VideoGenerator() {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(5);
  const [englishScriptPath, setEnglishScriptPath] = useState('');
  const [urduScriptPath, setUrduScriptPath] = useState('');
  const [keywordFilePath, setKeywordFilePath] = useState('');
  const [creditsFilePath, setCreditsFilePath] = useState('');
  const [logoFilePath, setLogoFilePath] = useState('');
  const [outputPath, setOutputPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedEnglishPath = localStorage.getItem('englishScriptPath');
    const savedUrduPath = localStorage.getItem('urduScriptPath');
    const savedKeywordPath = localStorage.getItem('keywordFilePath');
    const savedOutputPath = localStorage.getItem('outputPath');

    if (savedEnglishPath) setEnglishScriptPath(savedEnglishPath);
    if (savedUrduPath) setUrduScriptPath(savedUrduPath);
    if (savedKeywordPath) setKeywordFilePath(savedKeywordPath);
    if (savedOutputPath) setOutputPath(savedOutputPath);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Video generated successfully!');

      localStorage.setItem('englishScriptPath', englishScriptPath);
      localStorage.setItem('urduScriptPath', urduScriptPath);
      localStorage.setItem('keywordFilePath', keywordFilePath);
      localStorage.setItem('outputPath', outputPath);
    }, 2000);
  };

  return (
    <div className="App">
      <header>
        <h1>Science Video Generator</h1>
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
          <label>English Script File Path:</label>
          <input
            type="text"
            value={englishScriptPath}
            onChange={(e) => setEnglishScriptPath(e.target.value)}
            placeholder="Enter file path"
            required
          />
        </div>
        <div>
          <label>Urdu Script File Path:</label>
          <input
            type="text"
            value={urduScriptPath}
            onChange={(e) => setUrduScriptPath(e.target.value)}
            placeholder="Enter file path"
            required
          />
        </div>
        <div>
          <label>Keyword File Path:</label>
          <input
            type="text"
            value={keywordFilePath}
            onChange={(e) => setKeywordFilePath(e.target.value)}
            placeholder="Enter file path"
            required
          />
        </div>
        <div>
          <label>Credits File Path:</label>
          <input
            type="text"
            value={creditsFilePath}
            onChange={(e) => setCreditsFilePath(e.target.value)}
            placeholder="Enter file path"
            required
          />
        </div>
        <div>
          <label>Logo File Path:</label>
          <input
            type="text"
            value={logoFilePath}
            onChange={(e) => setLogoFilePath(e.target.value)}
            placeholder="Enter file path"
            required
          />
        </div>
        <div>
          <label>Output Directory:</label>
          <input
            type="text"
            value={outputPath}
            onChange={(e) => setOutputPath(e.target.value)}
            placeholder="Enter directory path"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating Video...' : 'Generate Video'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default VideoGenerator;