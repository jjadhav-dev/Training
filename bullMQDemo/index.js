// index.js
const express = require("express");
const emailQueue = require("./queue");
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const app = express();
app.use(express.json());

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});


app.use("/admin/queues", serverAdapter.getRouter());

app.post("/send-email", async (req, res) => {
  const { to, subject, body } = req.body;

  await emailQueue.add("send-email", { to, subject, body });
  res.json({ status: "Job queued" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
