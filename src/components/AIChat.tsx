import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import type { ChatMessage, PowerSupplyDesign } from '@/types/powerSupply';

interface AIChatProps {
  design: PowerSupplyDesign;
  isOpen: boolean;
  onClose: () => void;
}

export function AIChat({ design, isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `I've designed a ${design.topology} power supply for you. Feel free to ask me any questions about the design, components, or calculations. I can also help you understand trade-offs or suggest modifications.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (in production, this would call the AI API)
    setTimeout(() => {
      const responses: Record<string, string> = {
        efficiency: `The ${design.topology} achieves ${design.efficiency}% efficiency primarily due to the switching operation. The main losses come from:\n\n1. **MOSFET switching losses**: ~0.3W at 100kHz\n2. **Inductor DCR losses**: ~0.15W\n3. **Diode forward voltage drop**: ~0.25W\n\nTo improve efficiency, you could consider synchronous rectification or a higher-quality inductor.`,
        component: `All components were selected with a 20% safety margin:\n\n- **Input Capacitor (C1)**: Low ESR electrolytic, rated 50V for 120VAC rectified input\n- **Output Capacitor (C2)**: Ceramic + electrolytic combination for low ripple\n- **Inductor (L1)**: Ferrite core, saturation current >3A\n\nWould you like alternatives for any specific component?`,
        default: `That's a great question about the ${design.topology} design! Based on your requirements, I selected this topology because it offers the best balance of efficiency, cost, and complexity for your application.\n\nThe key design considerations were:\n- Input/output voltage differential\n- Required current capacity\n- Thermal management\n\nIs there a specific aspect you'd like me to elaborate on?`,
      };

      let response = responses.default;
      if (input.toLowerCase().includes('efficiency')) {
        response = responses.efficiency;
      } else if (input.toLowerCase().includes('component') || input.toLowerCase().includes('part')) {
        response = responses.component;
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border py-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            AI Design Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Bot className="w-4 h-4 text-foreground" />
                  )}
                </div>
                <div
                  className={`flex-1 p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-foreground" />
                </div>
                <div className="flex-1 p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <CardContent className="border-t border-border p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about efficiency, components, modifications..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" variant="hero" disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
