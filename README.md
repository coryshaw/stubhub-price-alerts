# StubHub Ticket Scraper and SMS Alert

This is a simple Node.js script that scrapes ticket prices from StubHub for a specific event and sends an SMS alert if the price is below a predefined threshold. The script uses Puppeteer for web scraping and Puppeteer-Extra-Plugin-Stealth to avoid being blocked by anti-bot measures. The SMS is sent using a custom `sendSMS` function.

## Dependencies

- puppeteer-extra
- puppeteer-extra-plugin-stealth
- dotenv

## Installation

1. Clone this repository:

```
git clone https://github.com/yourusername/stubhub-ticket-scraper.git
cd stubhub-ticket-scraper
```

2. Install the required dependencies:

```
npm install
```

3. Create a `.env` file in the project root directory and add the following environment variables:

```
PRICE_ALERT_THRESHOLD=<price_threshold_for_alerts>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_ACCT_SID=<your_twilio_account_sid>
TWILIO_PHONE_NUMBER=<your_twilio_account_phone_number>
ALERT_TEXT_SEND_TO_PHONE_NUMBER=<your_phone_number_to_receive_alerts>
```

Replace `<your_scraper_api_key>` with your Scraper API key and `<price_threshold_for_alerts>` with the desired price threshold for sending SMS alerts (e.g., 150).

4. Configure the `sendSMS` function in the `sendSMS.js` file. You can use any SMS service like Twilio, Nexmo, or Plivo. Make sure to include any necessary API keys and phone numbers.

## Usage

1. Modify the `url1` variable in the main script to point to the desired StubHub event page.

2. Adjust the `scrapeFrequency` variable to set the desired interval between scrapes (e.g., 60000 milliseconds for 1 minute).

3. Run the script:

```
node scrapStubhub.js
```

The script will start scraping the StubHub event page at the specified interval. If the ticket price is below the threshold set in the `.env` file, it will send an SMS alert with the price and event URL so you can quickly act on purchasing tickets.

## Disclaimer

Please note that this project is for educational purposes only. Always comply with StubHub's terms of service and respect the websites you are scraping.
