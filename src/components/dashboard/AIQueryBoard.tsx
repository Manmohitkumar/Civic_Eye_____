import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIQueryBoard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-query", {
        body: { query: userMessage },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error: any) {
      console.error("AI Query error:", error);
      toast.error("Failed to process query. Please try again.");
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "I apologize, but I encountered an error processing your query. Please try again." 
        },
      ]);
    } finally {
      setLoading(false);
    }
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
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === "user"
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
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about complaints..."
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            <Send size={18} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIQueryBoard;
