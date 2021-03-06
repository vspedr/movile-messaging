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
  getStatus(ids) {
    const payload = {};
    if (typeof ids === 'string') {
      payload.ids = [ids];
    } else if (ids instanceof Array) {
      payload.ids = ids;
    }
    return this.instance.post('/sms/status/search', payload);
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
    const messages = numbers.map((number) => {
      if (typeof number === 'string') {
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
