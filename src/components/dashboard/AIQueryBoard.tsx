import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";
// Backend removed: AI Query now redirects to external form

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIQueryBoard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const JOTFORM_URL = "https://www.jotform.com/agent/019a392041607f1aa552df34483bd6febbd7";
  // No backend: redirect users to external AI assistant form
  const handleOpenForm = () => {
    window.open(JOTFORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-[var(--theme-accent)]" />
          AI Query Board
        </CardTitle>
        <p className="text-sm text-gray-600">
          Ask questions about complaints, analytics, and trends
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p>Try asking:</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>"Show unresolved complaints in my area"</li>
                <li>"What's the average resolution time this month?"</li>
                <li>"How many complaints were filed this week?"</li>
              </ul>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => window.open(JOTFORM_URL, "_blank", "noopener,noreferrer")}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Open AI Assistant Form
                </button>
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${message.role === "user"
                ? "bg-[var(--theme-primary)] text-white ml-auto max-w-[80%]"
                : "bg-gray-100 text-gray-900 mr-auto max-w-[80%]"
                }`}
            >
              {message.content}
            </div>
          ))}
          {loading && (
            <div className="bg-gray-100 text-gray-900 p-4 rounded-lg mr-auto max-w-[80%]">
              <div className="flex items-center gap-2">
                <div className="animate-pulse">Thinking...</div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" onClick={handleOpenForm} className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            Open AI Assistant Form
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIQueryBoard;
