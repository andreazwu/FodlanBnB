import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import * as sessionActions from "../../store/session"

import "./SignupForm.css"

function SignupFormPage({onClose, setShowSignupModal}) {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastname] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState([])

  const currentUser = useSelector((state) => state.session.user)

  if (currentUser) {
    // dispatch(sessionActions.login({ email, password }))
    return <Redirect to="/" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      setErrors([])
      return await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        // .then(() => setShowSignupModal(false))
        .catch(async (res) => {
            const data = await res.json()
            const errArr = Object.values(data.errors)
            if (data && errArr.length) setErrors(errArr)
          })
        .then(onClose)
    }
    return setErrors(["Please Confirm Password"])
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
      </button>

      <ul>
        {errors.length > 0 &&
        errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button id="signup-button" type="submit">Sign Up</button>
    </form>
  )
}

export default SignupFormPage
