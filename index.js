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
    return this.instance.post('/send-sms', {
      destination,
      messageText
    });
  }

  sendBulk(numbers = [], messageText = '') {
    const messages = numbers.map(number => ({ destination: number }));
    return this.instance.post('/send-bulk-sms', {
      messages,
      defaultValues: {
        messageText
      }
    });
  }

  getStatus(id = '') {
    return this.instance.get('/sms-status?id=' + id);
  }
};
