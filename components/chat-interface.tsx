"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "./ui/button"

export function ChatInterface() {
  const [message, setMessage] = useState("")
  const [sessionId] = useState(uuidv4()) // Create a unique session ID
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    setMessages(prev => [...prev, { text: message, isUser: true }])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId }),
      })

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setMessages(prev => [...prev, { text: data.response, isUser: false }])
    } catch (error) {
      console.error("Error:", error)
      setMessages(prev => [...prev, { text: "Sorry, something went wrong. Please try again.", isUser: false }])
    } finally {
      setIsLoading(false)
      setMessage("")
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4 mb-4 h-[400px] overflow-y-auto p-4 border rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.isUser ? "bg-blue-100 ml-auto" : "bg-gray-100"
            } max-w-[80%] ${msg.isUser ? "ml-auto" : "mr-auto"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <Button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  )
} 