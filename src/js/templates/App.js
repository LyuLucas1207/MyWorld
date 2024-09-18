import '../../css/App.css';
import { validateUrl } from '../utility/validate';
import { useValidRoute } from '../utility/myUse';
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom'; // 引入 Link 组件
import Switch from '../components/Switch';
import { useTheme } from '../utility/myUse';
import Firework from '../components/Firework';

function App() {
    const validPaths = ['/', '/not-found', '/index'];
    useValidRoute(validPaths);
    const [isDarkTheme, toggleTheme] = useTheme();

    return (
        <>
        <div className="outer-container">
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="inner-container">
                <div className="content">
                    <h1>Welcome to ProJectHub</h1>
                    <p>

                    </p>
                </div>

                <main className='spline-container'>
                    <Spline
                        scene="https://prod.spline.design/o-ljJpLLOhYyoPOF/scene.splinecode"
                    />
                </main>

                <div className="fix-cover">
    
                    <span className="color-overlay">
                        <Link to="/contact">
                            Join Us
                        </Link>
                     </span>
    
                </div>
            </div>
                <Firework width="90vw" height="90vh" />
            
              
        </div>

            
            

            
        </>
    );
}

export default validateUrl(App);


