import './App.css';
import {createEvent, createStore} from 'effector-logger'
import {useStore} from 'effector-react'
import {createDomain} from 'effector';
import {attachLogger} from 'effector-logger/attach'

const plus = createEvent("plus");

export const root = createDomain('app')
const $counter = createStore({
    value: 1,
    square: 1,
}, { name: "counter" }).on(plus, state => {
    const value = state.value + 1;
    return {
        value: value,
        square: value * value,
    }
})

attachLogger(root, { reduxDevtools: 'enabled', console: 'enabled', inspector: 'enabled' });

const App = () => {
  const counter = useStore($counter)

  return (
      <div>
        <button onClick={() => plus()}>Plus</button>
        <div>counter: {counter.value}, square: {counter.square}</div>
      </div>
  )
}

export default App;
