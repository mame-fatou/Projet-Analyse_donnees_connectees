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
		await page.waitForSelector('div.table--responsive');
		console.log("wait");
		//console.log("items", items);
		
		//await c'est pour récupérer une info
		const data = await page.evaluate(()=>{
			
			console.log("evaluate");
			const list = []
			//const items = document.querySelectorAll("td");
			const items = document.querySelectorAll('div.table--responsive');
			
			//const items = document.querySelectorAll("div.table--responsive:nth-child(15) > table.table.table--bordered > tbody > tr > td");
			//const items = document.querySelectorAll("div.table--responsive:nth-child(15) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > strong:nth-child(1)");
			//const items = document.querySelectorAll("div.table--responsive:nth-child(15) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > strong:nth-child(1)");
			//console.log("items", items);
			for (const item of items) {
				list.push({
					ville: item.querySelector("div.table--responsive:nth-child(19) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > strong:nth-child(1)")?.textContent,
					//prix: item.querySelector("div#block-agrippa-content > article.article > div > h3")?.textContent,
					//pri: item.querySelector("#line1 > span:nth-child(1909)")?.textContent,
					//p: item.querySelector("div.table--responsive:nth-child(15) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > strong:nth-child(1)")?.textContent
					//console.log(ville);
					})
					//console.log("item", item);
					console.log("items", items);
					console.log(list);
					//console.log(data);
			}

		return list
		})
		//console.log(data)
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