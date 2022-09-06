import React, { useState } from 'react'
import axios from 'axios';
import Form from './Form';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default () => {

    const [pet, setPet] = useState({
        petName: "",
        petType: "",
        petDesc: "",
        skill1: "",
        skill2: "",
        skill3: ""
    });

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // handlers
    const onChangeHandler = e => {
        setPet({ ...pet, [e.target.name]: e.target.value });
    }
    const onSubmitHandler = e => {
        e.preventDefault();
        setErrors([]);
        axios.post('http://localhost:8000/api/pets', pet)
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                const data = err.response.data;
                const errorMessages = [];
                if ("errors" in data) {
                    for (let field in data.errors) {
                        const validationError = data.errors[field];
                        errorMessages.push(validationError.message);
                    }
                }
                setErrors(errorMessages);
            });
    }

    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Pet Shelter</h1>
            <h3>Know a pet needing home?</h3>
            {errors.map((errorMessage, index) => (
                <div className="text-danger" key={index}>Error: {errorMessage}</div>
            ))}
            <Form onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} {...pet} />
        </div>
    )
}

