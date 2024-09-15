import hashWarp from '../utility/hashWarp';
import useValidRoute from '../utility/renavigate';

function SignUp() {
    const validPaths = ['/', '/not-found', '/login', '/signup'];
    useValidRoute(validPaths);
    return (
        <div>
            <h1>Sign In</h1>
            <button>Google Sign In</button>
        </div>
    );
}

export default hashWarp(SignUp);