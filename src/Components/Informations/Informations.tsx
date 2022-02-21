import React, { useState, useEffect } from 'react'
import UserService from '../../services/user.service'

export default function Informations() {
  const [content, setContent] = useState('')
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data)
      },
      (error) => {
        console.log(error)
        // const _content = (error.response && error.response.data)
        //   || error.message
        //   || error.toString()
        // setContent(_content)
      },
    )
  }, [])

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <h2> Cette application a été développé pour l'entreprise Keyrus.</h2>
      </header>
    </div>
  )
}
