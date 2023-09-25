import React from "react";
import Header from "./component/common/Header"; // Header 컴포넌트를 import합니다.
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./component/common/Router";
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
