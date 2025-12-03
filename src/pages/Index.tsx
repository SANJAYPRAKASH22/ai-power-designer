import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { RequirementsForm } from '@/components/RequirementsForm';
import { DesignResults } from '@/components/DesignResults';
import { AIChat } from '@/components/AIChat';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { generateMockDesign } from '@/lib/mockDesign';
import type { PowerSupplyRequirements, PowerSupplyDesign } from '@/types/powerSupply';

type AppState = 'hero' | 'input' | 'loading' | 'results';

const Index = () => {
  const [state, setState] = useState<AppState>('hero');
  const [design, setDesign] = useState<PowerSupplyDesign | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleGetStarted = () => {
    setState('input');
    // Scroll to form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (requirements: PowerSupplyRequirements) => {
    setState('loading');

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate design (in production, this would call the AI API)
    const generatedDesign = generateMockDesign(requirements);
    setDesign(generatedDesign);
    setState('results');
  };

  const handleBackToInput = () => {
    setState('input');
    setDesign(null);
  };

  return (
    <main className="min-h-screen bg-background">
      {state === 'hero' && <HeroSection onGetStarted={handleGetStarted} />}

      {state === 'input' && (
        <div className="min-h-screen flex items-center justify-center py-12">
          <RequirementsForm onSubmit={handleSubmit} isLoading={false} />
        </div>
      )}

      {state === 'loading' && <LoadingOverlay />}

      {state === 'results' && design && (
        <>
          <DesignResults
            design={design}
            onBack={handleBackToInput}
            onOpenChat={() => setIsChatOpen(true)}
          />
          <AIChat design={design} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
      )}
    </main>
  );
};

export default Index;
