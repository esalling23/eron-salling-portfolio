import React from 'react';
import { useDispatch, Provider } from 'react-redux';

const ACTIONS = { 
  INCREMENT: 'INCREMENT', 
  DECREMENT: 'DECREMENT'
}

const initialState = {
  count: 0
}

const reducer = (state, { type, data }) => {
  switch (type) {
    case ACTIONS.DECREMENT:
      return {
        ...state,
        count: state.count + 1
      }
    case ACTIONS.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      }
  }
}

const getCount = state => state.count;

const incrementCount = (dispatch) => dispatch({
  type: ACTIONS.INCREMENT,
});
const dencrementCount = (dispatch) => dispatch({
  type: ACTIONS.DECREMENT,
});

const store = createStore(reducer, initialState)

const App = () => {
  const dispatch = useDispatch();

  const count = getCount()

  const onClickIncrement = () => {
    dispatch(incrementCount())
  }

  const onClickDecrement = () => {
    dispatch(incrementCount())
  }
  return (
    <div>
      <button onClick={onClickDecrement}>-</button>
      <h1>{count}</h1>
      <button onClick={onClickIncrement}>+</button>
    </div>
  )
}

const Redux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Redux