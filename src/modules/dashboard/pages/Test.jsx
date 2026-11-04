import { useReducer, useState, useRef, useEffect } from "react";
import FormReducer from './test/FormReducer.jsx'

const initialState = {
    count: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                count: state.count + 1
            }
        case 'incrementBy':
            return {
                ...state,
                count: state.count + action.payload
            }
        case 'decrement':
            return {
                ...state,
                count: state.count - 1
            }
        case 'decrementBy':
            return {
                ...state,
                count: state.count - action.payload
            }
        case 'reset':
            return initialState
        default: return state
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <FormReducer />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="flex items-center gap-4 mb-4">
                <button className="btn" onClick={() => dispatch({ type: 'increment' })}>Increase</button>
                <h3 className="text-xl text-error">{state.count}</h3>
                <button className="btn" onClick={() => dispatch({ type: 'decrement' })}>Decrease</button>
            </div>
            <button className="btn" onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            <button className="btn" onClick={() => dispatch({ type: 'incrementBy', payload: 5 })}>Increment By 5</button>
            <button className="btn" onClick={() => dispatch({ type: 'decrementBy', payload: 3 })}>Decrement By 3</button>
            <button className="btn" onClick={() => dispatch({ type: 'decrementByBy', payload: 3 })}>Not Exist Case</button>
        </>
    )
}

export default function Test() {
    const [search, setSearch] = useState("");
    const previousSearch = useRef("");

    useEffect(() => {
        previousSearch.current = search;
    }, [search]);

    return (
        <>
            <div className="max-w-md mx-auto space-y-3 mb-4">
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <p>Current Value: {search || "Empty"}</p>

                <p>Previous Value: {previousSearch.current || "No previous value"}</p>
            </div>
            <Counter />
        </>
    )
}