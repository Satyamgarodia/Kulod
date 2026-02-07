import { useState } from "react";
import { GoogleGeminiEffectDemo } from "./Home";
import Portfolio from "./Portfolio1";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <GoogleGeminiEffectDemo /> */}
      <Portfolio />
    </>
  );
}

export default App;
