const { getAsync, setAsync } = require('./index')

const getCounter = async () => {
  const counterValue = await getAsync('added_todos')
  return counterValue
}

const incrementCounter = async () => {
  const counterValue = await getCounter()
  if (!counterValue) {
    setAsync('added_todos', 1)
  } else {
    setAsync('added_todos', Number(counterValue)+1)
  }
}

module.exports = {
  getCounter,
  incrementCounter
}