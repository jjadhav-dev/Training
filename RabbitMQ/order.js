// order.js
const amqp = require('amqplib');

async function createOrder() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  const exchange = 'order_exchange';

  await ch.assertExchange(exchange, 'fanout', { durable: false });

  const msg = { orderId: 101, status: 'Order Created' };
  ch.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
  console.log("Order Created:", msg);
  
  setTimeout(() => conn.close(), 500);
}

createOrder();
