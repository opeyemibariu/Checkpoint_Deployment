const router = require('express').Router();
const Worker = require('../models/Worker');

// GET ALL
router.get('/', async (req, res) => {
  const workers = await Worker.find({});
  res.json(workers);
});

// CREATE
router.post('/', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0)
    return res.status(400).json({ message: "request body not found" });

  const newWorker = await Worker.create(req.body);
  res.status(201).json(newWorker);
});

// GET ONE
router.get('/:id', async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) return res.status(404).json({ message: "Worker not found" });
  res.json(worker);
});

// UPDATE (safe version)
router.put('/:id', async (req, res) => {
  const update = await Worker.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!update) return res.status(404).json({ message: "Worker not found" });
  res.json(update);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const info = await Worker.deleteOne({ _id: req.params.id });

  if (info.deletedCount === 1)
    return res.json({ message: "Worker deleted" });

  res.status(404).json({ message: "Worker not found" });
});

module.exports = router;