import { useState } from "react";
import { GoogleGeminiEffectDemo } from "./Home";
import Portfolio1 from "./Portfolio1";
import VehicleDetails from "./components/VehicleDetails";

function App() {
  const [count, setCount] = useState(0);
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio', 'vehicle-details'
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [calculatorData, setCalculatorData] = useState({
    model: "",
    downPayment: "",
    tenure: "",
    interestRate: "10.5",
  });

  const handleNavigate = (view, vehicleId = null) => {
    setCurrentView(view);
    if (vehicleId) {
      setSelectedVehicleId(vehicleId);
    }
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Conditional Rendering based on current view */}
      {currentView === 'portfolio' && (
        <Portfolio1 
          onNavigate={handleNavigate}
          setCalculatorData={setCalculatorData}
        />
      )}
      
      {currentView === 'vehicle-details' && selectedVehicleId && (
        <VehicleDetails
          vehicleId={selectedVehicleId}
          setCalculatorData={setCalculatorData}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}

export default App;