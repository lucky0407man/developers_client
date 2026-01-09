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
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">Welcome to my counter</h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-4">Current Count:</p>
            <div className="inline-block px-6 md:px-8 py-4 md:py-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
              <p className="text-4xl md:text-6xl font-bold text-white">{state.count}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button 
              onClick={addFive}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm md:text-base"
            >
              + Add 5
            </button>
            <button 
              onClick={reset}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm md:text-base"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}