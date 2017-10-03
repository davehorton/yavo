const test = require('tape').test ;
const VictorOps = require('..');
const pino = require('pino');
const sinon = require('sinon');
const request = require('request');

test('constructor: with no logger', (t) => {
  const client = new VictorOps('my-key');
  t.plan(3);
  t.equal(client.logger.info, console.log);
  t.equal(client.logger.error, console.error);
  t.equal(typeof client.alert, 'function');
}) ;

test('constructor: with pino logger', (t) => {
  const logger = pino() ;
  const client = new VictorOps(logger, 'my-key');
  t.plan(2);
  t.equal(client.logger.info, logger.info);
  t.equal(client.logger.error, logger.error);
}) ;

test('VictorOps#alert with callback', (t) => {
  t.plan(2);

  const stub = sinon.stub(request, 'post').yields(null, {statusCode: 200}, {
    result: 'success',
    'entity_id':'Your entity_id here'
  });

  const client = new VictorOps('my-key');

  client.alert({message_type: 'critical'}, 'telephony', (err, body) => {
    stub.restore() ;
    t.equal(err, null);
    t.equal(body.result, 'success');
  });
}) ;

test('VictorOps#alert with Promise', (t) => {
  t.plan(1);

  const stub = sinon.stub(request, 'post').yields(null, {statusCode: 200}, {
    result: 'success',
    'entity_id':'Your entity_id here'
  });

  const client = new VictorOps('my-key');

  client.alert({message_type: 'critical'}, 'telephony')
    .then((body) => {
      stub.restore() ;
      t.equal(body.result, 'success');
    });
}) ;

test('message_type is required', (t) => {
  t.plan(1);

  const client = new VictorOps('my-key');
  t.throws(client.alert.bind(client, {})) ;
}) ;
