import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const Detail = (props) => {
    const [pet, setPet] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => setPet(res.data))
            .catch(err => console.log(err))
    }, [id]);

    const { removeFromDom } = props;

    const adoptPetHandler = (petId) => {
        axios.delete('http://localhost:8000/api/pets/' + petId)
            .then(res => {
                removeFromDom(petId)
            })
            .catch(err => console.log(err));
        navigate('/')
    }

    const likeHandler = (id) => {
        axios
            .put(`http://localhost:8000/api/pets/${id}`, { ...pet, likes: pet.likes + 1, })
            .then((res) => {
                setPet({
                    petName: pet.petName,
                    petType: pet.petType,
                    petDesc: pet.petDesc,
                    skill1: pet.skill1,
                    skill2: pet.skill2,
                    skill3: pet.skill3,
                    likes: pet.likes + 1
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Link to="/">Home</Link>
            <button onClick={(e) => { adoptPetHandler(pet._id) }} type="submit" className="btn btn-danger m-4">Adopt {pet.petName}</button>
            <h1>Pet Shelter</h1>
            <h3>Details about: {pet.petName}</h3>
            <p>Pet Type: {pet.petType}</p>
            <p>Description: {pet.petDesc}</p>
            <p>Skills: {pet.skill1} {pet.skill2} {pet.skill3}</p>
            <button onClick={(e) => {
                e.target.disabled = true;
                likeHandler(pet._id);
            }} type="submit" className="btn btn-success m-4">Like {pet.petName}</button>
            <span className="m-4"> {pet.likes} like(s)</span>
        </div>
    )
}

export default Detail;