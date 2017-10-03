# yavo

Yet another [VictorOps](https://victorops.com/) client

## Usage

```
const VictorOps = require('yavo');
const client = new VictorOps('my-key');
client.alert({
  'message_type':'CRITICAL',
  'entity_id':'disk space/db01.mycompany.com',
  'entity_display_name':'Critically Low Disk Space on DB01',
  'state_message':'The disk is really really full.  Here is abunch of information about the problem'
}, 'routing-key') ;
```

Or with pino logging integration:
```
const logger = require('pino')() ;
const VictorOps = require('yavo');
const client = new VictorOps(logger, 'my-key');
client.alert({
  'message_type':'CRITICAL',
  'entity_id':'disk space/db01.mycompany.com',
  'entity_display_name':'Critically Low Disk Space on DB01',
  'state_message':'The disk is really really full.  Here is abunch of information about the problem'
}, 'routing-key') ;
```

With a callback, if you want reponse details
```
const VictorOps = require('yavo');
const client = new VictorOps(logger, 'my-key');
client.alert({
  'message_type':'CRITICAL',
  'entity_id':'disk space/db01.mycompany.com',
  'entity_display_name':'Critically Low Disk Space on DB01',
  'state_message':'The disk is really really full.  Here is abunch of information about the problem'
}, 'routing-key', (err, body) => {
  console.log(`result: ${body.result}, entity_id: ${body.entity_id}`);
}) ;
```

Or, if you prefer Promises
```
const VictorOps = require('yavo');
const client = new VictorOps(logger, 'my-key');
client.alert({
  'message_type':'CRITICAL',
  'entity_id':'disk space/db01.mycompany.com',
  'entity_display_name':'Critically Low Disk Space on DB01',
  'state_message':'The disk is really really full.  Here is abunch of information about the problem'
}), 'routing-key')
  .then(body) => {
  console.log(`result: ${body.result}, entity_id: ${body.entity_id}`);
}) ;
```
