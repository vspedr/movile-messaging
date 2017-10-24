# movile-messaging 📲

[![Greenkeeper badge](https://badges.greenkeeper.io/vspedr/movile-messaging.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/movile-messaging.svg)](https://badge.fury.io/js/movile-messaging)
[![Code Climate](https://codeclimate.com/github/vspedr/movile-messaging/badges/gpa.svg)](https://codeclimate.com/github/vspedr/movile-messaging)
[![Known Vulnerabilities](https://snyk.io/test/github/vspedr/movile-messaging/badge.svg)](https://snyk.io/test/github/vspedr/movile-messaging)
[![Build Status](https://travis-ci.org/vspedr/movile-messaging.svg?branch=master)](https://travis-ci.org/vspedr/movile-messaging)


### Unofficial Node.js wrapper for [Movile's SMS Messaging API](http://doc-messaging.movile.com/sms-v1.html).

** Read carefully through Movile Messaging's official documentation (link above) before using this module. It will *NOT* attempt to validate or sanitize your parameters before sending requests, so make sure you're sending what they are expecting to receive. **

You will need your own `UserName` and `AuthenticationToken` to make API calls.

Note that most optional parameters are missing in this module, I'm working on it. PR's are welcome as well 😉

## Usage example:
```js
const Movile = require('movile-messaging');
const sms = new Movile('YOUR_USER_NAME', 'YOUR_AUTH_TOKEN');

sms.getStatus('9cb87d36-79af-11e5-89f3-1b0591cdf807')
.then(response => console.log(response.data))   // do something with this data
.catch(err => console.error(err));              // your error handling

```

## Methods:
### send(destination, messageText)
Send SMS message to a single endpoint.
* `destination`: Phone number with country code and area code. Example: `'5519998765432'`
* `messageText`: The message string to be sent. If it's too long, it will be split into multiple messages.

Example:
```js
sms.send('5519998765432', 'Your text here')
.then(response => console.log(response.data))   // do something with this data
.catch(err => console.error(err));              // your error handling
```

Expected response body:
```json
{
  "id":"9cb87d36-79af-11e5-89f3-1b0591cdf807"
}
```


### sendBulk(numbers, messageText)
Send the same SMS message to many endpoints at once.
* `numbers`: Array of phone numbers, just like `destination` in the `send` method.
* `messageText`: The message string to be sent. If it's too long, it will be split into multiple messages.

Example:
```js
sms.sendBulk(['5519988887777', '5535989890000'], 'Your text here')
.then(response => console.log(response.data))   // do something with this data
.catch(err => console.error(err));              // your error handling
```

Expected response body:
```json
{
  "id":"317b925a-79b0-11e5-82d3-9fb06ba220b3",
  "messages":[
    {
      "id":"715773da-79b0-11e5-afc8-dfdd0dedf87a"
    },
    {
      "id":"717fb4bc-79b0-11e5-819e-57198aac792e"
    }
  ]
}
```


### getStatus(id)
Check the delivery status of a single message.
* `id`: ID of a message, obtained when it is sent.

Example:
```js
sms.getStatus('8f5af680-973e-11e4-ad43-4ee58e9a13a6')
.then(response => console.log(response.data))   // do something with this data
.catch(err => console.error(err));              // your error handling
```

Expected response body:
```json
{
  "id":"8f5af680-973e-11e4-ad43-4ee58e9a13a6",
  "carrierId":5,
  "carrierName":"TIM",
  "destination":"5519900001111",
  "sentStatusCode":2,
  "sentStatus":"SENT_SUCCESS",
  "sentStatusAt":1420732929252,
  "sentStatusDate":"2015-01-08T16:02:09Z",
  "deliveredStatusCode":4,
  "deliveredStatus":"DELIVERED_SUCCESS",
  "deliveredAt":1420732954000,
  "deliveredDate":"2015-01-08T16:02:34Z",
  "campaignId":1234
}
```

### listReceived()
Retrieve messages sent to your LA's (i. e. a client replied to your SMS).

Example:
```js
sms.listReceived()
.then(response => console.log(response.data))   // do something with this data
.catch(err => console.error(err));              // your error handling
```

Expected response body:
```json
{
  "total": 1,
  "start": "2016-09-04T11:12:41Z",
  "end": "2016-09-08T11:17:39.113Z",
  "messages": [
    {
      "id": "25950050-7362-11e6-be62-001b7843e7d4",
      "subAccount": "iFoodMarketing",
      "campaignAlias": "iFoodPromo",
      "carrierId": 1,
      "carrierName": "VIVO",
      "source": "5516981562820",
      "shortCode": "28128",
      "messageText": "Eu quero pizza",
      "receivedAt": 1473088405588,
      "receivedDate": "2016-09-05T12:13:25Z",
      "mt": {
        "id": "8be584fd-2554-439b-9ba9-aab507278992",
        "correlationId": "1876",
        "username": "iFoodCS",
        "email": "customer.support@ifood.com"
      }
    },
    {
      "id": "d3afc42a-1fd9-49ff-8b8b-34299c070ef3",
      "subAccount": "iFoodMarketing",
      "campaignAlias": "iFoodPromo",
      "carrierId": 5,
      "carrierName": "TIM",
      "source": "5519987565020",
      "shortCode": "28128",
      "messageText": "Meu hamburguer está chegando?",
      "receivedAt": 1473088405588,
      "receivedDate": "2016-09-05T12:13:25Z",
      "mt": {
        "id": "302db832-3527-4e3c-b57b-6a481644d88b",
        "correlationId": "1893",
        "username": "iFoodCS",
        "email": "customer.support@ifood.com"
      }
    }
  ]
}
```

### searchReceived(start, end)
Search for messages received in a time interval (between `start` and `end`, as one would expect).
* `start`: ISO8601-formatted string. Defaults to 5 days ago from current date.
* `end`: ISO8601-formatted string. Defaults to current date.

Example:
```js
sms.listReceived('2016-09-04T11:12:41Z', '2016-09-08T11:17:39.113Z')
```

Expected response body: *same format as listReceived()*


* Note that phone numbers from `OI` and `Sercomtel` carriers will not return `DELIVERED_SUCCESS` status even if the SMS was successfully received.
* Data is only retained in Movile's end for a few days, so you may want to store this data somewhere else.

Special thanks to [@mCodex](https://github.com/mCodex/)
