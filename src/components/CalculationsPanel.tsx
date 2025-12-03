import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Info } from 'lucide-react';
import type { Calculation } from '@/types/powerSupply';

interface CalculationsPanelProps {
  calculations: Calculation[];
  efficiency: number;
  powerDissipation: number;
  voltageRipple: string;
}

export function CalculationsPanel({
  calculations,
  efficiency,
  powerDissipation,
  voltageRipple,
}: CalculationsPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Design Calculations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Efficiency</div>
            <div className="text-2xl font-bold font-mono text-success">{efficiency}%</div>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Power Loss</div>
            <div className="text-2xl font-bold font-mono text-warning">{powerDissipation}W</div>
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Ripple</div>
            <div className="text-2xl font-bold font-mono text-primary">{voltageRipple}</div>
          </div>
        </div>

        {/* Detailed Calculations */}
        <div className="space-y-4">
          {calculations.map((calc, index) => (
            <div
              key={index}
              className="p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground">{calc.name}</h4>
                <span className="font-mono text-primary font-bold">{calc.result}</span>
              </div>
              <div className="bg-secondary/50 rounded p-2 mb-2 overflow-x-auto">
                <code className="text-sm font-mono text-accent">{calc.formula}</code>
              </div>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {calc.explanation}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
