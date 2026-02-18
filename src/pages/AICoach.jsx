import { useState, useEffect, useRef } from "react";
import { coachChat, getCoachHistory } from "../api/coach";

export default function AICoach() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const bottomRef = useRef(null);

  // 🔹 Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getCoachHistory();
        setMessages(history);
      } catch (err) {
        console.error("Failed to load coach history:", err);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadHistory();
  }, []);

  // 🔹 Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const data = await coachChat(input);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("Coach error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-6xl font-bold mb-1">AI Coach</h2>
        <p className="text-white/70 text-2xl">Clear guidance. No noise.</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">

        {loadingHistory ? (
          <p className="text-white/60 text-3xl animate-pulse">
            Loading chats…
          </p>
        ) : messages.length === 0 ? (
          <p className="text-white/60 text-lg">
            No chats yet. Ask your coach anything.
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`w-fit max-w-[65%] p-4 rounded-xl text-lg leading-relaxed whitespace-pre-line
                transition-all duration-300
                ${
                  msg.role === "assistant"
                    ? "bg-white/10 border border-white/10"
                    : "bg-primary text-black ml-auto max-w-[60%]"
                }`}
            >
              {msg.content}
            </div>
          ))
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-6 flex gap-4">
        <input
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={loading ? "Coach is thinking…" : "Ask your coach…"}
          className="flex-1 px-5 py-4 rounded-lg bg-bg/70 text-white outline-none
                     focus:ring-2 focus:ring-primary disabled:opacity-60"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-6 py-4 rounded-lg bg-primary text-black font-semibold
                     hover:opacity-90 transition disabled:opacity-60"
        >
          Send
        </button>
      </div>

    </div>
  );
}
