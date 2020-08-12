import { useState } from "react";

export default function useVisualMode(first) {
  const [mode, setMode] = useState(first);
  const [history, setHistory] = useState([first]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory([...history, newMode]);
    if (replace) {
      const tempHistory = [...history];
      tempHistory.pop();
      tempHistory.push(newMode);
      setMode(tempHistory[tempHistory.length - 1]);
      setHistory(tempHistory);
    }
  };

  function back(mode) {
    if (history.length > 1) {
      const tempHistory = [...history];
      tempHistory.pop();
      setMode(tempHistory[tempHistory.length - 1]);
      setHistory(tempHistory);
    }
  }

  return { mode, transition, back };
}
