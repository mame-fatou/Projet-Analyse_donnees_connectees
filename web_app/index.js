const express = require('express') // importer le module
const app = express()

const csv =require('csv-parser')
const fs =require('fs')
const results =[];
// Telechargement de données de la Consommation mensuelle brute de gaz des grandes Métropoles françaises

fs.createReadStream('gaz.csv')
  .pipe(csv({}))
  .on('data',(data) =>results.push(data))
  .on('end',() =>{
  console.log(results);
  })


// Accés a l'API openweathermap

const axios = require('axios').default

const lat = 31.63
const lon = -8.14
const api_key = "0e4d74900adb00bf2730328875c55b09"

app.get('/',(req,res)=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    .then(response => {
        res.json(response.data)
    })
    .catch(Error => {
        console.log(Error.message)
    })
})


// serveur

app.listen(3000,()=>{
    console.log('serveur depuis en marche ')
})
