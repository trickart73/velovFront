import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

function Profile() {
  const getCurrentUser = () => JSON.parse(localStorage.getItem('user') || '{}')
  const currentUser = getCurrentUser()
  const [isLogIn, setIsLogIn] = useState(false)
  //   console.log(isLogIn)

  if (currentUser.accessToken !== undefined && isLogIn === false) {
    // console.log(currentUser.accessToken)
    setIsLogIn(true)
    // console.log(isLogIn)
  }

  const btnStyle = {
    margin: '8px 0',
  }

  const logout = () => {
    // console.log('logout')
    localStorage.removeItem('user')
    // window.location.reload()
  }

  const stringCurrentUserRoles = currentUser.roles
  let stringAcces = ''
  if (stringCurrentUserRoles.includes('ROLE_USER')) {
    if (stringAcces.includes('modérateur') || stringAcces.includes('administrateur')) {
      stringAcces = stringAcces.concat('/', ' utilisateur ')
    } else {
      stringAcces = stringAcces.concat('', ' utilisateur ')
    }
  }
  if (stringCurrentUserRoles.includes('ROLE_MODERATOR')) {
    if (stringAcces.includes('utilisateur') || stringAcces.includes('administrateur')) {
      stringAcces = stringAcces.concat('/', ' modérateur ')
    } else {
      stringAcces = stringAcces.concat('', ' modérateur ')
    }
  }
  if (stringCurrentUserRoles.includes('ROLE_ADMIN')) {
    if (stringAcces.includes('utilisateur') || stringAcces.includes('modérateur')) {
      stringAcces = stringAcces.concat('/', ' administrateur ')
    } else {
      stringAcces = stringAcces.concat('', ' administrateur ')
    }
  }

  return (
    <div className="profile">
      { !isLogIn ? (
        <section>
          <h1>Vous n'êtes pas connecté !</h1>
          <br />
        </section>
      ) : (
        <div>
          <p>
            {' '}
            Bienvenue
            {' '}
            <strong>
              { currentUser.username}
            </strong>
            {' '}
            ,vous êtes connecté !
            {' '}

          </p>

          <p>
            <strong>Votre token personnel :</strong>
            {' '}
            {currentUser.accessToken.substring(0, 20)}
            {' '}
            ...
            {' '}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>

          <p>
            <strong>Votre mail :</strong>
            {' '}
            {currentUser.email}
          </p>
          <p>
            <strong>Vos accès :</strong>
            {' '}
            {stringAcces}
          </p>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnStyle}
            onClick={logout}
            component={Link}
            to="/login"
          >
            Se déconnecter
            {' '}

          </Button>
        </div>
      ) }

    </div>
  )
}
export default Profile
