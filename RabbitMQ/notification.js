// notification.js
const amqp = require('amqplib');

async function notificationService() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  const exchange = 'payment_exchange';

  await ch.assertExchange(exchange, 'fanout', { durable: false });
  const q = await ch.assertQueue('', { exclusive: true });
  ch.bindQueue(q.queue, exchange, '');

  console.log("📩 Waiting for payment results...");

  ch.consume(q.queue, msg => {
    const result = JSON.parse(msg.content.toString());
    if (result.status === 'Payment Success') {
      console.log("✅ Sending success notification for order:", result.orderId);
    } else {
      console.log("❌ Sending failure notification for order:", result.orderId);
    }
  }, { noAck: true });
}

notificationService();
