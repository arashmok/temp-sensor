load('api_config.js');
load('api_dht.js');
load('api_timer.js');
load('api_mqtt.js');

let pin = Cfg.get('app.pin');
let topic = '/sensors/dht11/01';
let dht = DHT.create(pin, DHT.DHT11);


Timer.set(60000, true, function() {
  let msg = JSON.stringify({ t: dht.getTemp(), h: dht.getHumidity() });
  let ok = MQTT.pub(topic, msg, 1);
  print(ok, msg);
}, null);
