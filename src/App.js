import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./homepage";     
import AddExpense from "./addexpense";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/" element={<Home />} />
       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
