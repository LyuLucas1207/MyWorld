import React from 'react';
import { validateUrl } from '../utility/validate';
import { useValidRoute } from '../utility/myUse';

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

export default validateUrl(SignUp);