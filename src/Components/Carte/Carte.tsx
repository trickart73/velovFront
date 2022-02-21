/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react'
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet'
import L from 'leaflet'
import * as R from 'ramda'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import {
  Grid, Paper, Avatar, Link, Typography,
} from '@mui/material'
import velovIconPng from '../../ressources/BicycleMarkerSymbol.png'

import './Carte.css'
import velovData from '../../data/lastUpdateVelov.json'

export default function Map() {
  const latCenterMap = 45.764043
  const longCenterMap = 4.835659
  const [data, setData] = useState([])
  const [dataActualiseButtonIsClicked, setStationIsClicked] = useState(false)

  const velovIcon = L.icon({
    iconUrl: velovIconPng,
    iconSize: [30, 45], // size of the icon
  })

  const btnStyle = {
    margin: '8px 0',
  }

  const getCurrentUser = () => JSON.parse(localStorage.getItem('user') || '{}')
  const currentUser = getCurrentUser()
  const [isLogIn, setIsLogIn] = useState(false)

  if (currentUser.accessToken !== undefined && isLogIn === false) {
    setIsLogIn(true)
  }

  const stationUpdateGrandLyonURL = 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&SRSNAME=urn:ogc:def:crs:EPSG::4171'
  // const stationInfoURL = 'https://transport.data.gouv.fr/gbfs/lyon/station_information.json'

  const loadJSON = async () => {
    const fetchData = await fetch(stationUpdateGrandLyonURL)
    const responseData = await fetchData.json()
    setData(responseData)
  }

  useEffect(() => {
    setInterval(() => {
      loadJSON()
      //   console.log('data loaded')
    }, 30000) // tous les foutre à la fin
  }, [])

  useEffect(() => {
    loadJSON()
  }, [dataActualiseButtonIsClicked])

  useEffect(() => {
    if (Object.keys(data).length < 0) {
      console.log('no data is charged')
    }
  }, [data])

  return (
    <div className="Map">

      { !isLogIn ? (
        <section>
          <h1>Merci de vous connecter pour accéder à ce service.</h1>
          <br />
        </section>
      ) : (
        <Box
          sx={{ m: 7 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >

          <MapContainer center={[latCenterMap, longCenterMap]} zoom={15}>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {R.pathOr(velovData.features, ['features'], data).map((vlov) => (

              <Marker
                position={[vlov.geometry.coordinates[1], vlov.geometry.coordinates[0]]}
                icon={velovIcon}
              >

                <Popup position={[vlov.geometry.coordinates[1], vlov.geometry.coordinates[0]]}>
                  <div>
                    <h3>{`Station ${vlov.properties.name}`}</h3>
                    <p>{`Vélos disponibles : ${vlov.properties.available_bikes}`}</p>
                    <p>{`Places disponibles : ${vlov.properties.available_bike_stands}`}</p>
                    <p>{`Dernière mise à jour : ${vlov.properties.last_update}`}</p>
                  </div>

                </Popup>

              </Marker>

            ))}

          </MapContainer>

        </Box>
      )}

    </div>
  )
}
