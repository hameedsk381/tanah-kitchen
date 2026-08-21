import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, X, Bot, User, RefreshCw, MessageSquare, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LogoOwl } from './illustrations'

const SUGGESTIONS = [
  '🍽️ What are the Chef’s Specials?',
  '🍸 Recommend a cocktail pairing',
  '💼 Corporate dining packages',
  '🌿 Vegetarian & vegan options',
  '📍 Location & opening hours'
]

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to **Tanah Kitchen & Bar**! 🌿\n\nI am your AI Dining Concierge and Sommelier. How may I assist you today? I can help you discover signature dishes, suggest artisanal drink pairings, or guide you with reservations and corporate bookings.'
    }
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const handleSend = async (userPrompt, isContinuation = false) => {
    const textToSend = userPrompt || input
    if (!textToSend.trim() && !isContinuation) return

    setIsStreaming(true)
    setIsTruncated(false)

    if (!isContinuation) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: textToSend },
        { role: 'assistant', content: '' }
      ])
      setInput('')
    }

    try {
      const history = isContinuation
        ? [...messages, { role: 'user', content: 'Please continue where you left off without repeating.' }]
        : [...messages, { role: 'user', content: textToSend }]

      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      })

      if (!res.ok) {
        throw new Error('Server error')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let accumulated = isContinuation ? messages[messages.length - 1].content : ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const rawChunk = decoder.decode(value, { stream: true })
        const lines = rawChunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim()
            if (dataStr === '[DONE]') break

            try {
              const parsed = JSON.parse(dataStr)
              if (parsed.text) {
                accumulated += parsed.text
                setMessages((prev) => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: accumulated
                  }
                  return updated
                })
              }
              if (parsed.isTruncated) {
                setIsTruncated(true)
              }
            } catch (e) {
              // Ignore partial JSON cuts
            }
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: '🌿 I apologize, but I had trouble reaching the concierge server. Please feel free to call our reception at **+91 89777 30291** or explore our [Seasonal Menu](/menu).'
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Welcome back! How may I assist your dining experience at **Tanah** today?'
      }
    ])
    setIsTruncated(false)
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-24 right-6 z-40 sm:bottom-8 sm:right-8">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-[#6B2523] text-[#FFC470] shadow-2xl border-2 border-[#FFC470]/40 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#FFC470] hover:shadow-[0_0_30px_rgba(255,196,112,0.4)]"
          aria-label="Open AI Dining Concierge"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#6B2523] animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#6B2523]" />
          <Sparkles className="w-6 h-6 animate-pulse" />
        </motion.button>
      </div>

      {/* Concierge Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:bottom-24 sm:right-8 z-50 w-[92vw] max-w-md h-[560px] max-h-[80vh] bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#6B2523]/20 flex flex-col overflow-hidden text-left font-body"
          >
            {/* Header */}
            <div className="bg-[#6B2523] text-[#F6E1CB] px-5 py-4 flex items-center justify-between border-b border-[#FFC470]/20 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-[#FFC470]/30">
                  <LogoOwl className="w-6 h-6 text-[#FFC470]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[#FFC470]">
                    Tanah Concierge
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    AI Sommelier & Dining Guide
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  title="Clear Chat"
                  className="p-2 rounded-full hover:bg-white/10 text-[#F6E1CB] hover:text-[#FFC470] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-[#F6E1CB] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF6F0]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-[#6B2523] text-[#FFC470] flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                      ✦
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#6B2523] text-[#F6E1CB] rounded-tr-xs shadow-md font-medium'
                        : 'bg-white text-[#3A2E2A] border border-[#6B2523]/10 rounded-tl-xs shadow-sm whitespace-pre-wrap'
                    }`}
                  >
                    {m.content ? (
                      <div>
                        {m.content.split('\n').map((paragraph, pIdx) => {
                          if (!paragraph.trim()) return <div key={pIdx} className="h-2" />
                          return (
                            <p key={pIdx} className="mb-1 last:mb-0">
                              {paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}
                            </p>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 py-1 text-[#6B2523]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6B2523] animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6B2523] animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6B2523] animate-bounce [animation-delay:0.4s]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTruncated && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => handleSend('', true)}
                    className="px-3 py-1.5 rounded-full bg-[#FFC470] text-[#6B2523] font-bold text-xs shadow-md hover:bg-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Continue Generating</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="px-4 py-2 bg-white/70 border-t border-[#6B2523]/10 overflow-x-auto no-scrollbar flex items-center gap-2 flex-shrink-0">
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  disabled={isStreaming}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#6B2523]/15 text-[11px] font-semibold text-[#6B2523] hover:bg-[#6B2523] hover:text-[#F6E1CB] whitespace-nowrap transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 bg-white border-t border-[#6B2523]/10 flex items-center gap-2 flex-shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about dishes, pairings, bookings..."
                disabled={isStreaming}
                className="flex-1 bg-[#FAF6F0] border border-[#6B2523]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#3A2E2A] placeholder-[#3A2E2A]/50 focus:outline-none focus:border-[#6B2523]"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="p-2.5 rounded-xl bg-[#6B2523] text-[#FFC470] hover:bg-[#541B1A] disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
