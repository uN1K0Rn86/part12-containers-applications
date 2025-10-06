import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders todo text', () => {
  const todo = {
    _id: '864lagdhjfdag',
    text: "This is for a test",
    done: false
  }

  const deleteTodo = vi.fn()
  const completeTodo = vi.fn()

  render(<Todo 
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
  )
  expect(screen.getByText('This is for a test')).toBeInTheDocument()
})