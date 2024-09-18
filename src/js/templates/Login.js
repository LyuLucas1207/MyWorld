// 引入 React 和 Hooks
import { useState } from 'react';

// 引入组件
import Switch from '../components/Switch';

// 引入路由和导航相关
import { useNavigate } from 'react-router-dom';

// 引入工具函数、自定义 Hook 和验证函数
import { useTheme, useValidRoute,} from '../utility/myUse';
import { validateEmail, validatePassword, validateUrl } from '../utility/validate';
import { sendLoginRequest } from '../utility/sendRequest';
import EarthStar from '../components/EarthStar';

// 引入样式文件
import '../../css/Login.css';



function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!validateEmail(email)) {
        alert("请输入合法的邮箱地址");
        return;
    }

    if (!password) {
        alert("请输入密码");
        return;
    }
    if (!validatePassword(password)) {
        alert("密码至少 6 个字符，且不含空格");
        return;
    }

    sendLoginRequest(email, password);
};

function Login() {
    const validPaths = ['/', '/not-found', '/login', '/signup'];
    useValidRoute(validPaths, 'admin.html#/not-found');
    const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook
    const navigate = useNavigate(); // 路由跳转

    const handleSignupClick = () => {
        navigate('/signup'); // 跳转到 /signup
    };

    // 密码可见性切换状态
    const [isChecked, setIsChecked] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsChecked(!isChecked);
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="login-container">
            <EarthStar num={30} range={100} />
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                            />
                            <div className='login-tips'>
                                <div className="login-toggle-switch">
                                    <label className="login-switch-label">
                                        <input
                                            type="checkbox"
                                            className="login-checkbox"
                                            checked={isChecked}
                                            onChange={togglePasswordVisibility}
                                        />
                                        <span className="login-slider"></span>
                                    </label>
                                </div>
                                <div className='login-tips-button'>
                                    <div className="faq-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                            <path
                                                d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                                            ></path>
                                        </svg>
                                        <span className="tooltip">显示密码</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="signup-text">
                    Don't have an account?
                    <span className="signup-link" onClick={handleSignupClick}>Sign up</span>
                </p>
            </div>
            <div className="earth-star"></div>
        </div>
    );
}

export default validateUrl(Login);
