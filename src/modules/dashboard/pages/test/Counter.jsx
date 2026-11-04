export default function Counter({ count, setCount }) {
    console.log("Counter rendered");

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount(prev => prev + 1)}>
                Increment
            </button>
        </div>
    );
}