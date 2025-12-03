import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import type { SafetyFeature } from '@/types/powerSupply';

interface SafetyPanelProps {
  safetyFeatures: SafetyFeature[];
  warnings: string[];
  recommendations: string[];
}

export function SafetyPanel({ safetyFeatures, warnings, recommendations }: SafetyPanelProps) {
  const getImportanceStyles = (importance: SafetyFeature['importance']) => {
    switch (importance) {
      case 'critical':
        return { badge: 'bg-destructive/20 text-destructive', icon: AlertTriangle };
      case 'recommended':
        return { badge: 'bg-warning/20 text-warning', icon: CheckCircle };
      case 'optional':
        return { badge: 'bg-muted text-muted-foreground', icon: Info };
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Safety & Protection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="font-semibold text-destructive">Design Warnings</span>
            </div>
            <ul className="space-y-2">
              {warnings.map((warning, index) => (
                <li key={index} className="text-sm text-destructive/90 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Safety Features */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Protection Circuits</h4>
          {safetyFeatures.map((feature, index) => {
            const { badge, icon: Icon } = getImportanceStyles(feature.importance);
            return (
              <div
                key={index}
                className="p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{feature.type}</span>
                  </div>
                  <Badge className={badge} variant="secondary">
                    {feature.importance}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.components.map((comp, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-semibold text-success">Recommendations</span>
            </div>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-success/90 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
