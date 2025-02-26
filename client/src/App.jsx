import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import SidePanel from "./components/SidePanel";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddItemForm />} />
        <Route path="/items" element={<ItemList />} />
        {/* Add other routes as needed */}
        <Route path="*" element={<div className="p-4">Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
