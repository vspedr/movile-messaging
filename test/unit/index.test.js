const Movile = require('../../index');

const sms = new Movile('DUMMY', 'DUMMY');

describe('sanity test', () => {
  it('should contain a function named getStatus', () => {
    expect(typeof sms.getStatus).toBe('function');
  });

  it('should contain a function named listReceived', () => {
    expect(typeof sms.listReceived).toBe('function');
  });

  it('should contain a function named searchReceived', () => {
    expect(typeof sms.searchReceived).toBe('function');
  });

  it('should contain a function named send', () => {
    expect(typeof sms.send).toBe('function');
  });

  it('should contain a function named sendBulk', () => {
    expect(typeof sms.sendBulk).toBe('function');
  });
});
