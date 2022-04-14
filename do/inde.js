"use strict";

const express= require('express');
const puppeteer = require('puppeteer')

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', function(request, response){
    response.send('bienvenue sur mon serveur');
})
/*

app.get('/nom/:name', function(request, response){
    var age = ''+request.query.age;
    response.send('bienvenue '+ request.params.name+' tu as '+age);
})

app.listen(PORT, function(){
    console.log('Hello :'+ PORT);
})*/

//const puppeteer = require('puppeteer')

const scrap = async () =>{
//async function getVisual() {
    try {
        const URL = 'https://www.fournisseurs-electricite.com/eau/prix-commune'
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()

        await page.goto(URL)
		await page.pdf({ path: 'page.pdf' })
        //await page.screenshot({ path: 'screenshot.png' })
		//const myU = document.querySelector('result');
		//const result = await page.evaluate(() => {
		//let prix = document.querySelector("th").innerText
		
		//return { prix }
		//});
		
		/*const text = page.evaluate(() => document.querySelector('th').textContent);
		console.log(text);*/
		
		// Root Pour calculer la consommation moyenne de gaz par ville
		//app.get('/gaz/nom_officiel_epci/:nom_officiel_epci', (req,res) => {
			//const code = req.params.nom_officiel_epci
			
			//const result = await page.evaluate(()=>{
				//let va = document.querySelector("div").innerText
				//console.log(va);
				//return { va }
		//});
		const recordList = await page.$$eval('table--responsive',(trows)=>{
        let rowList = []    
        trows.forEach(row => {
                let record = {'Ville' : '','prix' :''}
                record.Ville = row.querySelector('td').innerText; // (tr < th < a) anchor tag text contains ville name
                const tdList = Array.from(row.querySelectorAll('td'), column => column.innerText); // getting textvalue of each column of a row and adding them to a list.
                record.prix = tdList[0];   
                if(tdList.length >= 3){         
                    rowList.push(record)
                }
            });
        return rowList;
		})
		console.log(recordList);
		
		
		fs.writeFile('eau.json',JSON.stringify(recordList, null, 2),(err)=>{
        if(err){console.log(err)}
        else{console.log('Saved Successfully!')}
		})
		//};
		scrap()
		
		
		/*const a = []//création du tableau
		for (var i = 0; i < gazs.length; i++) {
			const result = await page.evaluate(()=>{
				let va = document.querySelector("th").innerText
					if (va === code ) {
						a.push(gazs[i].consommation);
			}

		}
		
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

}*/
		
		//console.log(myU);
		/*fetch('result')
		.then(function(response) {
		return response.blob();
		})*/

      /*  await browser.close()
    } catch (error) {
        console.error(error)
    }
}

getVisual()*/


/*
const recordList = await page.$$eval('table--responsive',(trows)=>{
        let rowList = []    
        trows.forEach(row => {
                let record = {'ville' : '','prix' :''}
                record.ville = row.querySelector('td').innerText; // (tr < th < a) anchor tag text contains ville name
                const tdList = Array.from(row.querySelectorAll('td'), column => column.innerText); // getting textvalue of each column of a row and adding them to a list.
                record.prix = tdList[0];   
                if(tdList.length >= 3){         
                    rowList.push(record)
                }
            });
        return rowList;
    })
    console.log(recordList);*/
	

app.listen(PORT, function(){
    console.log('Hello :'+ PORT);
})