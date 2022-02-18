import React, { useState } from 'react'
import Button from '@mui/material/Button'

function Profile() {
  const getCurrentUser = () => JSON.parse(localStorage.getItem('user') || '{}')
  const currentUser = getCurrentUser()
  const [isLogIn, setIsLogIn] = useState(false)
  console.log(isLogIn)

  if (currentUser.accessToken !== undefined && isLogIn === false) {
    console.log(currentUser.accessToken)
    setIsLogIn(true)
    console.log(isLogIn)
  }

  const btnStyle = {
    margin: '8px 0',
  }

  const logout = () => {
    console.log('logout')
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <div className="profile">
      { !isLogIn ? (
        <section>
          <h1>You are not logged!</h1>
          <br />
        </section>
      ) : (
        <div>
          <p> You are logged</p>
          <strong>
            { currentUser.username}
          </strong>
          <p>
            <strong>Token:</strong>
            {' '}
            {currentUser.accessToken.substring(0, 20)}
            {' '}
            ...
            {' '}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong>
            {' '}
            {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong>
            {' '}
            {currentUser.email}
          </p>
          <p>
            <strong>Roles:</strong>
            {' '}
            {currentUser.roles}
          </p>
          <Button type="submit" color="primary" variant="contained" style={btnStyle} onClick={logout}>Log out </Button>
        </div>
      ) }

    </div>
  )
}
export default Profile
