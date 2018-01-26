'use strict';

const qs = require('qs');
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

  // GETs
  getStatus(id) {
    const query = qs.stringify({
      id
    });
    return this.instance.get('/sms-status?' + query);
  }

  listReceived() {
    return this.instance.get('/sms/receive/list');
  }

  searchReceived(start, end) {
    const query = qs.stringify({
      start,
      end
    });
    return this.instance.get('/sms/receive/search?' + query);
  }

  // POSTs
  send(destination = null, messageText = '') {
    return this.instance.post('/send-sms', {
      destination,
      messageText
    });
  }

  sendBulk(numbers = [], messageText = '') {
    const messages = numbers.map(number => {
      if(typeof number === 'string')){
        return {
          destination: number
        };
      }
      return number;
    });
    return this.instance.post('/send-bulk-sms', {
      messages,
      defaultValues: {
        messageText
      }
    });
  }
};
