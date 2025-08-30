import React, { useState } from "react";
import ParserSelector from "./components/ParserSelector";
import CodeEditor from "./components/CodeEditor";
import Visualizer from "./components/Visualizer";
import Console from "./components/Console";
import Instructions from "./components/Instructions";
import { ParserType } from "./types";
import { executeCode } from "./parsers";

function App() {
  const [selectedParser, setSelectedParser] = useState<ParserType>(
    ParserType.BinaryTree
  );
  const [code, setCode] = useState<string>("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [visualizationData, setVisualizationData] = useState<any>(null);

  const handleParserChange = (parser: ParserType) => {
    setSelectedParser(parser);
    setConsoleOutput([]);
    setVisualizationData(null);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleExecute = () => {
    setConsoleOutput([]);
    const { output, data } = executeCode(selectedParser, code);
    setConsoleOutput(output);
    setVisualizationData(data);
  };

  const handleClearConsole = () => {
    setConsoleOutput([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-400">
            Code Visualization Tool
          </h1>
          <p className="text-gray-400 mt-1">
            Visualize data structures and algorithms with ease
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <ParserSelector
          selectedParser={selectedParser}
          onParserChange={handleParserChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onExecute={handleExecute}
            />
            <Console output={consoleOutput} onClear={handleClearConsole} />
          </div>

          <div className="flex flex-col">
            <Visualizer type={selectedParser} data={visualizationData} />
            <Instructions type={selectedParser} />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 py-4 mt-10">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>CodeSmiths-DAA-IV-T030 &copy; 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
