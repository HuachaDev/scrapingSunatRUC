const puppeteer = require('puppeteer');
const url = 'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp';
const fs = require('fs');
const ruc = "20608703692";

(async () => {

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.setViewport({
        width: 1200,
        height: 1200,
        deviceScaleFactor: 1,
      });

    await page.goto(url);
    
    //new Promise(r => setTimeout(r, 7000));

    //Selector de busquedad por RUC
    //await page.waitForSelector('#btnPorRuc').then(() => page.click('#btnPorRuc'));

    const listRuc = [];


    await page.waitForSelector('#txtRuc').then(() => page.type('#txtRuc', ruc));
    await page.waitForSelector('#btnAceptar').then(() => page.click('#btnAceptar'));
    await page.waitForSelector('.col-sm-7 .list-group-item-heading');
    const dataBusinessNname = await page.$eval('.col-sm-7 .list-group-item-heading', element => element.textContent);
    await page.waitForSelector('.col-sm-7 .list-group-item-text');
    const address = await page.$$eval('.col-sm-7 .list-group-item-text', elements => elements[4].textContent.replace(/\s+/g, ' ').trim());
    const businessNname = dataBusinessNname.match(/^(\d+)\s*-\s*(.+)$/);


    var tmp = {};
    tmp.businessNname  = businessNname[2];
    tmp.address = address;

    listRuc.push(tmp);
    console.log(listRuc);
    //await browser.close();
})();