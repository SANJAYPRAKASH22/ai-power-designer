import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircuitBoard } from 'lucide-react';
import type { PowerSupplyDesign } from '@/types/powerSupply';

interface CircuitSchematicProps {
  design: PowerSupplyDesign;
}

export function CircuitSchematic({ design }: CircuitSchematicProps) {
  // Generate a simple SVG schematic based on topology
  const renderSchematic = () => {
    if (design.topology === 'Buck Converter') {
      return (
        <svg viewBox="0 0 600 300" className="w-full h-auto">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="600" height="300" fill="url(#grid)" />

          {/* Input */}
          <g className="stroke-primary" strokeWidth="2" fill="none">
            {/* Input terminal */}
            <circle cx="50" cy="100" r="8" />
            <text x="30" y="80" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="var(--font-mono)">Vin</text>

            {/* Input capacitor */}
            <line x1="50" y1="100" x2="100" y2="100" />
            <line x1="100" y1="85" x2="100" y2="115" strokeWidth="3" />
            <line x1="110" y1="90" x2="110" y2="110" strokeWidth="3" />
            <text x="95" y="135" fill="hsl(var(--accent))" fontSize="10" fontFamily="var(--font-mono)">C1</text>

            {/* MOSFET Switch */}
            <line x1="110" y1="100" x2="160" y2="100" />
            <rect x="160" y="80" width="40" height="40" fill="hsl(var(--secondary))" stroke="hsl(var(--primary))" strokeWidth="2" rx="4" />
            <text x="170" y="105" fill="hsl(var(--primary))" fontSize="10" fontFamily="var(--font-mono)">Q1</text>

            {/* Inductor */}
            <line x1="200" y1="100" x2="230" y2="100" />
            <path d="M 230 100 Q 245 80 260 100 Q 275 120 290 100 Q 305 80 320 100 Q 335 120 350 100" />
            <text x="280" y="135" fill="hsl(var(--accent))" fontSize="10" fontFamily="var(--font-mono)">L1</text>

            {/* Diode */}
            <line x1="180" y1="120" x2="180" y2="160" />
            <polygon points="165,160 195,160 180,190" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
            <line x1="165" y1="190" x2="195" y2="190" />
            <text x="200" y="180" fill="hsl(var(--accent))" fontSize="10" fontFamily="var(--font-mono)">D1</text>

            {/* Output capacitor */}
            <line x1="350" y1="100" x2="400" y2="100" />
            <line x1="400" y1="85" x2="400" y2="115" strokeWidth="3" />
            <line x1="410" y1="90" x2="410" y2="110" strokeWidth="3" />
            <text x="395" y="135" fill="hsl(var(--accent))" fontSize="10" fontFamily="var(--font-mono)">C2</text>

            {/* Output */}
            <line x1="410" y1="100" x2="460" y2="100" />
            <circle cx="460" cy="100" r="8" />
            <text x="475" y="105" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="var(--font-mono)">Vout</text>

            {/* Load resistor */}
            <line x1="460" y1="108" x2="460" y2="140" />
            <path d="M 460 140 L 450 150 L 470 160 L 450 170 L 470 180 L 450 190 L 460 200" fill="none" />
            <text x="475" y="175" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--font-mono)">RL</text>

            {/* Ground connections */}
            <line x1="50" y1="200" x2="460" y2="200" />
            <line x1="50" y1="108" x2="50" y2="200" />
            <line x1="110" y1="100" x2="110" y2="200" />
            <line x1="180" y1="190" x2="180" y2="200" />
            <line x1="410" y1="100" x2="410" y2="200" />
            <line x1="460" y1="200" x2="460" y2="200" />

            {/* Ground symbol */}
            <line x1="240" y1="200" x2="260" y2="200" strokeWidth="3" />
            <line x1="245" y1="205" x2="255" y2="205" strokeWidth="2" />
            <line x1="248" y1="210" x2="252" y2="210" strokeWidth="1" />
          </g>

          {/* Controller IC */}
          <rect x="130" y="230" width="80" height="40" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" rx="4" />
          <text x="145" y="255" fill="hsl(var(--primary))" fontSize="10" fontFamily="var(--font-mono)">PWM IC</text>
          <line x1="170" y1="230" x2="180" y2="150" strokeDasharray="4" stroke="hsl(var(--muted-foreground))" />
        </svg>
      );
    }

    // Linear regulator schematic
    return (
      <svg viewBox="0 0 500 250" className="w-full h-auto">
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="500" height="250" fill="url(#grid2)" />

        <g className="stroke-primary" strokeWidth="2" fill="none">
          {/* Input */}
          <circle cx="50" cy="80" r="8" />
          <text x="30" y="60" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="var(--font-mono)">Vin</text>

          {/* Input cap */}
          <line x1="50" y1="80" x2="100" y2="80" />
          <line x1="100" y1="65" x2="100" y2="95" strokeWidth="3" />
          <line x1="110" y1="70" x2="110" y2="90" strokeWidth="3" />
          <text x="95" y="115" fill="hsl(var(--accent))" fontSize="10" fontFamily="var(--font-mono)">C1</text>

          {/* Regulator IC */}
          <line x1="110" y1="80" x2="150" y2="80" />
          <rect x="150" y="50" width="100" height="60" fill="hsl(var(--secondary))" stroke="hsl(var(--primary))" strokeWidth="2" rx="4" />
          <text x="165" y="85" fill="hsl(var(--primary))" fontSize="14" fontFamily="var(--font-mono)">LM7805</text>
          <text x="155" y="65" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="var(--font-mono)">IN</text>
          <text x="230" y="65" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="var(--font-mono)">OUT</text>
          <text x="190" y="100" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="var(--font-mono)">GND</text>

          {/* Output cap */}
          <line x1="250" y1="80" x2="300" y2="80" />
          <line x1="300" y1="65" x2="300" y2="95" strokeWidth="3" />
          <line x1="310" y1="70" x2="310" y2="90" strokeWidth="3" />
          <text x="295" y="115" fill="hsl(var(--accent))" fontSize="10" fontFamily="var(--font-mono)">C2</text>

          {/* Output */}
          <line x1="310" y1="80" x2="360" y2="80" />
          <circle cx="360" cy="80" r="8" />
          <text x="375" y="85" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="var(--font-mono)">Vout</text>

          {/* Ground connections */}
          <line x1="50" y1="88" x2="50" y2="180" />
          <line x1="110" y1="80" x2="110" y2="180" />
          <line x1="200" y1="110" x2="200" y2="180" />
          <line x1="310" y1="80" x2="310" y2="180" />
          <line x1="360" y1="88" x2="360" y2="180" />
          <line x1="50" y1="180" x2="360" y2="180" />

          {/* Ground symbol */}
          <line x1="190" y1="180" x2="210" y2="180" strokeWidth="3" />
          <line x1="193" y1="185" x2="207" y2="185" strokeWidth="2" />
          <line x1="196" y1="190" x2="204" y2="190" strokeWidth="1" />
        </g>
      </svg>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircuitBoard className="w-5 h-5 text-primary" />
          Circuit Schematic
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary/30 rounded-lg p-4 border border-border">
          {renderSchematic()}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Topology: {design.topology}</span>
          <span className="font-mono">{design.efficiency}% efficiency</span>
        </div>
      </CardContent>
    </Card>
  );
}
