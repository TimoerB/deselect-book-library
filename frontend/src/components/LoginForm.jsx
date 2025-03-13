import React from "react";

export const LoginForm = ({handleLogin, setEmail, setPassword}) => {
  return (
    <><h2>Please sign in</h2>
      <form onSubmit={handleLogin}>
        <input type={"email"} placeholder={"Email"} onChange={e => setEmail(e.target.value)}/>
        <input type={"password"} placeholder={"Password"} onChange={e => setPassword(e.target.value)}/>
        <button type={"submit"}>Login</button>
      </form>
    </>
  )
}
