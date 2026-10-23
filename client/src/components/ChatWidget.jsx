import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, BookOpen, ExternalLink } from 'lucide-react';
import { CLINICAL_FAQS } from '../data/medicalData';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am OrganEase AI Assistant. I can answer questions regarding donor eligibility, allocation criteria, and clinical guidelines based solely on our knowledge repository.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Context-grounded RAG query simulation
    setTimeout(() => {
      let matchedAnswer = null;
      const qLower = query.toLowerCase();

      for (const item of CLINICAL_FAQS) {
        if (
          qLower.includes('eligible') || qLower.includes('donor') && item.q.includes('eligible') ||
          (qLower.includes('ml') || qLower.includes('match') || qLower.includes('algorithm')) && item.q.includes('ML') ||
          (qLower.includes('allocate') || qLower.includes('decision') || qLower.includes('automatic')) && item.q.includes('allocate') ||
          (qLower.includes('cit') || qLower.includes('cold') || qLower.includes('ischemia') || qLower.includes('time')) && item.q.includes('Cold')
        ) {
          matchedAnswer = item.a;
          break;
        }
      }

      const botReply = matchedAnswer || 
        "I can only answer questions based strictly on the official organ donation and allocation guidelines in our repository. This specific query was not found in the verified medical documents.";

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: botReply,
        source: matchedAnswer ? 'Retrieved from /server/knowledge/clinical_guidelines.md' : null
      }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white px-4 py-3 rounded-full shadow-lg shadow-teal-700/30 transition-all hover:scale-105"
        >
          <Bot className="w-5 h-5 text-teal-200" />
          <span className="text-sm font-semibold tracking-wide">Ask Clinical Assistant</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-teal-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-teal-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  OrganEase RAG Assistant
                  <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                </h4>
                <p className="text-[11px] text-teal-200/80">Vetted Clinical Guidelines Only</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prompt Suggestions */}
          <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex gap-1.5 overflow-x-auto text-[11px]">
            <button 
              onClick={() => handleSend("Who is eligible to register as an organ donor?")}
              className="whitespace-nowrap bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded-md hover:border-teal-500 hover:text-teal-700 transition-colors"
            >
              Eligibility Criteria
            </button>
            <button 
              onClick={() => handleSend("Can the algorithm automatically allocate an organ?")}
              className="whitespace-nowrap bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded-md hover:border-teal-500 hover:text-teal-700 transition-colors"
            >
              Automated Allocation Rule
            </button>
            <button 
              onClick={() => handleSend("What does Cold Ischemia Time mean?")}
              className="whitespace-nowrap bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded-md hover:border-teal-500 hover:text-teal-700 transition-colors"
            >
              Cold Ischemia Time
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] text-xs leading-relaxed rounded-xl p-3 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-teal-700 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/70 rounded-tl-none'
                  }`}
                >
                  <p>{msg.content}</p>
                  {msg.source && (
                    <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[10px] text-teal-700 font-medium">
                      <BookOpen className="w-3 h-3 text-teal-600" />
                      <span>{msg.source}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 w-fit">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] text-slate-400 font-medium ml-1">Searching knowledge store...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question on organ donation..."
              className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            />
            <button
              onClick={() => handleSend()}
              className="bg-teal-700 hover:bg-teal-800 text-white p-2.5 rounded-xl transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
