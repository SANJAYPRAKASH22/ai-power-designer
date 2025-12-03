import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CircuitBoard, Package, Calculator, Shield, Download, ArrowLeft, MessageSquare } from 'lucide-react';
import { CircuitSchematic } from './CircuitSchematic';
import { ComponentList } from './ComponentList';
import { CalculationsPanel } from './CalculationsPanel';
import { SafetyPanel } from './SafetyPanel';
import type { PowerSupplyDesign } from '@/types/powerSupply';
import { toast } from 'sonner';

interface DesignResultsProps {
  design: PowerSupplyDesign;
  onBack: () => void;
  onOpenChat: () => void;
}

export function DesignResults({ design, onBack, onOpenChat }: DesignResultsProps) {
  const handleExportPDF = () => {
    toast.success('PDF export coming soon!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                New Design
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-bold text-foreground">{design.name}</h1>
                <p className="text-sm text-muted-foreground">{design.topology}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onOpenChat}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
              <Button variant="hero" size="sm" onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Topology</div>
            <div className="font-semibold text-foreground">{design.topology}</div>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Efficiency</div>
            <div className="font-semibold text-success font-mono">{design.efficiency}%</div>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Components</div>
            <div className="font-semibold text-foreground">{design.components.length} parts</div>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Est. Cost</div>
            <div className="font-semibold text-primary font-mono">${design.totalCost.toFixed(2)}</div>
          </div>
        </div>

        {/* Topology Explanation */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mb-8">
          <h3 className="font-semibold text-foreground mb-2">Why {design.topology}?</h3>
          <p className="text-sm text-muted-foreground">{design.topologyReason}</p>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="schematic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="schematic" className="gap-2">
              <CircuitBoard className="w-4 h-4" />
              <span className="hidden sm:inline">Schematic</span>
            </TabsTrigger>
            <TabsTrigger value="components" className="gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Components</span>
            </TabsTrigger>
            <TabsTrigger value="calculations" className="gap-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Calculations</span>
            </TabsTrigger>
            <TabsTrigger value="safety" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Safety</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schematic" className="animate-fade-in">
            <CircuitSchematic design={design} />
          </TabsContent>

          <TabsContent value="components" className="animate-fade-in">
            <ComponentList components={design.components} totalCost={design.totalCost} />
          </TabsContent>

          <TabsContent value="calculations" className="animate-fade-in">
            <CalculationsPanel
              calculations={design.calculations}
              efficiency={design.efficiency}
              powerDissipation={design.powerDissipation}
              voltageRipple={design.voltageRipple}
            />
          </TabsContent>

          <TabsContent value="safety" className="animate-fade-in">
            <SafetyPanel
              safetyFeatures={design.safetyFeatures}
              warnings={design.warnings}
              recommendations={design.recommendations}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
