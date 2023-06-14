import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const { showAlert } = props
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const onchange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2OWM3MmQxNTMwODZiYjgyNGQzMGZmIn0sImlhdCI6MTY4NDc1ODU3OH0.N9UOoW7nPwYcmCfAUNdXPcMXGu_PkMmlA_rB8KG9JQ4',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
    const json = await response.json()
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken)
      navigate('/')
      showAlert('Logged in Successfully', 'success')
    } else {
      showAlert('Invalid Credentials', 'danger')
    }

    console.log(json)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onchange}
            value={credentials.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onchange}
            value={credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
