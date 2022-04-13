const express = require('express') // importer le module
const app = express()
const PORT = process.env.PORT || 3000
const gazs = require('./Data/conso-gaz-metropole.json')





app.get('/gaz', (req,res) => {
    res.status(200).json(gazs)
})

// Root Pour calculer la consommation moyenne de gaz par ville
app.get('/gaz/nom_officiel_epci/:nom_officiel_epci', (req,res) => {
    const code = req.params.nom_officiel_epci
    let sum =0;
// n compte le nombre de fois que la ville recherchée est apparue
    let n=0;
    const a = []
    for (var i = 0; i < gazs.length; i++) {
        if (gazs[i].nom_officiel_epci === code ) {
            a.push(gazs[i].consommation);
            sum = sum + gazs[i].consommation;
            n =n+1;
  }

}
    const moyenne = sum/n;
    res.status(200).json("la consommation moyenne de gaz de " +code+ " est de " +moyenne)
})

// Accés a l'API openweathermap

const axios = require('axios').default

app.get('/records/fields/:com_arm_name',(req,res)=>{
    
    const code = req.params.com_arm_name
    
    axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=prix-des-carburants-j-1&q=&facet=cp&facet=pop&facet=com_arm_name&facet=automate_24_24&facet=fuel&facet=shortage&facet=update&facet=services&facet=brand&facet=epci_code&facet=epci_name&facet=dep_code&facet=dep_name&facet=reg_code&facet=reg_name&rows=800`)
    .then(response => {
        var a = []
        for (var i = 0; i < response.data.records.length; i++) {
            if (response.data.records[i].fields.com_arm_name === code ){
                a.push(response.data.records[i].fields.reg_code)
            } 
        }
        res.status(200).json(a)
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
