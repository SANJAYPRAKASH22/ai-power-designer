export interface PowerSupplyRequirements {
  inputVoltage: number;
  inputType: 'AC' | 'DC';
  outputVoltage: number;
  outputCurrent: number;
  regulationType: 'linear' | 'switching';
  topology?: string;
  efficiencyTarget?: number;
  loadType: 'constant' | 'variable';
  temperatureRange?: { min: number; max: number };
  enclosureType?: 'open' | 'enclosed' | 'sealed';
}

export interface Component {
  id: string;
  name: string;
  type: string;
  value: string;
  partNumber: string;
  rating: string;
  quantity: number;
  estimatedCost: number;
  datasheet?: string;
  alternatives?: Array<{
    partNumber: string;
    cost: number;
    supplier: string;
  }>;
}

export interface Calculation {
  name: string;
  formula: string;
  result: string;
  explanation: string;
}

export interface SafetyFeature {
  type: string;
  description: string;
  components: string[];
  importance: 'critical' | 'recommended' | 'optional';
}

export interface PowerSupplyDesign {
  id: string;
  name: string;
  topology: string;
  topologyReason: string;
  components: Component[];
  calculations: Calculation[];
  safetyFeatures: SafetyFeature[];
  efficiency: number;
  powerDissipation: number;
  voltageRipple: string;
  totalCost: number;
  schematicSvg?: string;
  warnings: string[];
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
