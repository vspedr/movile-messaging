# movile-messaging

Node.js wrapper for [Movile's SMS Messaging API](http://doc-messaging.movile.com/sms-v1.html).
You will need your own `UserName` and `AuthenticationToken` to make API calls.
Note that most optional parameters are missing in this module, I'm working on it. PR's are welcome as well 😉

## Usage example:
```
var express = require('express');
var router = express.Router();
var Movile = require('movile-messaging');

/* GET home page. */
router.get('/', function(req, res, next) {
  let sms = new Movile('YOUR_USER_NAME', 'YOUR_AUTH_TOKEN');
  console.log(sms.getStatus('9cb87d36-79af-11e5-89f3-1b0591cdf807'));
  res.render('index', { title: 'Movile Messaging Example' });
});

module.exports = router;
```

## Methods:
### send(destination, messageText)
Send SMS message to a single endpoint.
`destination`: Phone number with country code and area code. Example: `'5519998765432'`
`messageText`: The message string to be sent. If it's too long, it will be split into multiple messages.

Example:
```
sms.send('5519998765432', 'Your text here');
```

Expected return:
```
{
  "id":"9cb87d36-79af-11e5-89f3-1b0591cdf807"
}
```


### sendBulk(numbers, messageText)
Send the same SMS message to many endpoints at once.
`numbers`: Array of phone numbers, just like `destination` in the `send` method.
`messageText`: The message string to be sent. If it's too long, it will be split into multiple messages.

Example:
```
sms.sendBulk(['5519988887777', '5535989890000'], 'Your text here');
```

Expected return:
```
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
`id`: ID of a message, obtained when it is sent.

Example:
```
sms.getStatus('8f5af680-973e-11e4-ad43-4ee58e9a13a6');
```
Expected return:
```
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

* Note that phone numbers from `OI` carrier will not return `DELIVERED_SUCCESS` status even if the SMS was successfully received.
* Delivery status data is only retained in Movile's backend for a few days, so you may want to store this data somewhere else.

Special thanks to [@mCodex](https://github.com/mCodex/)
