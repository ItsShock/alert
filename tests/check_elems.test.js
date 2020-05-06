const Differencify = require("differencify");
const differencify = new Differencify({ mismatchThreshold: 0 });
let urlToTest = "http://127.0.0.1:8080/";

describe("Zadanie nr. 2", () => {
  const timeout = 30000;
  let page;

  beforeAll(async () => {
    await differencify.launchBrowser({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const target = differencify.init({ chain: false });
    page = await target.newPage();
    await page.goto(urlToTest);
    await page.waitFor(1000);
  }, timeout);
  afterAll(async () => {
    await differencify.cleanup();
  });

  it("Importuje plik CSS Bootstrapa", async () => {
    const link = await page.$eval("link", elem => elem.href.indexOf("bootstrap") !== -1);
    expect(link).toBe(true);
  }, timeout);

  it("Umieszczono container Bootstrapowy", async () => {
    const container = await page.$eval(".container", elem => !!elem);
    expect(container).toBe(true);
  }, timeout);
  
  it("Umieszczono alert", async () => {
    const container = await page.$eval(".alert", elem => !!elem);
    expect(container).toBe(true);
  }, timeout);

  it("Alert jest typu 'sukces'", async () => {
    const container = await page.$eval(".alert-success", elem => !!elem);
    expect(container).toBe(true);
  }, timeout);
});
