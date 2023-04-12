require("dotenv").config();
const sendSMS = require("./sendSMS");

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function scrapeStubHub(url) {
  console.log("scrapeStubHub()");
  console.log("starting puppeteer");
  const browser = await puppeteer.launch({
    args: ["--ignore-certificate-errors"],
    headless: true,
  });
  console.log("creating new page");
  const page = await browser.newPage();
  console.log("visiting page", url);
  await page.goto(url, { timeout: 500000 });
  console.log("page loaded");
  page.on("console", (msg) => {
    console.log("Browser console:", msg.text());
  });
  const ticket = await page.evaluate(() => {
    const element = document.querySelector("[data-listing-id]");

    if (!element) {
      return null;
    }

    const listingId = element.getAttribute("data-listing-id");

    const findPriceElement = (node) => {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent.trim().startsWith("$")
      ) {
        return node.parentNode;
      }

      for (const child of node.childNodes) {
        const result = findPriceElement(child);
        if (result) {
          return result;
        }
      }

      return null;
    };

    const priceElement = findPriceElement(element);

    if (priceElement) {
      const priceText = priceElement.textContent.trim();
      const price = parseFloat(priceText.replace("$", "").replace(",", ""));
      return {
        listingId,
        price,
      };
    }

    return null;
  });

  console.log("closing browser");
  await browser.close();
  console.log("returning ticket");
  return ticket;
}

const scrapeAndAlert = async (url) => {
  const ticket = await scrapeStubHub(url);
  console.log("Stubhub Ticket:", ticket);
  if (ticket && ticket.price < process.env.PRICE_ALERT_THRESHOLD) {
    await sendSMS(ticket.price, url);
  }
};

(async () => {
  const url1 = `https://www.stubhub.com/taylor-swift-denver-tickets-7-14-2023/event/151214616/?quantity=${process.env.NUMBER_OF_SEATS}&estimatedFees=true&selectedEventsList=151214616,150593672`;

  const scrapeInterval = async () => {
    console.log("running scrape");
    scrapeAndAlert(url1);
  };
  // Set the interval to run the scrapeStubHub function every X milliseconds
  // (e.g., 300000 milliseconds = 5 minutes)
  const scrapeFrequency = 60_000;
  setInterval(scrapeInterval, scrapeFrequency);
})();
