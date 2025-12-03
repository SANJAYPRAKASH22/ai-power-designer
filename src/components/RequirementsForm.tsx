import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Settings, Thermometer, ArrowRight, Loader2 } from 'lucide-react';
import type { PowerSupplyRequirements } from '@/types/powerSupply';

interface RequirementsFormProps {
  onSubmit: (requirements: PowerSupplyRequirements) => void;
  isLoading: boolean;
}

export function RequirementsForm({ onSubmit, isLoading }: RequirementsFormProps) {
  const [formData, setFormData] = useState<Partial<PowerSupplyRequirements>>({
    inputVoltage: 120,
    inputType: 'AC',
    outputVoltage: 5,
    outputCurrent: 2,
    regulationType: 'switching',
    loadType: 'variable',
    efficiencyTarget: 85,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as PowerSupplyRequirements);
  };

  const updateField = <K extends keyof PowerSupplyRequirements>(
    field: K,
    value: PowerSupplyRequirements[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Design Requirements</h2>
        <p className="text-muted-foreground">Enter your power supply specifications</p>
      </div>

      <Card className="border-primary/20 bg-card/80 backdrop-blur">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Configuration
          </CardTitle>
          <CardDescription>
            Provide your input/output requirements for AI-powered design
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="basic">
                  <Zap className="w-4 h-4 mr-2" />
                  Basic
                </TabsTrigger>
                <TabsTrigger value="advanced">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced
                </TabsTrigger>
                <TabsTrigger value="environment">
                  <Thermometer className="w-4 h-4 mr-2" />
                  Environment
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="inputVoltage" className="text-sm font-medium">
                      Input Voltage (V)
                    </Label>
                    <Input
                      id="inputVoltage"
                      type="number"
                      value={formData.inputVoltage}
                      onChange={(e) => updateField('inputVoltage', Number(e.target.value))}
                      placeholder="e.g., 120"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inputType" className="text-sm font-medium">
                      Input Type
                    </Label>
                    <Select
                      value={formData.inputType}
                      onValueChange={(v) => updateField('inputType', v as 'AC' | 'DC')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC">AC (Alternating Current)</SelectItem>
                        <SelectItem value="DC">DC (Direct Current)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Output Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="outputVoltage" className="text-sm font-medium">
                      Output Voltage (V)
                    </Label>
                    <Input
                      id="outputVoltage"
                      type="number"
                      value={formData.outputVoltage}
                      onChange={(e) => updateField('outputVoltage', Number(e.target.value))}
                      placeholder="e.g., 5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="outputCurrent" className="text-sm font-medium">
                      Output Current (A)
                    </Label>
                    <Input
                      id="outputCurrent"
                      type="number"
                      step="0.1"
                      value={formData.outputCurrent}
                      onChange={(e) => updateField('outputCurrent', Number(e.target.value))}
                      placeholder="e.g., 2"
                    />
                  </div>
                </div>

                {/* Regulation Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Regulation Type</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => updateField('regulationType', 'linear')}
                      className={`p-4 rounded-lg border transition-all ${
                        formData.regulationType === 'linear'
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground'
                      }`}
                    >
                      <div className="font-semibold mb-1">Linear</div>
                      <div className="text-xs">Low noise, simple design</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('regulationType', 'switching')}
                      className={`p-4 rounded-lg border transition-all ${
                        formData.regulationType === 'switching'
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground'
                      }`}
                    >
                      <div className="font-semibold mb-1">Switching</div>
                      <div className="text-xs">High efficiency, compact</div>
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="efficiency" className="text-sm font-medium">
                      Efficiency Target (%)
                    </Label>
                    <Input
                      id="efficiency"
                      type="number"
                      min="50"
                      max="99"
                      value={formData.efficiencyTarget}
                      onChange={(e) => updateField('efficiencyTarget', Number(e.target.value))}
                      placeholder="e.g., 85"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loadType" className="text-sm font-medium">
                      Load Type
                    </Label>
                    <Select
                      value={formData.loadType}
                      onValueChange={(v) => updateField('loadType', v as 'constant' | 'variable')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select load type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="constant">Constant Load</SelectItem>
                        <SelectItem value="variable">Variable Load</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="environment" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tempMin" className="text-sm font-medium">
                      Min Temperature (°C)
                    </Label>
                    <Input
                      id="tempMin"
                      type="number"
                      placeholder="e.g., -10"
                      onChange={(e) =>
                        updateField('temperatureRange', {
                          ...formData.temperatureRange,
                          min: Number(e.target.value),
                          max: formData.temperatureRange?.max || 85,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tempMax" className="text-sm font-medium">
                      Max Temperature (°C)
                    </Label>
                    <Input
                      id="tempMax"
                      type="number"
                      placeholder="e.g., 85"
                      onChange={(e) =>
                        updateField('temperatureRange', {
                          min: formData.temperatureRange?.min || 0,
                          max: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Enclosure Type</Label>
                  <Select
                    value={formData.enclosureType}
                    onValueChange={(v) => updateField('enclosureType', v as 'open' | 'enclosed' | 'sealed')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select enclosure type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open Frame</SelectItem>
                      <SelectItem value="enclosed">Enclosed</SelectItem>
                      <SelectItem value="sealed">Sealed/Potted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-end">
              <Button type="submit" variant="hero" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Designing...
                  </>
                ) : (
                  <>
                    Generate Design
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
