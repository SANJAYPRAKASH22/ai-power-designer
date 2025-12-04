import { Zap, Cpu, Shield, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExamplesDialog } from '@/components/ExamplesDialog';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const features = [
    { icon: Zap, label: 'Instant Design', description: 'Complete circuits in seconds' },
    { icon: Cpu, label: 'AI-Powered', description: 'Smart topology selection' },
    { icon: Shield, label: 'Safety First', description: 'Built-in protection circuits' },
    { icon: Download, label: 'Export Ready', description: 'PDF & BOM downloads' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo/Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-mono text-muted-foreground">AI-Powered Engineering Tool</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-foreground">Power Supply</span>
          <br />
          <span className="text-gradient glow-text">Calculator & Designer</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Design complete power supply circuits in seconds. Get component recommendations, 
          calculations, schematics, and safety features—all powered by AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button variant="hero" size="xl" onClick={onGetStarted}>
            <Zap className="w-5 h-5" />
            Start Designing
          </Button>
          <ExamplesDialog>
            <Button variant="outline" size="xl">
              View Examples
            </Button>
          </ExamplesDialog>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className="group p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 hover:bg-card transition-all duration-300"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <feature.icon className="w-8 h-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">{feature.label}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}
