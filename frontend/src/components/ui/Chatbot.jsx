import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const defaultHints = [
  "Help me decide my next best move",
  "Show me where to find competitions",
  "How do I update my profile?",
];

function getBotReply(input) {
  const text = input.toLowerCase();
  if (text.includes("competition")) {
    return "Head to Competitions for live challenges. I can also suggest one based on your strengths.";
  }
  if (text.includes("profile")) {
    return "You can edit your profile under Profile. Update skills, portfolio summary, and links there.";
  }
  if (text.includes("mentor")) {
    return "Mentorship is great for momentum. Open Mentorship to browse experts and send a request.";
  }
  if (text.includes("project")) {
    return "Projects live in the Build Studio. Create one, add milestones, and submit work for proof.";
  }
  if (text.includes("course") || text.includes("learn")) {
    return "Courses are under Learning. You can enroll, track progress, and complete lessons.";
  }
  return "I can help you pick the next best move: assessment, course, project, or competition. What sounds right?";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "bot",
      text: "Hi! I’m your Best Version guide. Want help finding your next best move?",
    },
  ]);
  const scrollRef = useRef(null);

  const hints = useMemo(() => defaultHints, []);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, open]);

  function sendMessage(text) {
    if (!text.trim()) return;
    const newMessage = { id: `${Date.now()}`, role: "user", text };
    const reply = { id: `${Date.now()}-bot`, role: "bot", text: getBotReply(text) };
    setMessages((prev) => [...prev, newMessage, reply]);
    setInput("");
  }

  return (
    <div className="chatbot">
      {open ? (
        <div className="chatbot-panel" role="dialog" aria-label="Best Version assistant">
          <div className="chatbot-header">
            <div>
              <strong>Best Version Guide</strong>
              <span>Ask me anything about your journey</span>
            </div>
            <button className="icon-btn" onClick={() => setOpen(false)} type="button" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          <div className="chatbot-body" ref={scrollRef}>
            {messages.map((message) => (
              <div key={message.id} className={`chatbot-bubble chatbot-bubble-${message.role}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-hints">
            {hints.map((hint) => (
              <button key={hint} onClick={() => sendMessage(hint)} type="button">
                {hint}
              </button>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              placeholder="Ask about courses, projects, or your next move..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage(input);
              }}
            />
            <button onClick={() => sendMessage(input)} type="button" aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : null}
      <button className="chatbot-launcher" onClick={() => setOpen((value) => !value)} type="button">
        <MessageCircle size={18} />
        <span>Ask BV</span>
      </button>
    </div>
  );
}
