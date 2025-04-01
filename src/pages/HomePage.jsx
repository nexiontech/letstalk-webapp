import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/features/counter/counterSlice';

function HomePage() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the Let's Talk WebApp!</p>

            <div>
                <h2>Counter Example</h2>
                <p>Current Count: {count}</p>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
            </div>
        </div>
    );
}

export default HomePage;