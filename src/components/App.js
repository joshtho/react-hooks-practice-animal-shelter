import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const url = "http://localhost:3001/pets"
  function handleChangeType(e) {
    setFilters({type: e.target.value})
  }

  function handleFindPets() {
    if(filters.type === "all"){
      fetch(url)
      .then(r => r.json())
      .then(data => setPets(data))
    }else{
      fetch(url)
      .then(r => r.json())
      .then(data => setPets(data.filter(pet => pet.type === filters.type)))
    }
  }

  function handleAdoptPet(id) {
   setPets(pets.find(pet => pet.id === id ? {...pet, isAdopted : true} : pet))
  }

  // function handleAdoptPet(id) {
  //   const updatedPets = pets.map((pet) => {
  //     return pet.id === id ? { ...pet, isAdopted: true } : pet;
  //   });
  //   setPets(updatedPets);
  // }
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={handleFindPets} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
