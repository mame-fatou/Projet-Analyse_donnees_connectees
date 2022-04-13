const express = require('express') // importer le module
const app = express()
const PORT = process.env.PORT || 3000
const gazs = require('./Data/conso-gaz-metropole.json')






app.get('/gaz', (req,res) => {
    res.status(200).json(gazs)
})

// Root Pour calculer la consommation moyenne de gaz par ville
app.get('/gaz/fields/:nom_officiel_epci', (req,res) => {
    const code = req.params.nom_officiel_epci
    let sum =0;
// n compte le nombre de fois que la ville recherchée est apparue
    let n=0;
    const a = []
    for (var i = 0; i < gazs.length; i++) {
        if (gazs[i].fields.nom_officiel_epci === code ) {
            a.push(gazs[i].fields.consommation);
            sum = sum + gazs[i].fields.consommation;
            n =n+1;
  }

}
    const moyenne = sum/n;
    res.status(200).json("la consommation moyenne de gaz de " +code+ " est de " +moyenne)
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

app.listen(PORT,()=>{
    console.log('serveur en marche ')
})

    //const date = parseInt(req.params.fields.date)
   // const parking = parkings.find(parking => parking.date === date)
