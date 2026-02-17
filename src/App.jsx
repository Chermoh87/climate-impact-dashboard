import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";


function App() {
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearch = (city) => {
    setSelectedCity(city);
    console.log("Searching for:", city);
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;


