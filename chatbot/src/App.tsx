import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageCircle, X, Bot } from "lucide-react";
import { ChatMessage, type Message } from "./app/components/ChatMessage";
import { SuggestedPrompts } from "./app/components/SuggestedPrompts";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your university study assistant. I can help you understand concepts, create study schedules, prepare for exams, and more. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("schedule") || lowerMessage.includes("study plan")) {
      return "I'd be happy to help you create a study schedule! Here's a suggested approach:\n\n1. List all your upcoming exams and assignments\n2. Allocate 2-3 hours daily for focused study\n3. Take 10-minute breaks every hour\n4. Review material within 24 hours of learning it\n\nWould you like me to help you customize this for your specific courses?";
    }

    if (lowerMessage.includes("concept") || lowerMessage.includes("understand") || lowerMessage.includes("explain")) {
      return "I'd love to help you understand! To give you the best explanation, could you tell me:\n\n• What subject or topic are you studying?\n• What specific concept is confusing?\n• What level of detail would be helpful?\n\nThe more specific you are, the better I can assist!";
    }

    if (lowerMessage.includes("quiz") || lowerMessage.includes("test me") || lowerMessage.includes("practice")) {
      return "Great idea! Practice testing is one of the most effective study methods. Let me know:\n\n• What subject would you like to practice?\n• What topics should I focus on?\n• Do you prefer multiple choice, short answer, or mixed questions?\n\nI'll create some practice questions for you!";
    }

    if (lowerMessage.includes("explain it like") || lowerMessage.includes("eli5") || lowerMessage.includes("simple")) {
      return "I'll break it down into simple terms! What topic would you like me to explain? I'll use everyday examples and analogies to make it crystal clear.";
    }

    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! I'm here whenever you need help. Good luck with your studies! 📚";
    }

    return "That's a great question! I'm here to help with:\n\n• Explaining difficult concepts\n• Creating study schedules\n• Generating practice questions\n• Breaking down complex topics\n• Study tips and techniques\n\nCould you provide more details about what you'd like help with?";
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const showSuggestions = messages.length === 1;

  return (
    
    <div className="relative h-screen w-full bg-white overflow-hidden">
    {/* Centered Logo from Public Folder */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <img 
        src="/UF-LOGO.png" // Replace with your actual filename (e.g., logo.svg)
        alt="UniFund Logo" 
        className="w-64 h-auto opacity-80 " // Adjusted size and made it subtle
      />
    </div>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-uf-blue to-uf-dark text-white shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle className="size-12" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 flex h-[700px] w-[500px] flex-col rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-gradient-to-r from-uf-blue to-uf-dark px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-white/20">
                <Bot className="size-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Uni-Q</h2>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex size-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 px-4 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-600">
                    <Bot className="size-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-4 py-3">
                    <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                    <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                    <div className="size-2 animate-bounce rounded-full bg-gray-400"></div>
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="pt-2">
                  <p className="mb-3 text-center text-xs text-gray-600">
                    Try one of these:
                  </p>
                  <SuggestedPrompts onSelectPrompt={handleSendMessage} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-shadow placeholder:text-gray-400 focus:border-uf-dark focus:ring-2 focus:ring-uf-blue"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-uf-blue to-uf-dark text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}