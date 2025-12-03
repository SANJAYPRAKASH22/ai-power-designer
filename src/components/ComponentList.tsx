import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, ExternalLink, Copy } from 'lucide-react';
import type { Component } from '@/types/powerSupply';
import { toast } from 'sonner';

interface ComponentListProps {
  components: Component[];
  totalCost: number;
}

export function ComponentList({ components, totalCost }: ComponentListProps) {
  const copyBOM = () => {
    const bom = components
      .map((c) => `${c.quantity}x ${c.partNumber} - ${c.name} (${c.value})`)
      .join('\n');
    navigator.clipboard.writeText(bom);
    toast.success('Bill of Materials copied to clipboard');
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      IC: 'bg-primary/20 text-primary',
      Capacitor: 'bg-accent/20 text-accent',
      Inductor: 'bg-warning/20 text-warning',
      Diode: 'bg-success/20 text-success',
      Resistor: 'bg-muted text-muted-foreground',
      MOSFET: 'bg-destructive/20 text-destructive',
    };
    return colors[type] || 'bg-secondary text-secondary-foreground';
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Bill of Materials
        </CardTitle>
        <Button variant="outline" size="sm" onClick={copyBOM}>
          <Copy className="w-4 h-4 mr-2" />
          Copy BOM
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30">
                <TableHead className="font-semibold">Component</TableHead>
                <TableHead className="font-semibold">Part #</TableHead>
                <TableHead className="font-semibold">Value</TableHead>
                <TableHead className="font-semibold">Qty</TableHead>
                <TableHead className="font-semibold text-right">Est. Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {components.map((component) => (
                <TableRow key={component.id} className="hover:bg-secondary/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(component.type)} variant="secondary">
                        {component.type}
                      </Badge>
                      <span className="font-medium">{component.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2">
                      {component.partNumber}
                      {component.datasheet && (
                        <a
                          href={component.datasheet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{component.value}</TableCell>
                  <TableCell>{component.quantity}</TableCell>
                  <TableCell className="text-right font-mono">
                    ${component.estimatedCost.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Estimated Cost</span>
            <span className="text-2xl font-bold font-mono text-primary">
              ${totalCost.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
