"use client";

import { ImageIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  File,
  FileText,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatWidget({ rows }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);

  const messagesEndRef = useRef(null);
  // const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  useEffect(() => {
    const greetingMessage = {
      id: "1",
      message_text:
        "Hello! I'm Eric. How can I help you today? You can also upload files to share with me!",
      isUser: false,
      sender: "agent",
      timestamp: new Date(),
    };

    if (rows.length > 0) {
      // reverse rows so latest is at bottom
      const orderedRows = [...rows].reverse();
      setMessages([...orderedRows, greetingMessage]);
    } else {
      setMessages([greetingMessage]);
    }
  }, [rows]);

  function getSessionId() {
    let sid = localStorage.getItem("chat_session_id");
    if (!sid) {
      sid = "session_" + Date.now().toString();
      localStorage.setItem("chat_session_id", sid);
    }
    return sid;
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (fileType.includes("pdf") || fileType.includes("text")) {
      return <FileText className="h-4 w-4" />;
    } else {
      return <File className="h-4 w-4" />;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !fileInputRef.current?.files?.length) return;

    // Prepare user message for UI
    const userMessage = {
      id: Date.now().toString(),
      message_text:
        inputValue || (fileInputRef.current?.files?.[0]?.name ?? ""),
      isUser: true,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      let response;
      const sessionId = getSessionId();

      if (inputValue.trim()) {
        // ---- Text only ----
        response = await fetch(
          "https://anshulrawat.app.n8n.cloud/webhook/d15cdbec-f6f3-4daa-9c12-b8def7d0e05f",
          // "https://anshulrawat.app.n8n.cloud/webhook-test/d15cdbec-f6f3-4daa-9c12-b8def7d0e05f",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: inputValue,
              session_id: sessionId,
            }),
          }
        );
      } else if (fileInputRef.current?.files?.length) {
        // ---- File only ----
        const formData = new FormData();
        formData.append("file", fileInputRef.current.files[0]);
        formData.append("session_id", sessionId); // same session_id used in chat messages

        response = await fetch(
          "https://anshulrawat.app.n8n.cloud/webhook/d15cdbec-f6f3-4daa-9c12-b8def7d0e05f",
          // "https://anshulrawat.app.n8n.cloud/webhook-test/d15cdbec-f6f3-4daa-9c12-b8def7d0e05f",
          {
            method: "POST",
            body: formData,
          }
        );

        // clear file input after sending
        fileInputRef.current.value = "";
      }

      const data = await response?.json();

      const botResponse = {
        id: (Date.now() + 1).toString(),
        message_text: data?.[0]?.output || "No response from server",
        isUser: false,
        sender: "agent",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          message_text: "⚠️ Error connecting to server",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          isOpen && "scale-0 opacity-0"
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-96 h-[700px] transition-all duration-300 z-50",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        <Card className="h-full flex flex-col shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-lg">Chat Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-y-scroll">
            <ScrollArea className="flex-1 px-4 group" ref={scrollRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender == "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.sender == "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {/* {message.text} */}
                      <div className="prose max-w-none">
                        <ReactMarkdown>{message.message_text}</ReactMarkdown>
                      </div>
                      {message.file && (
                        <div className="mt-2 p-2 rounded border border-current/20 bg-current/5">
                          <div className="flex items-center space-x-2">
                            {getFileIcon(message.file.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">
                                {message.file.name}
                              </p>
                              <p className="text-xs opacity-70">
                                {formatFileSize(message.file.size)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = message.file.url;
                                link.download = message.file.name;
                                link.click();
                              }}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <ScrollBar
                orientation="vertical"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                forceMount
              />
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleSendMessage}
                className="hidden"
                accept="*/*"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
