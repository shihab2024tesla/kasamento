import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatIcon, CloseIcon, SendIcon } from "../icons";
import { faqService, SUGGESTED_QUESTIONS } from "../../services/faqService";
import styles from "./ChatWidget.module.css";

let idCounter = 0;
const nextId = () => ++idCounter;

export function ChatWidget() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: nextId(), from: "bot", text: faqService.getGreeting() }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((current) => [...current, { id: nextId(), from: "user", text: trimmed }]);
    setInputValue("");
    setIsTyping(true);

    const reply = await faqService.getReply(trimmed);
    setMessages((current) => [...current, { id: nextId(), from: "bot", text: reply }]);
    setIsTyping(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(inputValue);
  }

  const hasUserMessaged = messages.some((message) => message.from === "user");

  if (location.pathname === "/login") return null;

  return (
    <>
      {!isOpen && (
        <button type="button" className={styles.launcher} onClick={() => setIsOpen(true)} aria-label="Open chat">
          <ChatIcon />
        </button>
      )}

      {isOpen && (
        <div className={styles.panel} role="dialog" aria-modal="false" aria-label="Kasamento assistant chat">
          <div className={styles.header}>
            <div>
              <div className={styles.headerTitle}>Kasamento Assistant</div>
              <div className={styles.headerSubtitle}>Usually replies in a moment</div>
            </div>
            <button type="button" className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Close chat">
              <CloseIcon />
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((message) => (
              <div key={message.id} className={[styles.bubbleRow, styles[message.from]].join(" ")}>
                <div className={[styles.bubble, styles[message.from]].join(" ")}>{message.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className={[styles.bubbleRow, styles.bot].join(" ")}>
                <div className={[styles.bubble, styles.bot].join(" ")}>
                  <div className={styles.typingDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!hasUserMessaged && (
            <div className={styles.suggestions}>
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  className={styles.suggestionChip}
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input}
              placeholder="Ask a question…"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              aria-label="Type your question"
            />
            <button type="submit" className={styles.sendButton} disabled={!inputValue.trim()} aria-label="Send message">
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
