import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import TerminalComponent from './Terminal';

function App() {
  const [code, setCode] = useState(`def sum(a, b):\n    return a + b\n\na = int(input("Enter 1st number: "))\nb = int(input("Enter 2nd number: "))\nprint(f"Sum of {a} and {b} is {sum(a, b)}")`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    try {
      const response = await axios.post('http://localhost:5000/run', {
        code,
        input,
      });
      setOutput(response.data.output);
    } catch (err) {
      setOutput('Error connecting to backend');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-sm font-mono">
      {/* File tab */}
      <div className="bg-gray-200 px-4 py-2 border-b border-gray-400">
        <span className="bg-white px-3 py-1 rounded-t border border-gray-400 border-b-0">main.py</span>
      </div>

      {/* Editor */}
      <div className="border-x border-b border-gray-400">
        <Editor
          height="300px"
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-light"
        />
      </div>

      {/* Terminal */}
      <div className="p-4 border border-gray-400 bg-black text-green-300">
        <div className="mb-2">
          <textarea
            className="w-full p-2 text-black rounded"
            rows={3}
            placeholder="Enter input (e.g., 12\n12)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <button
          onClick={handleRun}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Run
        </button>

        <div className="mt-4 whitespace-pre-wrap">{output}</div>
        <TerminalComponent />
      </div>
    </div>
  );
}

export default App;
