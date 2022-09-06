import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';

const Main = (props) => {
    const [pets, setPets] = useState([]);
    const removeFromDom = petId => {
        setPets(pets.filter(pet => pet._id !== petId));
    }
    return (
        <div>
            <Dashboard pets={pets} setPets={setPets} removeFromDom={removeFromDom} />
        </div>
    )
}
export default Main;