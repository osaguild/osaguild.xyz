import { FC, useRef, useEffect } from "react";
import { Terminal as Xterm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const Terminal: FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminalInstance = new Xterm();
    const fitAddon = new FitAddon();
    terminalInstance.loadAddon(fitAddon);

    if (terminalRef.current) {
      terminalInstance.open(terminalRef.current);
      fitAddon.fit();
    }

    terminalInstance.writeln("Hello, World!");

    // Add command handling
    terminalInstance.onData((data) => {
      const code = data.charCodeAt(0);
      if (code === 13) {
        // Enter key
        terminalInstance.write("\r\n");
      } else {
        terminalInstance.write(data);
      }
    });

    return () => {
      terminalInstance.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ width: "500px", height: "500px" }} />;
};

export default Terminal;
