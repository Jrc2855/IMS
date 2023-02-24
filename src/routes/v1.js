'use strict';

const express = require('express');
const dataModules = require('../models');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if(dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

const handleGetAll = async (req, res) => {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
};

const handleGetOne = async (req, res) => {
  const id = req.params.id;
  let theRecord  = await req.model.get(id);
  res.status(200).json(theRecord);
};

const handleCreate = async (req, res) => {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
};

const handleUpdate = async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
};

const handleDelete = async (req, res) => {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
};

module.exports = router;