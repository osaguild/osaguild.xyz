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

    terminalInstance.writeln("say hello");
    terminalInstance.write("> ");

    let inputBuffer = "";

    terminalInstance.onData((data) => {
      const code = data.charCodeAt(0);
      if (code === 13) {
        // Enter key
        terminalInstance.write("\r\n");

        // Check if inputBuffer contains "hello"
        if (inputBuffer.trim() === "hello") {
          terminalInstance.writeln(
            "hello. thanks to visit my home. but, I'm under development. please wait a moment."
          );
        } else {
          terminalInstance.writeln(
            "please type 'hello'. I want to talk to you."
          );
        }

        // Clear inputBuffer
        inputBuffer = "";
        terminalInstance.write("> ");
      } else if (code === 8 || code === 127) {
        // Backspace key
        if (inputBuffer.length > 0) {
          terminalInstance.write("\b \b");
          inputBuffer = inputBuffer.slice(0, -1);
        }
      } else {
        terminalInstance.write(data);
        inputBuffer += data;
      }
    });

    return () => {
      terminalInstance.dispose();
    };
  }, []);

  return <div ref={terminalRef} />;
};

export default Terminal;
