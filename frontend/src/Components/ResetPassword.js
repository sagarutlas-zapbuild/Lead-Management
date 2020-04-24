import React from 'react'
import { useState } from 'react'


function handleSubmit(e,email) {
    e.preventDefault();
    const data = {email: email}
    fetch("http://localhost:8000/reset-password/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: "include"
    }).then(res => alert(res.json));
}


export const ResetPassword = () => {
    const [email, setEmail] = useState("");
    function handleChange(e) {
        setEmail(e.target.value);
    }
    return (<form onSubmit={(e) => handleSubmit(e, email)}>
        <label>Reset Password</label>
        <br />
        <label htmlFor="username" sm={2} size="lg">Email :</label>
        <input type='email' name="email" value={email} onChange={(e) => { handleChange(e); }} />
        <input type='submit' value="submit" />
        <br/>
    </form>)
}