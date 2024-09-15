import '../../css/Login.css'; // 假设你有相关的CSS文件
import Switch from '../components/Switch';
import { useTheme } from '../utility/changeTheme'; // 引入自定义 Hook
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import useValidRoute from '../utility/renavigate';
import hashWarp from '../utility/hashWarp';

function Login() {

const validPaths = ['/', '/not-found', '/login', '/signup'];
useValidRoute(validPaths);
  const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook
  const navigate = useNavigate(); // 路由跳转

  const handleSignupClick = () => {
    navigate('/signup'); // 跳转到 /signup
    };
    

  return (
    <div className="login-container">
      <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? 
          <span className="signup-link" onClick={handleSignupClick}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default hashWarp(Login);
