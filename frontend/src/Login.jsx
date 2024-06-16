import { useState } from "react";
import axios from 'axios';

export default function Login() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setValues((currData) => ({
            ...currData,
            [event.target.name]: event.target.value
        }));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:1234/login', values)
            .then(result => console.log("success"))
            .catch(err => console.log(err));
        setValues({
            email: "",
            password: "",
        });
    }

    return (
        <div className="text-center w-screen">
            <form onSubmit={handleFormSubmit} className="flex flex-col justify-center items-center m-4">
                <input type="email" name='email' value={values.email} onChange={handleChange} placeholder="Enter email" />
                <input type="password" name='password' value={values.password} onChange={handleChange} placeholder="Enter password" />
                <button type="submit">Login</button>
            </form>
            <button>Signup</button>
        </div>
    );
}
