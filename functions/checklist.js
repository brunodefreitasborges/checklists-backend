const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const dotenv = require('dotenv').config();

exports.handler = async function(event, context) {

    const login = process.env.LOGIN;
    const usuario = process.env.USUARIO;
    const senha = process.env.SENHA;

    
    const querystring = event.queryStringParameters;
    const placa = querystring.placa ;

    console.log(placa)

    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
        headless: true
    });

    const page = await browser.newPage();
    page.setDefaultTimeout(30000)
    page.setDefaultNavigationTimeout(30000)
    
    await page.goto('https://gslog.gservice.com.br/DeBraSys/gli01/cgi-bin/glisys.cgi?proc=login&ctr=00291');

     //login
     await console.log('Fazendo login...')
     await page.waitForSelector('input[id="ccl"]')
     await page.focus('input[id="ccl"]');
     await page.keyboard.type(login)
     await page.focus('input[id="usu"]');
     await page.keyboard.type(usuario)
     await page.focus('input[id="snh"]');
     await page.keyboard.type(senha)
     await page.click('input[value="Entrar"]')
     await page.waitForNavigation()

    //Navega até os Checklists
    await page.goto('https://gslog.gservice.com.br/DeBraSys/gli01/cgi-bin/glisys.cgi?proc=cli234')
    await console.log('Pesquisando checklists...')

    //Buscar a Placa
    await page.waitForSelector('input[id="pl"]')
    await page.type('input[id="pl"]', placa)
    await page.keyboard.press('Enter');

    await page.waitForSelector('img[id="image1"]')

    const checklist = await page.evaluate(() => {

        console.log('Fazendo evaluate')
        const checklist = document.querySelector('#image1').title;

        return checklist;
    })

    await browser.close();

    return {
        statusCode: 200,
        body: JSON.stringify({
            placa,
            checklist
        }),
        headers: {
            "access-control-allow-origin": "*",
          }
    }
}