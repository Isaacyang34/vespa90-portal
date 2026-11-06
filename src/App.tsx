import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SpecsSection } from './components/SpecsSection';
import { ManualViewer } from './components/ManualViewer';
import { DiagramSection } from './components/DiagramSection';
import { WiringSection } from './components/WiringSection';
import { OilMixCalculator } from './components/OilMixCalculator';
import { VinChecker } from './components/VinChecker';
import { PartsReference } from './components/PartsReference';
import { MaintenanceChecklist } from './components/MaintenanceChecklist';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('manual');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'specs' && <SpecsSection />}
        {activeTab === 'manual' && <ManualViewer />}
        {activeTab === 'diagrams' && <DiagramSection />}
        {activeTab === 'wiring' && <WiringSection />}
        {activeTab === 'calculator' && <OilMixCalculator />}
        {activeTab === 'vin' && <VinChecker />}
        {activeTab === 'maintenance' && (
          <div className="space-y-16">
            <MaintenanceChecklist />
            <PartsReference />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
