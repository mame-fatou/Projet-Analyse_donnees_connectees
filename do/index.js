"use strict";

const express= require('express');
const puppeteer = require('puppeteer');

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
	console.log("scrap");
//async function getVisual() {
    try {
		console.log("try");
        const URL = 'https://www.fournisseurs-electricite.com/eau/prix-commune'
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(URL);
		//await page.pdf({ path: 'page.pdf' })
        console.log("goto");
		await page.waitForSelector('div');
		console.log("wait");
		
		const data = await page.evaluate(()=>{
			
			console.log("evaluate");
			const list = []
			//const items = document.querySelectorAll("td");
			const items = document.querySelectorAll("div > td");
			
			console.log("items", items);
			for (const item of items) {
				/*list.push({
					ville: item.querySelector(".ville td").innerHTML
					//console.log(ville)
					})*/
					//console.log("item", item);
			}

		return list
		})
		console.log(data)
		await browser.close()
		} 
		catch (error) {
        console.error(error)
    }

		}
		
		
		scrap()
	

app.listen(PORT, function(){
    console.log('Hello :'+ PORT);
})