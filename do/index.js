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

async function getVisual() {
    try {
        const URL = 'https://tarifgaz.com/infos-pratiques/trouver-zone-tarifaire'
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()

        await page.goto(URL)
		await page.pdf({ path: 'page.pdf' })
        //await page.screenshot({ path: 'screenshot.png' })
		const myU = document.querySelector('result');
		console.log(myU);
		fetch('result')
		.then(function(response) {
		return response.blob();
		})

        await browser.close()
    } catch (error) {
        console.error(error)
    }
}

getVisual()

app.listen(PORT, function(){
    console.log('Hello :'+ PORT);
})