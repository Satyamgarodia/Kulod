import { useState } from "react";
import { GoogleGeminiEffectDemo } from "./Home";
import Portfolio1 from "./Portfolio1";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <GoogleGeminiEffectDemo /> */}
      <Portfolio1 />
    </>
  );
}

export default App;
