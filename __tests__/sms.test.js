const Movile = require('../index');

const sms = new Movile('DUMMY', 'DUMMY');

describe('API test', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should get status from SMS', () => {
    sms.getStatus('9cb87d36-79af-11e5-89f3-1b0591cdf807')
      .then((response) => {
        expect(response).toEqual({
          id: '8f5af680-973e-11e4-ad43-4ee58e9a13a6',
          carrierId: 5,
          carrierName: 'TIM',
          destination: '5519900001111',
          sentStatusCode: 2,
          sentStatus: 'SENT_SUCCESS',
          sentStatusAt: 1420732929252,
          sentStatusDate: '2015-01-08T16:02:09Z',
          deliveredStatusCode: 4,
          deliveredStatus: 'DELIVERED_SUCCESS',
          deliveredAt: 1420732954000,
          deliveredDate: '2015-01-08T16:02:34Z',
          campaignId: 1234
        });
      });
  });

  it('should send bulk', () => {
    sms.sendBulk(['5519988887777', '5535989890000'], 'Your text here')
      .then((response) => {
        expect(response).toEqual({
          id: '317b925a-79b0-11e5-82d3-9fb06ba220b3',
          messages: [
            { id: '715773da-79b0-11e5-afc8-dfdd0dedf87a' },
            { id: '717fb4bc-79b0-11e5-819e-57198aac792e' }
          ]
        });
      });
  });

  it('should send a SMS', () => {
    sms.send('5519998765432', 'Your text here').then((response) => {
      expect(response).toEqual({
        id: '9cb87d36-79af-11e5-89f3-1b0591cdf807'
      });
    });
  });

  it('should list receives', () => {
    sms.listReceived()
      .then((response) => {
        expect(response).toEqual({
          total: 1,
          start: '2016-09-04T11:12:41Z',
          end: '2016-09-08T11:17:39.113Z',
          messages: [{
            id: '25950050-7362-11e6-be62-001b7843e7d4',
            subAccount: 'iFoodMarketing',
            campaignAlias: 'iFoodPromo',
            carrierId: 1,
            carrierName: 'VIVO',
            source: '5516981562820',
            shortCode: '28128',
            messageText: 'Eu quero pizza',
            receivedAt: 1473088405588,
            receivedDate: '2016-09-05T12:13:25Z',
            mt: {
              id: '8be584fd-2554-439b-9ba9-aab507278992',
              correlationId: '1876',
              username: 'iFoodCS',
              email: 'customer.support@ifood.com'
            }
          }]
        });
      });
  });
});
