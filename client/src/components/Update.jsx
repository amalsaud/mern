import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Form from './Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {

    const [pet, setPet] = useState({
        petName: "",
        petType: "",
        petDesc: "",
        skill1: "",
        skill2: "",
        skill3: ""
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);

    // useEffect
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`).then(res => { setPet(res.data) })
    }, [])

    // handlers
    const onChangeHandler = e => {
        setPet({ ...pet, [e.target.name]: e.target.value });
    }
    const onSubmitHandler = e => {
        e.preventDefault();
        setPet(false);
        setErrors([]);
        axios.put(`http://localhost:8000/api/pets/${id}`, pet)
            .then(res => {
                navigate('/');
            })
      .catch((err) => {
        console.log(err);
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
            {errors.map((errorMessage, index) => (
                <div className="text-danger" key={index}>Error: {errorMessage}</div>
            ))}
            <Link to="/">Home</Link>
            <h1>Pet Shelter</h1>
            <h3>Edit</h3>
            <Form onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} {...pet} />
        </div>
    )
}

