import {useReducer} from 'react';

interface Doc_State {
   count: number
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: Doc_State["count"] }

const initialState: Doc_State = { count: 0 };

function stateReducer(state: Doc_State, action: CounterAction): Doc_State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div style={{margin:"20px"}}>
      <h1>Welcome to my counter</h1>

      <p>Count: {state.count}</p>
      <button onClick={addFive}>Add 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}