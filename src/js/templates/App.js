import '../../css/App.css';
import hashWarp from '../utility/hashWarp';
import useValidRoute from '../utility/renavigate';


function App() {
    const validPaths = ['/', '/not-found', '/index'];
    useValidRoute(validPaths);
    return (
        <div className="App">
            <h1> This is the App component </h1>
        </div>
    );
}

export default hashWarp(App);
