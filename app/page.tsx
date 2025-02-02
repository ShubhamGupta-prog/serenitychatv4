"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Phone, FileText, Snowflake, Users, Send } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { v4 as uuidv4 } from "uuid"
import { ChatInterface } from "@/components/chat-interface"

type Message = {
  id: string
  text: string
  isUser: boolean
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(uuidv4())

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: uuidv4(),
      text: inputMessage,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from the chatbot")
      }

      const data = await response.json()
      const botMessage: Message = {
        id: uuidv4(),
        text: data.response,
        isUser: false,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-blue-500" />
            <h1 className="text-lg font-semibold dark:text-white">SerenityChat - Your Mental Friendly Companion</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300">
              Sign In
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">What can I help with?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            This is a safe space to share your thoughts and feelings. Whether you're dealing with stress, anxiety, or
            just need someone to talk to, I'm here to listen without judgment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Crisis Helpline</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    24/7 confidential support when you need it most. Free, anonymous, and always here for you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Self-Care Guide</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Practical tips and techniques for managing stress, anxiety, and maintaining mental wellness.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Snowflake className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Meditation Resources</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Free guided meditations and mindfulness exercises to help you find peace and clarity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Support Groups</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Connect with others who understand what you're going through in a safe, moderated environment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white dark:bg-gray-900">
          <CardContent className="p-6">
            <div className="mb-4 max-h-[300px] overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`mb-2 ${message.isUser ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block p-2 rounded-lg ${message.isUser ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"}`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Textarea
                placeholder="What's on your mind?"
                className="flex-grow resize-none border-0 focus-visible:ring-0 px-0 bg-transparent dark:text-white"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

