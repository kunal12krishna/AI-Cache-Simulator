import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, Chat } from "@google/genai";

// --- STYLES ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
  
  body {
    background-color: #1a1a1a;
    color: #f0f0f0;
    font-family: 'Roboto Mono', monospace;
    margin: 0;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .simulator-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "header header"
      "controls controls"
      "metrics metrics"
      "cache anomalies";
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
  }

  .header {
    grid-area: header;
    text-align: center;
    border-bottom: 2px solid #00faff;
    padding-bottom: 1rem;
  }
  
  h1 {
    color: #00faff;
    margin: 0;
  }

  .controls {
    grid-area: controls;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  button {
    background-color: #00faff;
    color: #1a1a1a;
    border: none;
    padding: 0.75rem 1.5rem;
    font-family: 'Roboto Mono', monospace;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
  }

  button:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }
  
  button:disabled {
    background-color: #555;
    color: #888;
    cursor: not-allowed;
  }
  
  .panel {
    background-color: #2a2a2a;
    padding: 1.5rem;
    border: 1px solid #444;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
  }
  
  h2 {
    color: #00faff;
    margin-top: 0;
    border-bottom: 1px solid #444;
    padding-bottom: 0.5rem;
  }

  .metrics {
    grid-area: metrics;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }

  .metric-card {
    background-color: #333;
    padding: 1rem;
    text-align: center;
    border-left: 4px solid #00faff;
  }
  
  .metric-value {
    font-size: 2rem;
    font-weight: 700;
  }
  
  .metric-label {
    font-size: 0.9rem;
    color: #aaa;
  }

  .cache-view { grid-area: cache; }
  .anomalies-log { grid-area: anomalies; }

  .cache-table-container {
    max-height: 400px;
    overflow-y: auto;
  }

  .cache-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  
  .cache-table th, .cache-table td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #444;
  }
  
  .cache-table th {
    background-color: #333;
    position: sticky;
    top: 0;
  }

  .cache-row.hit {
    background-color: rgba(0, 255, 0, 0.1);
    animation: flash-green 0.5s ease;
  }
  .cache-row.miss {
    background-color: rgba(255, 0, 0, 0.1);
    animation: flash-red 0.5s ease;
  }
  
  .anomaly-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 400px;
    overflow-y: auto;
  }
  
  .anomaly-item {
    background-color: #333;
    margin-bottom: 0.5rem;
    padding: 0.75rem;
    border-left: 4px solid #ff4d4d;
    font-size: 0.85rem;
  }
  
  .anomaly-item strong {
    color: #ff4d4d;
  }
  
  /* Chatbot styles */
  .chat-toggle-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #00faff;
    color: #1a1a1a;
    font-size: 2rem;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: none;
    z-index: 1000;
  }

  .chat-widget {
    position: fixed;
    bottom: 6rem;
    right: 2rem;
    width: 350px;
    max-height: 500px;
    background-color: #2a2a2a;
    border: 1px solid #00faff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    z-index: 999;
    transition: all 0.3s ease;
    transform-origin: bottom right;
  }

  .chat-widget.closed {
    transform: scale(0);
    opacity: 0;
  }

  .chat-header {
    padding: 0.75rem;
    background-color: #333;
    border-bottom: 1px solid #00faff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-header h3 {
    margin: 0;
    color: #00faff;
  }

  .chat-body {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .chat-message {
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    max-width: 80%;
    word-wrap: break-word;
  }

  .chat-message.user {
    background-color: #00faff;
    color: #1a1a1a;
    align-self: flex-end;
  }
  
  .chat-message.model {
    background-color: #444;
    color: #f0f0f0;
    align-self: flex-start;
  }
  
  .chat-message.loading {
    align-self: flex-start;
  }

  .chat-footer {
    padding: 0.75rem;
    border-top: 1px solid #444;
  }

  .chat-form {
    display: flex;
    gap: 0.5rem;
  }

  .chat-input {
    flex: 1;
    background-color: #1a1a1a;
    border: 1px solid #555;
    color: #f0f0f0;
    padding: 0.5rem;
    font-family: 'Roboto Mono', monospace;
  }
  
  .chat-send-btn {
    padding: 0.5rem 1rem;
    clip-path: none;
    font-size: 0.9rem;
  }


  @keyframes flash-green {
    from { background-color: rgba(0, 255, 0, 0.5); }
    to { background-color: rgba(0, 255, 0, 0.1); }
  }

  @keyframes flash-red {
    from { background-color: rgba(255, 0, 0, 0.5); }
    to { background-color: rgba(255, 0, 0, 0.1); }
  }
`;

// --- CONSTANTS & TYPES ---
const CACHE_SIZE = 32;
const MEMORY_SIZE = 256;
const SIMULATION_SPEED_MS = 300;
const ANOMALY_WINDOW_SIZE = 20;
const ANOMALY_STD_DEV_THRESHOLD = 2.5;

type CacheLine = {
  tag: number | null;
  valid: boolean;
};

type Anomaly = {
  id: number;
  timestamp: string;
  message: string;
  missRate: number;
};

type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};

// --- ANOMALY DETECTOR ---
class AnomalyDetector {
  private missRateHistory: number[] = [];
  
  check(currentMissRate: number): string | null {
    if (isNaN(currentMissRate)) return null;

    this.missRateHistory.push(currentMissRate);
    if (this.missRateHistory.length > ANOMALY_WINDOW_SIZE) {
      this.missRateHistory.shift();
    }

    if (this.missRateHistory.length < ANOMALY_WINDOW_SIZE) {
      return null;
    }

    const mean = this.missRateHistory.reduce((a, b) => a + b, 0) / this.missRateHistory.length;
    const stdDev = Math.sqrt(
      this.missRateHistory.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / this.missRateHistory.length
    );

    if (stdDev > 0 && Math.abs(currentMissRate - mean) > ANOMALY_STD_DEV_THRESHOLD * stdDev) {
      return `Sudden spike in miss rate detected!`;
    }
    
    return null;
  }

  reset() {
      this.missRateHistory = [];
  }
}

// --- REACT COMPONENT ---
const App = () => {
  const getInitialCache = (): CacheLine[] => 
    Array(CACHE_SIZE).fill(null).map(() => ({ tag: null, valid: false }));

  // Simulator state
  const [cache, setCache] = useState<CacheLine[]>(getInitialCache);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastAccessedIndex, setLastAccessedIndex] = useState<number | null>(null);
  const [lastAccessType, setLastAccessType] = useState<'hit' | 'miss' | null>(null);

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const anomalyDetectorRef = useRef(new AnomalyDetector());
  const simulationIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          systemInstruction: "You are a helpful assistant knowledgeable about CPU caches, computer architecture, and performance simulation. Answer the user's questions concisely.",
      });
      setChatHistory([{ role: 'model', text: "Hello! Ask me anything about this cache simulator or computer architecture." }]);
    } catch (error) {
      console.error("Failed to initialize Gemini:", error);
      setChatHistory([{ role: 'model', text: "Error: Could not connect to the AI assistant." }]);
    }
  }, []);

  const resetSimulation = useCallback(() => {
      setIsSimulating(false);
      if (simulationIntervalRef.current) {
          clearInterval(simulationIntervalRef.current);
      }
      setCache(getInitialCache());
      setHits(0);
      setMisses(0);
      setAnomalies([]);
      setLastAccessedIndex(null);
      setLastAccessType(null);
      anomalyDetectorRef.current.reset();
  }, []);

  const runSimulationStep = useCallback(() => {
    const address = Math.floor(Math.random() * MEMORY_SIZE);
    const index = address % CACHE_SIZE;
    const tag = Math.floor(address / CACHE_SIZE);
    
    setLastAccessedIndex(index);

    setCache(prevCache => {
      const newCache = [...prevCache];
      const cacheLine = newCache[index];
      let wasHit = false;

      if (cacheLine.valid && cacheLine.tag === tag) {
        wasHit = true;
      } else {
        wasHit = false;
        newCache[index] = { tag, valid: true };
      }
      
      if (wasHit) {
        setHits(h => h + 1);
        setLastAccessType('hit');
      } else {
        setMisses(m => m + 1);
        setLastAccessType('miss');
      }

      const totalAccesses = hits + misses + 1;
      const currentMisses = misses + (wasHit ? 0 : 1);
      const currentMissRate = totalAccesses > 0 ? currentMisses / totalAccesses : 0;
      
      const anomalyMessage = anomalyDetectorRef.current.check(currentMissRate);
      if (anomalyMessage) {
        setAnomalies(prev => [
          {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            message: anomalyMessage,
            missRate: currentMissRate
          },
          ...prev
        ]);
      }
      return newCache;
    });
  }, [hits, misses]);
  
  useEffect(() => {
    if (isSimulating) {
      simulationIntervalRef.current = window.setInterval(runSimulationStep, SIMULATION_SPEED_MS);
    } else {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    }
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, [isSimulating, runSimulationStep]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory, isChatLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { role: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
        const result = await chatRef.current.sendMessage({ message: chatInput });
        const modelResponse: ChatMessage = { role: 'model', text: result.text };
        setChatHistory(prev => [...prev, modelResponse]);
    } catch (error) {
        console.error("Gemini API error:", error);
        const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsChatLoading(false);
    }
  };


  const totalAccesses = hits + misses;
  const hitRate = totalAccesses > 0 ? (hits / totalAccesses) * 100 : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="simulator-container">
        <header className="header">
          <h1>🧠 AI Cache Simulator</h1>
          <p>Modeling CPU cache behavior with real-time anomaly detection.</p>
        </header>
        
        <div className="controls">
          <button onClick={() => setIsSimulating(true)} disabled={isSimulating}>▶ Start Simulation</button>
          <button onClick={() => setIsSimulating(false)} disabled={!isSimulating}>❚❚ Pause Simulation</button>
          <button onClick={resetSimulation}>↻ Reset</button>
        </div>

        <div className="metrics panel">
          <div className="metric-card">
            <div className="metric-value">{totalAccesses}</div>
            <div className="metric-label">Total Accesses</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{hits}</div>
            <div className="metric-label">Cache Hits</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{misses}</div>
            <div className="metric-label">Cache Misses</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{hitRate.toFixed(2)}%</div>
            <div className="metric-label">Hit Rate</div>
          </div>
        </div>

        <div className="cache-view panel">
          <h2>Cache State (Direct-Mapped)</h2>
          <div className="cache-table-container">
            <table className="cache-table">
              <thead>
                <tr><th>Index</th><th>Valid</th><th>Tag</th></tr>
              </thead>
              <tbody>
                {cache.map((line, i) => (
                  <tr 
                    key={i} 
                    className={`cache-row ${lastAccessedIndex === i ? lastAccessType : ''}`}
                  >
                    <td>{i}</td>
                    <td>{line.valid ? '✅' : '❌'}</td>
                    <td>{line.tag !== null ? line.tag : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="anomalies-log panel">
          <h2>Anomaly Detection Log</h2>
          <ul className="anomaly-list">
            {anomalies.length === 0 ? (
                <p>No anomalies detected yet.</p>
            ) : (
                anomalies.map(anomaly => (
                    <li key={anomaly.id} className="anomaly-item">
                        <strong>[{anomaly.timestamp}]</strong> {anomaly.message}
                        <br/>
                        Miss rate at detection: {(anomaly.missRate * 100).toFixed(2)}%
                    </li>
                ))
            )}
          </ul>
        </div>
      </div>

      {/* Chatbot UI */}
      <button className="chat-toggle-button" onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? '✕' : '💬'}
      </button>
      <div className={`chat-widget ${isChatOpen ? '' : 'closed'}`}>
        <div className="chat-header">
            <h3>AI Assistant</h3>
            <button onClick={() => setIsChatOpen(false)} style={{all: 'unset', cursor: 'pointer', fontSize: '1.5rem'}}>✕</button>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
            {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                    {msg.text}
                </div>
            ))}
            {isChatLoading && <div className="chat-message model loading">...</div>}
        </div>
        <div className="chat-footer">
            <form className="chat-form" onSubmit={handleSendMessage}>
                <input 
                    type="text"
                    className="chat-input"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isChatLoading}
                />
                <button type="submit" className="chat-send-btn" disabled={isChatLoading}>Send</button>
            </form>
        </div>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);