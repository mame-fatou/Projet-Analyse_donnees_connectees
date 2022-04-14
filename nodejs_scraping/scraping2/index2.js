const puppeteer = require('puppeteer')

async function tutorial() {
   try {
       const URL = 'https://old.reddit.com/r/learnprogramming'
       const browser = await puppeteer.launch()
       const page = await browser.newPage()

       await page.goto(URL)
       let data = await page.evaluate(() => {
           let results = []
           let items = document.querySelectorAll('.thing')
           items.forEach((item) => {
               results.push({
                   url: item.getAttribute('data-url'),
                   title: item.querySelector('.title').innerText,
               })
           })
           return results
       })

       console.log(data)
       await browser.close()

   } catch (error) {
       console.error(error)
   }
}

tutorial()
