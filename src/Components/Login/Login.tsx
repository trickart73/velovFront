/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useRef, useState, useEffect, useContext,
} from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {
  Grid, Paper, Avatar, Link, Typography,
} from '@mui/material'
import { useNavigate, useLocation, Link as LnkRouter } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import 'typeface-roboto'

import axios from 'axios'

import './Login.css'

export default function Login() {
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const form = useRef()
  const checkBtn = useRef()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const getCurrentUser = () => JSON.parse(localStorage.getItem('user') || '{}')
  const currentUser = getCurrentUser()
  const [isLogIn, setIsLogIn] = useState(false)
  console.log('isLogIn', isLogIn)

  if (currentUser.accessToken !== undefined && isLogIn === false) {
    console.log(currentUser.accessToken)
    setIsLogIn(true)
    console.log('isLogIn', isLogIn)
  }

  // const [user, setUser] = useState('')
  // const [pwd, setPwd] = useState('')

  // const getAxios = () => {
  //   axios.get('http://192.168.1.168:8080/')
  //     .then((response) => {
  //       console.log(response)
  //     })
  // }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const data = {
      username: user,
      password: pwd,
    }

    try {
      const response = await axios.post('http://192.168.1.168:8080/api/auth/signin', data) // keyrus : 10.8.96.114 //morel : 192.168.1.168
      console.log(response)
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      // console.log(accessToken)
      localStorage.setItem('user', JSON.stringify(response.data))

      setUser('')

      setPwd('')
      setSuccess(true)
      setIsLogIn(true)
    } catch (err) {
      console.log(err)
    }
  }

  const login = () => {
    const data = {
      username: user,
      password: pwd,
    }
    axios.post('http://10.8.96.114:8080/api/auth/signin', data) // keyrus : 10.8.96.114 //morel : 192.168.1.168
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  const handleChangeUsername = (event:any) => {
    setUser(event.target.value)
  }

  const handleChangePassword = (event:any) => {
    setPwd(event.target.value)
  }

  const paperStyleCenter = {
    padding: 20,
    height: '70vh',
    width: 280,
    margin: '20px auto',
  }

  const avatarStyle = {
    backgroundColor: 'green',
  }

  const btnStyle = {
    margin: '8px 0',
  }

  useEffect(() => {
    if (userRef.current !== null) {
      userRef.current!.focus()
    }
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  return (
    <div className="login">
      {isLogIn ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
        </section>
      ) : (
        <Grid>
          <h2 ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</h2>
          <Paper elevation={10} style={paperStyleCenter}>
            <Grid container justifyContent="center" alignItems="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <h2> Sign In</h2>
            <TextField
              onChange={handleChangeUsername}
              value={user}
              required
              ref={userRef}
              autoComplete="off"
              id="username"
              label="Nom d'utilisateur"
              variant="standard"
              placeholder="Entrer le nom d'utilisateur"
              fullWidth
            />
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
            />
            <FormControlLabel control={<Checkbox />} label="Se rappeler de moi" />
            <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} onClick={handleSubmit}>Sign In </Button>
            <Typography>
              <Link href="#">
                Forgot password ?
              </Link>
            </Typography>
            <Typography>
              Do you have an account ?
              <Link href="#">
                Sign up
              </Link>
            </Typography>

            <div>
              {user}
              {pwd}
            </div>

          </Paper>
        </Grid>
      ) }

      {/* <form>
        <label>
          <p />
          <TextField required id="username" label="Nom d'utilisateur" variant="outlined" />
        </label>
        <label>
          <p />
          <TextField required id="password" label="Mot de passe" variant="outlined" />
        </label>
        <div>
          <p />
          <Button variant="contained">Submit</Button>
        </div>
        <div>
          <p />
          <Button variant="outlined">Créer un compte</Button>
        </div>
      </form> */}

    </div>

  )
}
