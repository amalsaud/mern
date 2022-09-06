import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import myStyles from "./styles.module.css";

const Dashboard = (props) => {
    const [petsList, setPetsList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
            .then((res) => {
                console.log(res.data);
                setPetsList(res.data);
            })
            .catch((err) => { console.log(err); })
    }, []);

    return (
        <div className={myStyles.sub}>
            <h1>Pet Shelter</h1>
            <Link to="/new">add a pet to the shelter</Link>
            <h3>Theese pets are looking for a good home</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        petsList.map((pet, index) => {
                            return (
                                <tr key={pet}>
                                    <td>{pet.petName}</td>
                                    <td>{pet.petType}</td>
                                    <td>
                                        <Link to={`/${pet._id}`} className="m-4">
                                            details
                                        </Link>
                                        <Link to={`/edit/${pet._id}`} className="m-4">
                                            edit
                                        </Link>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard;