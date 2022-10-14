const assert = require('assert');
const { Builder, Browser, By, Key } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        await driver.manage().window().maximize();
        await driver.get('https://www.elevenia.co.id/');
        const searchBox = driver.findElement(By.id('AKCKwd'));
        await searchBox.sendKeys('komputer', Key.ENTER);

        const sortByProductTerlaris = driver.findElement(By.css('#searchCondition_wrap > div.sort_wrap > ul > li:nth-child(2) > a'));
        await sortByProductTerlaris.click();
        await driver.sleep(3000);

        const firstProduct =  driver.findElement(By.css('.albumList.revampList:first-child .itemList:first-child'));
        await firstProduct.click();

        const incrementQtyButton = driver.findElement(By.css('body > section > section > form:nth-child(2) > div.compWrap.card > div.gridC > div.productOrder.optionArea > div > ul:nth-child(2) > li > div > div > button.ico_btnType.incre'));
        await incrementQtyButton.click();
        await incrementQtyButton.click();

        const tambahkanKeCartButton = driver.findElement(By.css('.btnStyle.btnFlat.btnL.btnOrangeW'));
        const tambahKeCartPopUpYaButton = driver.findElement(By.css('#mo_lay144 > div.btnC > a.btnStyle.btnS.btnRed'));
        await tambahkanKeCartButton.click();
        await driver.sleep(1000);
        await tambahKeCartPopUpYaButton.click();

        const ubahKurirButton = driver.findElement(By.css('td.terms > a.btnStyle.btnS.btnWGray'));
        await ubahKurirButton.click();
        await driver.sleep(1000)

        const iframe = driver.findElement(By.css('#ifrLayer'));
        await driver.switchTo().frame(iframe);
        const ubahKurirPopUpBatalButton =  driver.findElement(By.css('#frm > article > p.btnC > a.btnStyle.btnM.btnWGray'));
        await ubahKurirPopUpBatalButton.click();
        await driver.switchTo().defaultContent();
        await driver.sleep(1000)

        const hapusButton = driver.findElement(By.css('td.btn.cartfont > a.btnStyle.btnS.btnWGray'))
        await hapusButton.click();
        await driver.sleep(1000)
        const hapusPopUpOkButton = driver.findElement(By.css('#chkDelPopY'));
        await hapusPopUpOkButton.click();

        let cartKosongText = await driver.findElement(By.css('#frmTmall > table > tbody > tr > td > strong')).getText();
        assert.equal(cartKosongText, 'Tidak ada produk di Shopping Cart.');
    } finally {
        await driver.quit();
    }
})();