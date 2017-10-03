const request = require('request');
const assert = require('assert');
const HTTP_BASE_URL = 'https://alert.victorops.com/integrations/generic/20131114/alert';

class Alerter {
  constructor(logger, key) {
    if (key) {
      this.logger = logger ;
      this.key = key ;
    }
    else {
      this.key = logger ;
      this.logger = {
        info: console.log,
        error: console.error
      };
    }
    assert(this.logger && this.key);
  }

  alert(parameters, routingKey, callback) {
    assert(typeof parameters === 'object');
    assert(typeof routingKey === 'string') ;
    assert(typeof parameters.message_type === 'string');

    const p = new Promise((resolve, reject) => {
      const endpoint = `${HTTP_BASE_URL}/${this.key}/${routingKey}`;
      request.post(endpoint, {
        json: true,
        body: parameters
      }, (err, response, body) => {
        if (err) {
          this.logger.error(`error sending alert: ${err.message}`);
          if (callback) { callback(err) ; }
          else { reject(err) ; }
        }
        if (response.statusCode !== 200) {
          this.logger.error(`error sending alert: ${JSON.stringify(response)}`);
          if (callback) { callback(new Error(`http response: ${response.statusCode}`)); }
          else {reject(response.statusCode);}
        }
        else {
          if (callback) { callback(null, body);}
          else { resolve(body);}
        }
      }) ;
    }) ;

    if (!callback) return p;
  }


}

module.exports = Alerter ;
