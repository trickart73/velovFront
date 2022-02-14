/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
// import ReactDOM from 'react-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {
  Grid, Paper, Avatar, Link, Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import 'typeface-roboto'

import './Login.css'

export default function Login() {
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

  return (
    <div className="login">
      <Grid>
        <Paper elevation={10} style={paperStyleCenter}>
          <Grid container justifyContent="center" alignItems="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <h2> Sign In</h2>
          <TextField required id="username" label="Nom d'utilisateur" variant="standard" placeholder="Entrer le nom d'utilisateur" fullWidth />
          <TextField required type="password" id="password" label="Mot de passe" variant="standard" placeholder="Entrer le mot de passe" fullWidth />
          <FormControlLabel control={<Checkbox />} label="Se rappeler de moi" />
          <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Sign In </Button>
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

        </Paper>
      </Grid>

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
