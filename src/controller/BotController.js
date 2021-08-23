const puppeteer = require('puppeteer');

class BotController{
    async Find(req, res){

        
    const music = req.body.music;
    
    const busca = `https://www.google.com/search?q=musica+${music.replace(/ /g,"+")}+no+youtube&hl=pt-PT&source=hp&ei=kYYhYYCoN6XC5OUPmqeQsAY&iflsig=AINFCbYAAAAAYSGUoWgGrKFPs3ujM9qlOy9tBofG-Niy&oq=musica+${music.replace(/ /g,"+")}+no+youtube&gs_lcp=Cgdnd3Mtd2l6EAMyCAguEIAEEJMCMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOg4ILhCABBDHARCjAhCTAjoLCC4QgAQQxwEQowI6CwguEIAEEMcBENEDOgUILhCABFDaD1jyLGCFL2gBcAB4AIABeYgB_guSAQQ1LjEwmAEAoAEBsAEA&sclient=gws-wiz&ved=0ahUKEwjAtP_8nMPyAhUlIbkGHZoTBGYQ4dUDCAc&uact=5`;
        

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true
    });
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(busca);

    let img;
    let url;
    let title;
    
    try {

        await delay(1000)
        img = await page.evaluate(() => {
            return (document.querySelector(".twQ0Be a img").src)
        });
        url = await page.evaluate(() => {
            return (document.querySelector(".twQ0Be a").href)
        });
        title = await page.evaluate(() => {
            return (document.querySelector(".twQ0Be a img").alt)
        });
        url =  url.replace("watch?v=","embed/")+"?autoplay=1";
        console.log("URL:", url);
        await browser.close();
            
        return res.json({ url: url, title:title, img:img})
    } catch (error) {

        await delay(1000)

            img = await page.evaluate(() => {
                return (document.querySelector(".rISBZc").src)
            });
            
            url = await page.evaluate(() => {
                
               return (document.querySelector(".rGhul").href)
            });
            title = await page.evaluate(() => {
                return (document.querySelector(".rISBZc").alt)
            });
            url =  url.replace("watch?v=","embed/")+"?autoplay=1";
    
            console.log("URL:", url);
            await browser.close();
            return res.json({ url: url, title:title, img:img})


    }
    
    
    }
}
module.exports = new BotController();