import {useState} from "react";
import {Link} from "react-router-dom";
// stylesheet
import classes from "./Register.module.css";

// toastify
import {Flip, toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// react-icons
import { VscError } from 'react-icons/vsc';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmission = async (e) => {
        e.preventDefault();

        const id = toast.loading("Please wait...")

        const response = await fetch (`${process.env.REACT_APP_API_URI}/register`, {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        const json = await response.json();


        if(response.status === 200) {
            toast.update(id, { render: "Registered Successfully", type: "success", isLoading: false, autoClose: 3000, position: "top-right", closeOnClick: true });
        }
        else {
            toast.update(id, { render: "Registration Failed!", type: "error", isLoading: false, autoClose: 3000, position: "top-right", closeOnClick: true });
        }
    }

    return <div className='container'>
        <div className={classes.registerContainer}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmission}>
                <label htmlFor="name">Name*</label>
                <input type="text" name="name" id="name" placeholder="Alex" onChange={(e) => setName(e.target.value)} value={name}/>
                <label htmlFor='email'>Email*</label>
                <input type='email' name='email' id='email' placeholder="alex@email.com" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <label htmlFor='password'>Password*</label>
                <input type='password' name='password' id='password' placeholder="*********" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button className='btn-primary'>Sign Up</button>
                <span>Already have an account? <Link to="/login">Sign In</Link></span>
            </form>
        </div>
        <ToastContainer transition={Flip} autoClose={3000} limit={1}/>
    </div>
}

export default Register;