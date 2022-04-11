const express = require('express')
const app = express()
const parkings = require('./parkings.json')

app.get('/parkings', (req,res) => {
    res.status(200).json(parkings)
})

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

app.get('/parkings/:identifiant', (req,res) => {
    const identifiant = parseInt(req.params.identifiant)
    const parking = parkings.find(parking => parking.identifiant === identifiant)
    res.status(200).json(parking)
})

app.get('/parkings/:name', (req,res) => {
    const name = req.params.name
    const parking = parkings.find(parking => parking.name === name)
    res.status(200).json(parking)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})