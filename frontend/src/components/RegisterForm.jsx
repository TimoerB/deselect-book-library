import React from 'react';

export const RegisterForm = ({handleRegister, setEmail, setPassword, setUsername}) => {
  return (
    <>
      <h2>Please sign up</h2>
      <form onSubmit={handleRegister}>
        <input type={"text"} placeholder={"Username"} onChange={e => setUsername(e.target.value)}/>
        <input type={"email"} placeholder={"Email"} onChange={e => setEmail(e.target.value)}/>
        <input type={"password"} placeholder={"Password"} onChange={e => setPassword(e.target.value)}/>
        <button type={"submit"}>Register</button>
      </form>
    </>
  )
}
