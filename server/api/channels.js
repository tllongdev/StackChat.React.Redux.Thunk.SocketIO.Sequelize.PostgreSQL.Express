const router = require('express').Router();
const { Channel, Message } = require('../db/models');

module.exports = router;

// GET api/channels
router.get('/', async (req, res, next) => {
  const channels = await Channel.findAll().catch(next);
  res.json(channels);
});

// GET /api/channels/:channelId/messages
router.get('/:channelId/messages', async (req, res, next) => {
  const channelId = req.params.channelId;
  const messages = await Message.findAll({ where: { channelId } }).catch(next);
  res.json(messages);
});

// POST /api/channels
router.post('/', async (req, res, next) => {
  const channel = await Channel.create(req.body).catch(next);
  res.json(channel);
});

// DELETE /api/channels
router.delete('/:channelId', async (req, res, next) => {
  const id = req.params.channelId;
  await Channel.destroy({ where: { id } }).catch(next);
  res.status(204).end();
});
