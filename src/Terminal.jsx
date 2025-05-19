// Terminal.jsx
import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    term.current = new Terminal({
      fontSize: 14,
      theme: { background: '#1e1e1e' },
    });
    const fitAddon = new FitAddon();
    term.current.loadAddon(fitAddon);
    term.current.open(terminalRef.current);
    fitAddon.fit();

    socket.current = new WebSocket('ws://localhost:5001'); // Connect to backend WebSocket

    // Display data from server
    socket.current.onmessage = (event) => {
      term.current.write(event.data);
    };

    // Send data to server
    term.current.onData((data) => {
      socket.current.send(data);
    });

    return () => {
      socket.current.close();
      term.current.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '400px', width: '100%' }} />;
};

export default TerminalComponent;
