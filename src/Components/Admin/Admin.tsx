import React, { useState } from 'react'

function Admin() {
  const getCurrentUser = () => JSON.parse(localStorage.getItem('user') || '{}')
  const currentUser = getCurrentUser()
  const [isLogIn, setIsLogIn] = useState(false)
  const [isAdminLogIn, setIsAdminLogIn] = useState(false)

  if (currentUser.accessToken !== undefined && isLogIn === false) {
    setIsLogIn(true)
    if (Object.values(currentUser.roles).indexOf('ROLE_ADMIN') > -1) {
      setIsAdminLogIn(true)
    }
  }

  return (
    <div className="Admin">
      { !isAdminLogIn ? (
        <section>
          <h1>You are not admin!</h1>
          <br />
        </section>
      ) : (
        <section>
          <h1> Ok admin</h1>

        </section>
      ) }
    </div>
  )
}

export default Admin
