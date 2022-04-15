const express = require('express') // importer le module
const app = express()
const PORT = process.env.PORT || 3000
const puppeteer = require('puppeteer');
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
    let consommation = {}
    const a = []
    for (var i = 0; i < gazs.length; i++) {
        if (gazs[i].nom_officiel_epci === code ) {
           a.push(gazs[i].consommation);
           sum = sum + gazs[i].consommation;
           n =n+1;  }
}
    const moyenne = sum/n;
    consommation.nom=code
    consommation.consommation_moyenne = moyenne
// resultat (consommation) est sous format json
   res.status(200).json(consommation)
})

// Accés a l'API openweathermap

const axios = require('axios').default

app.get('/records/fields/:com_arm_name',(req,res)=>{

    const code = req.params.com_arm_name

    axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=prix-des-carburants-j-1&q=&facet=cp&facet=pop&facet=com_arm_name&facet=automate_24_24&facet=fuel&facet=shortage&facet=update&facet=services&facet=brand&facet=epci_code&facet=epci_name&facet=dep_code&facet=dep_name&facet=reg_code&facet=reg_name&rows=800`)
    .then(response => {
        var carburant = {}
        for (var i = 0; i < response.data.records.length; i++) {
            if (response.data.records[i].fields.com_arm_name === code ){
                carburant.Prix_e10 = response.data.records[i].fields.price_e10
                carburant.Prix_sp98 = response.data.records[i].fields.price_sp98
                carburant.Prix_gplc  = response.data.records[i].fields.price_gplc
                carburant.Prix_gazole = response.data.records[i].fields.price_gazole
                carburant.update  = response.data.records[i].fields.update
                carburant.cp  = response.data.records[i].fields.cp
            }
        }
        res.status(200).json(carburant)

    })
    .catch(Error => {
        console.log(Error.message)
    })
})

// Scrapping du prix du m3 d'eau des plus grandes ville de france

app.get('/PrixEau/',(req,res) => {
(async () => {
    
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(`https://eau.selectra.info/prix-eau`);
	const eau = await page.evaluate(() => {
		let eau = [];
		let elements = document.querySelectorAll('#block-agrippa-content > article > div > div:nth-child(1) > div.table--responsive > table > tbody > tr');
		for (element of elements) {
			eau.push({
				ville: element.querySelector('td:nth-child(1)').innerText,
                prix : element.querySelector('td:nth-child(2)').innerText
			})
		}
		return eau;
	});
    res.send(eau);
	await browser.close();
})();
})

// serveur

app.listen(PORT,()=>{
    console.log('serveur en marche ')
})