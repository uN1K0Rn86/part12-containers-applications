const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getCounter, incrementCounter } = require('../redis/counter')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  await incrementCounter()
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

/* GET Statistics */
router.get('/statistics', async (req, res) => {
  const counterValue = await getCounter()
  if (!counterValue) {
    res.send({ 'added_todos': 0 })
  } else {
    res.send({ 'added_todos': Number(counterValue) })
  }
})


const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedToDo = await Todo.findByIdAndUpdate(
    req.todo._id,
    req.body,
    { new: true, runValidators: true }
  )
  res.json(updatedToDo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
