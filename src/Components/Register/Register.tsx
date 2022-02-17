/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useRef, useState, useEffect, useContext,
} from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import ReactDOM from 'react-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {
  Grid, Paper, Avatar, Link, Typography,
} from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import 'typeface-roboto'
import axios from 'axios'

import './Register.css'

export default function Register() {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
  const MAIL_REGEX = /^[^@]+@keyrus.com$$/
  //   const MAIL_REGEX = /^[^@]+@.+\.\w{2,3}$$/

  // const { setAuth } = useContext(AuthContext);
  const [auth, setAuth] = useState({})
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [mail, setMail] = useState('')
  const [validMail, setValidMail] = useState(false)
  const [mailFocus, setMailFocus] = useState(false)

  const [roles, setRoles] = useState('')

  const [adminIsChecked, setAdminIsChecked] = useState(false)
  const [userIsChecked, setUserIsChecked] = useState(false)
  const [moderatorIsChecked, setModeratorIsChecked] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  //   const transformCheckboxIntoRoles = () => {
  //     setRoles([...roles, {'admin'}])
  //     if (adminIsChecked) {
  //       roles.push('admin')
  //     }
  //     if (userIsChecked) {
  //       roles.push('user')
  //     }
  //     if (moderatorIsChecked) {
  //       roles.push('moderator')
  //     }
  //     console.log(roles)
  //   }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }
    // transformCheckboxIntoRoles()
    const data = {
      username: user,
      email: mail,
      password: pwd,
      roles: [roles],
    }

    try {
      const response = await axios.post('http://10.8.96.114:8080/api/auth/signup', data) // keyrus : 10.8.96.114 //morel : 192.168.1.168
      console.log(response)

      setUser('')
      setPwd('')
      setMail('')
      setSuccess(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeUsername = (event:any) => {
    setUser(event.target.value)
  }

  const handleChangePassword = (event:any) => {
    setPwd(event.target.value)
  }

  const handleChangeMail = (event:any) => {
    setMail(event.target.value)
  }

  const handleChangeRoles = (event:any) => {
    setRoles(event.target.value)
  }

  const handleChangeAdminIsCheck = (event:any) => {
    setAdminIsChecked(!adminIsChecked)
  }

  const handleChangeUserIsCheck = (event:any) => {
    setUserIsChecked(!userIsChecked)
  }

  const handleChangeModeratorIsCheck = (event:any) => {
    setModeratorIsChecked(!moderatorIsChecked)
  }

  const paperStyleCenter = {
    padding: 20,
    height: '80vh',
    width: 280,
    margin: '20px auto',
  }

  const avatarStyle = {
    backgroundColor: 'blue',
  }

  const btnStyle = {
    margin: '8px 0',
  }

  useEffect(() => {
      userRef.current!.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
  }, [pwd])

  useEffect(() => {
    setValidMail(MAIL_REGEX.test(mail))
  }, [mail])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, mail, roles])

  return (
    <div className="login">
      {success ? (
        <section>
          <h1>You are register ! Welcome</h1>
          <br />
        </section>
      ) : (
        <Grid>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
          <Paper elevation={10} style={paperStyleCenter}>
            <Grid container justifyContent="center" alignItems="center">
              <Avatar style={avatarStyle}>
                <LockOpenIcon />
              </Avatar>
            </Grid>
            <h2> Sign up</h2>
            <TextField
              onChange={handleChangeUsername}
              value={user}
              required
              ref={userRef}
              autoComplete="off"
              id="username"
              label="Nom d'utilisateur"
              variant="standard"
              placeholder="Entrer le nom d'utilisateurs"
              fullWidth
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <p id="uidnote" className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <TextField
              onChange={handleChangePassword}
              value={pwd}
              required
              type="password"
              id="password"
              label="Mot de passe"
              variant="standard"
              placeholder="Entrer le mot de passe"
              fullWidth
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a special character.
              <br />
              Allowed special characters:
              {' '}
              <span aria-label="exclamation mark">!</span>
              {' '}
              <span aria-label="at symbol">@</span>
              {' '}
              <span aria-label="hashtag">#</span>
              {' '}
              <span aria-label="dollar sign">$</span>
              {' '}
              <span aria-label="percent">%</span>
            </p>
            <TextField
              onChange={handleChangeMail}
              value={mail}
              required
              id="mail"
              label="Mail"
              variant="standard"
              placeholder="Entrer votre adresse mail"
              fullWidth
              aria-invalid={validMail ? 'false' : 'true'}
              aria-describedby="mailnote"
              onFocus={() => setMailFocus(true)}
              onBlur={() => setMailFocus(false)}
            />
            <p id="mailnote" className={mailFocus && mail && !validMail ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Must contains @keyrus.com
            </p>
            <TextField
              onChange={handleChangeRoles}
              value={roles}
              required
              id="roles"
              label="Role"
              variant="standard"
              placeholder="Entrer votre rôle"
              fullWidth
            />
            <FormControlLabel control={<Checkbox />} label="Moderator" onChange={handleChangeModeratorIsCheck} />
            <FormControlLabel control={<Checkbox />} label="User" onChange={handleChangeUserIsCheck} />
            <FormControlLabel control={<Checkbox />} label="Admin" onChange={handleChangeAdminIsCheck} />
            <Button disabled={!!(!validName || !validPwd || !validMail)} type="submit" color="primary" variant="contained" fullWidth style={btnStyle} onClick={handleSubmit}>Sign Up </Button>
            <div>
              {userFocus}
              {user}
              <br />
              {pwd}
              <br />
              {mail}
              <br />
              {roles}
            </div>

          </Paper>
        </Grid>
      ) }

    </div>

  )
}
