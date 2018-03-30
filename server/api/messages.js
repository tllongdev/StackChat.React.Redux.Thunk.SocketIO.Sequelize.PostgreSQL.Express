const router = require('express').Router();
const { Message, Author } = require('../db/models');

module.exports = router;

// GET api/messages
router.get('/', async (req, res, next) => {
  const messages = await Message.findAll().catch(next);
   res.json(messages);
});

// POST /api/messages
router.post('/', async (req, res, next) => {

  // We don't have proper users yet (we'll get there soon, though!).
  // Instead, we'll findOrCreate an author by name, for simplicity.
  // Of course, you wouldn't want to do this in a real chat app!
  const [author] = await Author.findOrCreate({
    where: {
      name: req.body.name || 'Cody'
    }
  }).catch(next);
  
  const message = Message.build(req.body);
  message.setAuthor(author, { save: false });
  await message.save().catch(next);
  const returnMessage = message.toJSON();
  returnMessage.author = author;
  res.json(returnMessage);
});

// PUT /api/messages
router.put('/:messageId', async (req, res, next) => {
  const messageId = req.params.messageId;
  const message = await Message.findById(messageId).catch(next);
  await message.update(req.body).catch(next);
  res.status(204).end();
});

// DELETE /api/messages
router.delete('/:messageId', async (req, res, next) => {
  const id = req.params.messageId;
  await  Message.destroy({ where: { id } }).catch(next);
  res.status(204).end();
});
