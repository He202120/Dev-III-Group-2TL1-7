import { render } from 'react-dom'
import Example from '../../components/testdnd/example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function composition() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Example />
      </DndProvider>
    </div>
  )
}

export default composition
