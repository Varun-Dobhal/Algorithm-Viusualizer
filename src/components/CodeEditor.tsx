import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { PlayIcon } from './Icons';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onExecute: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onExecute }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700">
        <h2 className="text-lg font-medium">Code Editor</h2>
        <button
          className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          onClick={onExecute}
        >
          <PlayIcon className="w-4 h-4 mr-2" />
          Run
        </button>
      </div>
      
      <div className="bg-gray-900">
        <CodeMirror
          value={code}
          height="300px"
          theme={vscodeDark}
          extensions={[javascript()]}
          onChange={onChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default CodeEditor;