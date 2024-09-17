import '../../css/App.css';
import { validateUrl } from '../utility/validate';
import { useValidRoute } from '../utility/myUse';

import Firework from '../components/Firework';


function App() {
    const validPaths = ['/', '/not-found', '/index'];
    useValidRoute(validPaths);
    return (
        <div className="App">
            <h1>欢迎来到我的博客</h1>
            <Firework />
        </div>
    );
}

export default validateUrl(App);
