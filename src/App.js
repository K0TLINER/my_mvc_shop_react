import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./component/Header";
import Router from "./component/Router";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header /> {/* Header 컴포넌트를 추가합니다. */}
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
