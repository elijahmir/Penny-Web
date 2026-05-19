"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
  useConversationClientTool,
} from "@elevenlabs/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, RotateCcw, Loader2, PhoneCall } from "lucide-react";
import { clientTools } from "./pageCommands";
import styles from "./PennyChatDemo.module.css";

const MAX_EXCHANGES = 10;

type Message = {
  id: string;
  role: "penny" | "user";
  text: string;
};

// ─── ChatInner must live inside ConversationProvider ────────────────────────

function ChatInner({
  onSwitchToPhone,
  messages,
  isTyping,
  addUserMessage,
  setIsTyping,
  clearMessages,
}: {
  onSwitchToPhone: () => void;
  messages: Message[];
  isTyping: boolean;
  addUserMessage: (text: string) => void;
  setIsTyping: (v: boolean) => void;
  clearMessages: () => void;
}) {
  const { startSession, endSession, sendUserMessage } = useConversationControls();
  const { status } = useConversationStatus();

  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "active">("idle");
  const [error, setError] = useState<string | null>(null);
  const [exchangeCount, setExchangeCount] = useState(0);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Register page-control tools
  // action_site is the PRIMARY unified tool - the ElevenLabs agent calls this
  useConversationClientTool("action_site", clientTools.action_site);
  // Legacy named tools kept for backward compat
  useConversationClientTool("scroll_to_section", clientTools.scroll_to_section);
  useConversationClientTool("highlight_demo_form", clientTools.highlight_demo_form);
  useConversationClientTool("highlight_feature", clientTools.highlight_feature);

  // Scroll ONLY the messages container, not the page
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  // Reset when ElevenLabs disconnects while a session was active.
  // setState is deferred via queueMicrotask so it runs after the effect body
  // completes - this satisfies the react-hooks/set-state-in-effect rule.
  useEffect(() => {
    if (status !== "disconnected") return;
    queueMicrotask(() => {
      setPhase((current) => (current === "active" ? "idle" : current));
      setIsTyping(false);
    });
  }, [status, setIsTyping]);

  async function handleStart() {
    setPhase("loading");
    setError(null);

    try {
      const res = await fetch("/api/chat-session", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setError(
          res.status === 429
            ? (data.message ?? "Daily demo limit reached. Come back tomorrow.")
            : "Could not start a session. Please try again."
        );
        setPhase("idle");
        return;
      }

      await startSession({ signedUrl: data.signedUrl, textOnly: true });
      setPhase("active");
    } catch {
      setError("Something went wrong. Please try again.");
      setPhase("idle");
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text || status !== "connected" || exchangeCount >= MAX_EXCHANGES) return;

    addUserMessage(text);
    setInput("");
    setIsTyping(true);   // show dots - cleared by parent when AI replies
    sendUserMessage(text);
    setExchangeCount((n) => n + 1);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleReset() {
    endSession();
    setPhase("idle");
    setIsTyping(false);
    setExchangeCount(0);
    setError(null);
    clearMessages();
  }

  const atLimit = exchangeCount >= MAX_EXCHANGES;

  // Idle state
  if (phase === "idle") {
    return (
      <div className={styles.idleState}>
        {error ? (
          <div className={styles.errorBlock}>
            <p>{error}</p>
            {error.includes("limit") ? (
              <button className={styles.ctaLink} onClick={onSwitchToPhone}>
                Try the phone demo instead
              </button>
            ) : (
              <button className={styles.startBtn} onClick={handleStart}>
                Try again
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={styles.idleIcon}>
              <MessageCircle size={30} strokeWidth={1.5} />
            </div>
            <p className={styles.idleLabel}>Chat with Penny</p>
            <p className={styles.idleHint}>
              See how Penny guides a visitor on your website. She answers questions,
              books tours, and captures leads automatically.
            </p>
            <button className={styles.startBtn} onClick={handleStart}>
              Start live demo
            </button>
            <p className={styles.idleSubhint}>
              {MAX_EXCHANGES} message demo &middot; No signup required
            </p>
          </>
        )}
      </div>
    );
  }

  // Loading state
  if (phase === "loading") {
    return (
      <div className={styles.idleState}>
        <Loader2 size={26} strokeWidth={1.5} className={styles.spinner} />
        <p className={styles.idleHint}>Connecting to Penny...</p>
      </div>
    );
  }

  // Active chat
  return (
    <div className={styles.chatWrapper}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.statusDot} data-status={status} />
          <span className={styles.headerName}>Penny</span>
          <span className={styles.headerMode}>Live Demo</span>
        </div>
        <div className={styles.headerRight}>
          {!atLimit && (
            <span className={styles.msgCount}>
              {MAX_EXCHANGES - exchangeCount} left
            </span>
          )}
          <button className={styles.iconBtn} onClick={handleReset} title="Restart">
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Messages - scroll is contained here, not page-level */}
      <div className={styles.messages} ref={messagesContainerRef}>
        {messages.length === 0 && (
          <div className={styles.emptyHint}>
            Say hello. Ask about pricing, availability, or book a tour.
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`${styles.bubble} ${styles[msg.role]}`}
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              {msg.role === "penny" && (
                <span className={styles.bubbleLabel}>Penny</span>
              )}
              <p>{msg.text}</p>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              key="typing"
              className={`${styles.bubble} ${styles.penny} ${styles.typing}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18 }}
            >
              <span className={styles.bubbleLabel}>Penny</span>
              <span className={styles.dots}>
                <span />
                <span />
                <span />
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {atLimit && (
          <motion.div
            className={styles.limitReached}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>Demo complete. Want to hear the full experience?</p>
            <button className={styles.ctaLink} onClick={onSwitchToPhone}>
              <PhoneCall size={13} style={{ display: "inline", marginRight: 4 }} />
              Hear Penny on the phone
            </button>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder={atLimit ? "Demo complete" : "Ask about pricing, tours, availability..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={status !== "connected" || atLimit}
          maxLength={320}
          autoFocus
          aria-label="Chat with Penny"
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!input.trim() || status !== "connected" || atLimit}
          aria-label="Send"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export function PennyChatDemo({ onSwitchToPhone }: { onSwitchToPhone?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  // isTyping lives HERE so onMessage (parent) can clear it
  const [isTyping, setIsTyping] = useState(false);

  const addUserMessage = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}-${Math.random()}`, role: "user", text },
    ]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  // onMessage fires when ElevenLabs sends agent_response - clears typing here in parent
  const handleMessage = useCallback(
    (props: { message: string; source: "user" | "ai"; role?: string }) => {
      if (props.source === "ai" || props.role === "agent") {
        setMessages((prev) => [
          ...prev,
          { id: `p-${Date.now()}-${Math.random()}`, role: "penny", text: props.message },
        ]);
        setIsTyping(false); // same state that ChatInner reads - now actually cleared
      }
    },
    []
  );

  return (
    <ConversationProvider onMessage={handleMessage}>
      <div className={styles.root} id="penny-chat-demo">
        <ChatInner
          onSwitchToPhone={onSwitchToPhone ?? (() => {})}
          messages={messages}
          isTyping={isTyping}
          addUserMessage={addUserMessage}
          setIsTyping={setIsTyping}
          clearMessages={clearMessages}
        />
      </div>
    </ConversationProvider>
  );
}
