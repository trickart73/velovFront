/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react'
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet'
import * as R from 'ramda'

import './Map.css'
import velovData from '../../data/lastUpdateVelov.json'

function Map() {
  const latCenterMap = 45.764043
  const longCenterMap = 4.835659
  const [data, setData] = useState([]) // init
  const [dataActualiseButtonIsClicked, setStationIsClicked] = useState(false)

  const handleClick = () => {
    console.log('stationIsClicked', dataActualiseButtonIsClicked)
    setStationIsClicked(!dataActualiseButtonIsClicked)
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

      <button type="button" onClick={handleClick}>Actualiser données</button>

      <MapContainer center={[latCenterMap, longCenterMap]} zoom={15}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {R.pathOr(velovData.features, ['features'], data).map((vlov) => (

          <Marker
            position={[vlov.geometry.coordinates[1], vlov.geometry.coordinates[0]]}
          >

            <Popup position={[vlov.geometry.coordinates[1], vlov.geometry.coordinates[0]]}>
              <div>
                <h3>{`Station ${vlov.properties.name}`}</h3>
                <p>{`Last update: ${vlov.properties.last_update}`}</p>
                <p>{`Available_bikes: ${vlov.properties.available_bikes}`}</p>
                <p>{`Available_bike_stands: ${vlov.properties.available_bike_stands}`}</p>
              </div>

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>
  )
}

export default Map
