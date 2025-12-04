import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Battery, Lightbulb, Music, Monitor, Cpu, ArrowRight } from 'lucide-react';

interface Example {
  title: string;
  description: string;
  icon: React.ElementType;
  topology: string;
  specs: {
    input: string;
    output: string;
    current: string;
    efficiency: string;
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const examples: Example[] = [
  {
    title: '5V USB Charger',
    description: 'Simple phone charger from mains AC with USB output',
    icon: Battery,
    topology: 'Flyback Converter',
    specs: {
      input: '120-240V AC',
      output: '5V DC',
      current: '2.4A',
      efficiency: '85%',
    },
    difficulty: 'Intermediate',
  },
  {
    title: '12V LED Strip Driver',
    description: 'Constant voltage supply for decorative LED strips',
    icon: Lightbulb,
    topology: 'Buck Converter',
    specs: {
      input: '24V DC',
      output: '12V DC',
      current: '5A',
      efficiency: '92%',
    },
    difficulty: 'Beginner',
  },
  {
    title: 'Audio Amplifier PSU',
    description: 'Dual-rail supply for Class AB audio amplifier',
    icon: Music,
    topology: 'Linear Regulator',
    specs: {
      input: '30V AC',
      output: '±15V DC',
      current: '3A',
      efficiency: '65%',
    },
    difficulty: 'Intermediate',
  },
  {
    title: 'Laptop Charger',
    description: 'High-power adapter for notebook computers',
    icon: Monitor,
    topology: 'LLC Resonant',
    specs: {
      input: '100-240V AC',
      output: '19.5V DC',
      current: '4.62A',
      efficiency: '90%',
    },
    difficulty: 'Advanced',
  },
  {
    title: 'Arduino Power Supply',
    description: 'Simple 5V regulator for microcontroller projects',
    icon: Cpu,
    topology: 'Linear Regulator',
    specs: {
      input: '9V DC',
      output: '5V DC',
      current: '500mA',
      efficiency: '55%',
    },
    difficulty: 'Beginner',
  },
  {
    title: 'PoE Injector',
    description: 'Power over Ethernet for IP cameras and access points',
    icon: Zap,
    topology: 'Boost Converter',
    specs: {
      input: '12V DC',
      output: '48V DC',
      current: '0.5A',
      efficiency: '88%',
    },
    difficulty: 'Advanced',
  },
];

const difficultyColors = {
  Beginner: 'bg-success/20 text-success border-success/30',
  Intermediate: 'bg-warning/20 text-warning border-warning/30',
  Advanced: 'bg-destructive/20 text-destructive border-destructive/30',
};

interface ExamplesDialogProps {
  children: React.ReactNode;
  onSelectExample?: (designName: string) => void;
}

export function ExamplesDialog({ children, onSelectExample }: ExamplesDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSelectExample = (title: string) => {
    setOpen(false);
    onSelectExample?.(title);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Example Power Supply Designs</DialogTitle>
          <p className="text-muted-foreground">
            Browse common power supply designs to understand what's possible
          </p>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          {examples.map((example) => (
            <Card
              key={example.title}
              className="p-4 hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => handleSelectExample(example.title)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <example.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{example.title}</h3>
                    <Badge variant="outline" className={difficultyColors[example.difficulty]}>
                      {example.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{example.description}</p>
                  <div className="text-xs font-mono bg-secondary/50 rounded-md p-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Topology:</span>
                      <span className="text-primary">{example.topology}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Input:</span>
                      <span className="text-foreground">{example.specs.input}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Output:</span>
                      <span className="text-foreground">{example.specs.output}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current:</span>
                      <span className="text-foreground">{example.specs.current}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Efficiency:</span>
                      <span className="text-accent">{example.specs.efficiency}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 w-full group-hover:bg-primary/10 group-hover:text-primary"
                  >
                    Use this design
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
