'use strict';

const axios = require('axios');

module.exports = class MovileMessaging {
  constructor(UserName = null, AuthenticationToken = null) {
    this.instance = axios.create({
      baseURL: 'https://api-messaging.movile.com/v1',
      timeout: 5000,
      headers: {
        UserName,
        AuthenticationToken,
        'Content-Type': 'application/json'
      }
    });
  }

  send(destination = null, messageText = '') {
    this.instance.post('/send-sms', {
      destination,
      messageText
    })
    .then(response => response.data)
    .catch(error => console.error(error));
  }

  sendBulk(numbers = [], messageText = '') {
    const messages = numbers.map(number => ({ destination: number }));
    this.instance.post('/send-bulk-sms', {
      messages,
      defaultValues: {
        messageText
      }
    })
    .then(response => response.data)
    .catch(error => console.error(error));
  }

  getStatus(id = '') {
    this.instance.get('/sms-status?id=' + id)
    .then(response => response.data)
    .catch(error => console.error(error));
  }
};
