import type { PowerSupplyDesign, PowerSupplyRequirements } from '@/types/powerSupply';

export function generateMockDesign(requirements: PowerSupplyRequirements): PowerSupplyDesign {
  const isLinear = requirements.regulationType === 'linear';
  const outputPower = requirements.outputVoltage * requirements.outputCurrent;
  
  // Determine topology based on regulation type
  let topology = 'Buck Converter';
  let topologyReason = '';
  
  switch (requirements.regulationType) {
    case 'linear':
      topology = 'Linear Regulator';
      topologyReason = `A linear regulator (LM7805 series) is ideal for your ${requirements.outputVoltage}V/${requirements.outputCurrent}A requirement. It provides excellent voltage regulation with minimal output noise, making it perfect for sensitive analog circuits. The trade-off is lower efficiency (~60%) but the simplicity and low component count make it cost-effective for this power level.`;
      break;
    case 'buck':
      topology = 'Buck Converter';
      topologyReason = `A Buck (step-down) converter is optimal for stepping down ${requirements.inputVoltage}V to ${requirements.outputVoltage}V. It offers high efficiency (~${requirements.efficiencyTarget || 85}%) and handles your ${requirements.outputCurrent}A current requirement well. The synchronous buck topology minimizes losses through MOSFET switching.`;
      break;
    case 'boost':
      topology = 'Boost Converter';
      topologyReason = `A Boost (step-up) converter is required since your input (${requirements.inputVoltage}V) is lower than the desired output (${requirements.outputVoltage}V). This topology efficiently boosts voltage while maintaining current capability.`;
      break;
    case 'buck-boost':
      topology = 'Buck-Boost Converter';
      topologyReason = `A Buck-Boost converter provides flexibility when input voltage may be above or below the output. It can regulate ${requirements.outputVoltage}V output from a wide ${requirements.inputVoltage}V input range, ideal for battery-powered applications.`;
      break;
    case 'flyback':
      topology = 'Flyback Converter';
      topologyReason = `A Flyback converter provides galvanic isolation between input and output, essential for AC-DC applications. It handles your ${requirements.outputVoltage}V/${requirements.outputCurrent}A requirement with good efficiency and is cost-effective for power levels under 100W.`;
      break;
    case 'forward':
      topology = 'Forward Converter';
      topologyReason = `A Forward converter is selected for higher power isolated applications. It provides better efficiency than flyback at your power level and handles continuous power delivery more effectively.`;
      break;
    case 'llc':
      topology = 'LLC Resonant Converter';
      topologyReason = `An LLC resonant converter achieves the highest efficiency (>95%) with zero-voltage switching (ZVS). It produces minimal EMI and is ideal for high-performance applications requiring ${requirements.outputVoltage}V/${requirements.outputCurrent}A.`;
      break;
    default:
      topology = 'Buck Converter';
      topologyReason = `A Buck (step-down) converter is optimal for stepping down ${requirements.inputVoltage}V to ${requirements.outputVoltage}V with high efficiency.`;
  }

  const efficiency = isLinear 
    ? Math.round((requirements.outputVoltage / requirements.inputVoltage) * 100 * 0.95)
    : requirements.efficiencyTarget || 87;

  const powerDissipation = Number((outputPower * (100 - efficiency) / efficiency).toFixed(2));

  // Generate components based on topology
  const components = isLinear ? [
    {
      id: '1',
      name: 'Voltage Regulator',
      type: 'IC',
      value: `${requirements.outputVoltage}V`,
      partNumber: requirements.outputVoltage === 5 ? 'LM7805CT' : `LM78${String(requirements.outputVoltage).padStart(2, '0')}CT`,
      rating: '1.5A max',
      quantity: 1,
      estimatedCost: 0.85,
      datasheet: 'https://www.ti.com/lit/ds/symlink/lm7805c.pdf',
    },
    {
      id: '2',
      name: 'Input Capacitor',
      type: 'Capacitor',
      value: '0.33µF',
      partNumber: 'C330N50V',
      rating: '50V',
      quantity: 1,
      estimatedCost: 0.15,
    },
    {
      id: '3',
      name: 'Output Capacitor',
      type: 'Capacitor',
      value: '0.1µF',
      partNumber: 'C100N25V',
      rating: '25V',
      quantity: 1,
      estimatedCost: 0.10,
    },
    {
      id: '4',
      name: 'Protection Diode',
      type: 'Diode',
      value: '1N4007',
      partNumber: '1N4007',
      rating: '1000V, 1A',
      quantity: 2,
      estimatedCost: 0.20,
    },
  ] : [
    {
      id: '1',
      name: 'Buck Controller IC',
      type: 'IC',
      value: 'PWM Controller',
      partNumber: 'LM2596S-ADJ',
      rating: '3A, 150kHz',
      quantity: 1,
      estimatedCost: 2.50,
      datasheet: 'https://www.ti.com/lit/ds/symlink/lm2596.pdf',
    },
    {
      id: '2',
      name: 'Power Inductor',
      type: 'Inductor',
      value: '33µH',
      partNumber: 'SRR1280-330M',
      rating: '4.2A sat, 0.023Ω DCR',
      quantity: 1,
      estimatedCost: 1.85,
    },
    {
      id: '3',
      name: 'Input Capacitor',
      type: 'Capacitor',
      value: '680µF',
      partNumber: 'ECA-1HM681',
      rating: '50V, Low ESR',
      quantity: 1,
      estimatedCost: 0.75,
    },
    {
      id: '4',
      name: 'Output Capacitor',
      type: 'Capacitor',
      value: '220µF',
      partNumber: 'ECA-1CM221',
      rating: '16V, Low ESR',
      quantity: 2,
      estimatedCost: 0.90,
    },
    {
      id: '5',
      name: 'Schottky Diode',
      type: 'Diode',
      value: '40V 5A',
      partNumber: 'SS54',
      rating: '40V, 5A, 0.5V Vf',
      quantity: 1,
      estimatedCost: 0.45,
    },
    {
      id: '6',
      name: 'Feedback Resistor 1',
      type: 'Resistor',
      value: '1kΩ',
      partNumber: 'CRCW04021K00FKED',
      rating: '1%, 0402',
      quantity: 1,
      estimatedCost: 0.05,
    },
    {
      id: '7',
      name: 'Feedback Resistor 2',
      type: 'Resistor',
      value: '2.7kΩ',
      partNumber: 'CRCW04022K70FKED',
      rating: '1%, 0402',
      quantity: 1,
      estimatedCost: 0.05,
    },
  ];

  const calculations = isLinear ? [
    {
      name: 'Power Dissipation',
      formula: `P_diss = (V_in - V_out) × I_out = (${requirements.inputVoltage}V - ${requirements.outputVoltage}V) × ${requirements.outputCurrent}A`,
      result: `${((requirements.inputVoltage - requirements.outputVoltage) * requirements.outputCurrent).toFixed(2)}W`,
      explanation: 'Heat generated in the regulator that must be dissipated. Consider heatsink if >1W.',
    },
    {
      name: 'Minimum Input Voltage',
      formula: `V_in(min) = V_out + V_dropout = ${requirements.outputVoltage}V + 2V`,
      result: `${requirements.outputVoltage + 2}V`,
      explanation: 'The LM78xx series has a typical dropout voltage of 2V.',
    },
  ] : [
    {
      name: 'Inductor Value',
      formula: `L = (V_in - V_out) × D / (f × ΔI_L) = (${requirements.inputVoltage} - ${requirements.outputVoltage}) × 0.${Math.round(requirements.outputVoltage / requirements.inputVoltage * 100)} / (150kHz × ${(requirements.outputCurrent * 0.3).toFixed(1)}A)`,
      result: '33µH',
      explanation: 'Selected for 30% ripple current at minimum load. Higher inductance reduces ripple but increases size.',
    },
    {
      name: 'Output Capacitor',
      formula: `C_out = ΔI_L / (8 × f × ΔV_out) = ${(requirements.outputCurrent * 0.3).toFixed(1)}A / (8 × 150kHz × 0.05V)`,
      result: '220µF',
      explanation: 'Sized for 50mV output ripple. Low ESR ceramic + bulk electrolytic combination recommended.',
    },
    {
      name: 'Duty Cycle',
      formula: `D = V_out / V_in = ${requirements.outputVoltage}V / ${requirements.inputVoltage}V`,
      result: `${Math.round(requirements.outputVoltage / requirements.inputVoltage * 100)}%`,
      explanation: 'The fraction of time the high-side switch is ON per switching cycle.',
    },
    {
      name: 'Feedback Resistor Ratio',
      formula: `V_out = V_ref × (1 + R2/R1) → R2/R1 = (V_out/1.23V) - 1`,
      result: 'R1=1kΩ, R2=2.7kΩ',
      explanation: 'Sets the output voltage via the feedback divider. Use 1% tolerance resistors.',
    },
  ];

  const safetyFeatures = [
    {
      type: 'Overcurrent Protection',
      description: `Built-in current limiting protects against short circuits. The ${isLinear ? 'LM78xx' : 'LM2596'} includes internal current limiting at approximately ${isLinear ? '1.5' : '4.5'}A.`,
      components: [isLinear ? 'LM7805CT' : 'LM2596S-ADJ'],
      importance: 'critical' as const,
    },
    {
      type: 'Thermal Shutdown',
      description: 'Automatic shutdown when junction temperature exceeds 150°C, preventing permanent damage.',
      components: [isLinear ? 'LM7805CT' : 'LM2596S-ADJ'],
      importance: 'critical' as const,
    },
    {
      type: 'Input Reverse Polarity Protection',
      description: 'Series diode prevents damage from reverse-connected input power.',
      components: ['1N4007 (recommended)'],
      importance: 'recommended' as const,
    },
    {
      type: 'Output Overvoltage Protection',
      description: 'TVS diode clamps output voltage spikes during load transients.',
      components: ['SMBJ6.0A (recommended for 5V output)'],
      importance: 'optional' as const,
    },
  ];

  const totalCost = components.reduce((sum, c) => sum + c.estimatedCost * c.quantity, 0);

  return {
    id: Date.now().toString(),
    name: `${requirements.outputVoltage}V ${requirements.outputCurrent}A ${topology}`,
    topology,
    topologyReason,
    components,
    calculations,
    safetyFeatures,
    efficiency,
    powerDissipation,
    voltageRipple: isLinear ? '<1mV' : '50mVpp',
    totalCost: Number(totalCost.toFixed(2)),
    warnings: powerDissipation > 2 ? ['High power dissipation detected. Ensure adequate heatsinking.'] : [],
    recommendations: [
      'Use a multimeter to verify output voltage before connecting load',
      'Consider adding a fuse at the input for additional protection',
      isLinear ? 'Mount regulator on heatsink if power dissipation exceeds 1W' : 'Ensure adequate PCB copper area for thermal dissipation',
    ],
  };
}
