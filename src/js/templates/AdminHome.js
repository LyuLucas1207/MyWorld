// 引入 React 和 Hooks
import React, { useEffect, useState } from 'react';

// 引入组件
import NotFound from './NotFound';
import TentLoader from '../components/TentLoader';
import Switch from '../components/Switch';

// 引入工具函数和自定义 Hook
import { checkIdentity, getDatas } from '../utility/sendRequest';
import { useTheme, useValidRoute } from '../utility/myUse';

// 引入样式文件
import '../../css/AdminHome.css';
import '../../css/import/css/boxicons.min.css';



const ProjectList = ({ projects, fetchData }) => (
    <div className="project-grid">
        {Object.keys(projects).map((key) => (
            <div key={key} className="project-card">
                <h2>{projects[key].name}</h2>
                <p>{projects[key].description}</p>
                <p>状态: {projects[key].status}</p>
                <button onClick={() => fetchData(projects[key].url)}>查看详情</button>
            </div>
        ))}
    </div>
);

const Sidebar = ({ sidebarOpen, toggleCategoryMenu, categoryOpen, togglePostsMenu, postsOpen, togglePluginsMenu, pluginsOpen, fetchData }) => (
    <div className={`sidebar ${sidebarOpen ? 'sidebar-close' : ''}`}>
        <div className="logo-details">
            <i className='bx bxl-c-plus-plus'></i>
            <span className="logo_name">Lyu World</span>
        </div>
        <ul className="nav-links">
            <li>
                <button onClick={() => fetchData('/dashboard')}>
                    <i className='bx bx-grid-alt'></i>
                    <span className="link_name">Dashboard</span>
                </button>
                <ul className="sub-menu blank">
                    <li><button onClick={() => fetchData('/category')}>Category</button></li>
                </ul>
            </li>
            <li>
                <div className="iocn-link">
                    <button onClick={toggleCategoryMenu}>
                        <i className='bx bx-collection'></i>
                        <span className="link_name">Category</span>
                        <i className={`bx bxs-chevron-down arrow ${categoryOpen ? 'rotate' : ''}`}></i>
                    </button>
                </div>
                <ul className="sub-menu" style={{ display: categoryOpen ? 'block' : 'none' }}>
                    <li><button onClick={() => fetchData('/category')}>Category</button></li>
                    <li><button onClick={() => fetchData('/html-css')}>HTML & CSS</button></li>
                    <li><button onClick={() => fetchData('/javascript')}>JavaScript</button></li>
                    <li><button onClick={() => fetchData('/php-mysql')}>PHP & MySQL</button></li>
                </ul>
            </li>
            <li>
                <div className="iocn-link">
                    <button onClick={togglePostsMenu}>
                        <i className='bx bx-book-alt'></i>
                        <span className="link_name">Posts</span>
                        <i className={`bx bxs-chevron-down arrow ${postsOpen ? 'rotate' : ''}`}></i>
                    </button>
                </div>
                <ul className="sub-menu" style={{ display: postsOpen ? 'block' : 'none' }}>
                    <li><button onClick={() => fetchData('/posts')}>Posts</button></li>
                    <li><button onClick={() => fetchData('/web-design')}>Web Design</button></li>
                    <li><button onClick={() => fetchData('/login-form')}>Login Form</button></li>
                    <li><button onClick={() => fetchData('/card-design')}>Card Design</button></li>
                </ul>
            </li>
            <li>
                <button onClick={() => fetchData('/analytics')}>
                    <i className='bx bx-pie-chart-alt-2'></i>
                    <span className="link_name">Analytics</span>
                </button>
                <ul className="sub-menu blank">
                    <li><button onClick={() => fetchData('/analytics')}>Analytics</button></li>
                </ul>
            </li>
            <li>
                <button onClick={() => fetchData('/chart')}>
                    <i className='bx bx-line-chart'></i>
                    <span className="link_name">Chart</span>
                </button>
                <ul className="sub-menu blank">
                    <li><button onClick={() => fetchData('/chart')}>Chart</button></li>
                </ul>
            </li>
            <li>
                <div className="iocn-link">
                    <button onClick={togglePluginsMenu}>
                        <i className='bx bx-plug'></i>
                        <span className="link_name">Plugins</span>
                        <i className={`bx bxs-chevron-down arrow ${pluginsOpen ? 'rotate' : ''}`}></i>
                    </button>
                </div>
                <ul className="sub-menu" style={{ display: pluginsOpen ? 'block' : 'none' }}>
                    <li><button onClick={() => fetchData('/plugins')}>Plugins</button></li>
                    <li><button onClick={() => fetchData('/ui-face')}>UI Face</button></li>
                    <li><button onClick={() => fetchData('/pigments')}>Pigments</button></li>
                    <li><button onClick={() => fetchData('/box-icons')}>Box Icons</button></li>
                </ul>
            </li>
            <li>
                <button onClick={() => fetchData('getProjects')}>
                    <i className='bx bx-compass'></i>
                    <span className="link_name">Explore</span>
                </button>
                <ul className="sub-menu blank">
                    <li><button onClick={() => fetchData('/explore')}>Explore</button></li>
                </ul>
            </li>
            <li>
                <button onClick={() => fetchData('/history')}>
                    <i className='bx bx-history'></i>
                    <span className="link_name">History</span>
                </button>
                <ul className="sub-menu blank">
                    <li><button onClick={() => fetchData('/history')}>History</button></li>
                </ul>
            </li>
            <li>
                <button onClick={() => fetchData('/setting')}>
                    <i className='bx bx-cog'></i>
                    <span className="link_name">Setting</span>
                </button>
                <ul className="sub-menu blank">
                    <li><button onClick={() => fetchData('/setting')}>Setting</button></li>
                </ul>
            </li>
            <li>
                <div className="profile-details">
                    <div className="profile-content">
                        <img src="/glask.png" alt="profile" />
                    </div>
                    <div className="name-job">
                        <div className="profile_name">Lucas Lyu</div>
                        <div className="job">Computer Engineering</div>
                    </div>
                    <i className='bx bx-log-out'></i>
                </div>
            </li>
        </ul>
    </div>
);

const AdminHome = () => {
    const validPaths = ['/', '/adminhome', '/not-found'];
    useValidRoute(validPaths, 'admin_home.html#/not-found');
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [postsOpen, setPostsOpen] = useState(false);
    const [pluginsOpen, setPluginsOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkTheme, toggleTheme] = useTheme();

    useEffect(() => {
        const firstLoad = async () => {
            setLoading(true);
            const result = await checkIdentity();
            if (result.status !== 200 && !result.data) {
                setError(`请求失败: ${result.msg}`);
            }
            setLoading(false);
        };
        firstLoad();
    }, []);


    const fetchData = async (projectUrl) => {
        setLoading(true);
        try {
            const result = await getDatas(projectUrl);
            setStatus(result.status);
            if (result.status !== 200 && !result.data) {
                setError(`请求失败: ${result.msg}`);
            }
            setProjects(result.data);
        } catch (error) {
            setError(`请求出错: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleCategoryMenu = () => setCategoryOpen(!categoryOpen);
    const togglePostsMenu = () => setPostsOpen(!postsOpen);
    const togglePluginsMenu = () => setPluginsOpen(!pluginsOpen);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    if (error) {
        console.log('status:', status);
        if (status === 400) {
            console.log('status:', status);
            return <NotFound message={error} link="/" status = {status} />;
        }
        return <NotFound message={error} link="/admin.html" />;
    }

    return (
        <>
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <Sidebar
                sidebarOpen={sidebarOpen}
                toggleCategoryMenu={toggleCategoryMenu}
                categoryOpen={categoryOpen}
                togglePostsMenu={togglePostsMenu}
                postsOpen={postsOpen}
                togglePluginsMenu={togglePluginsMenu}
                pluginsOpen={pluginsOpen}
                fetchData={fetchData}
            />
            <section className="home-section">
                <button className="home-content" onClick={toggleSidebar}>
                    <i className='bx bx-menu'></i>
                    <span>Nagivation SliderBar</span>
                </button>
                <div className="infor">
                    <h1>项目列表</h1>
                    {loading ? (
                        <TentLoader />
                    ) : projects ? (
                        <ProjectList projects={projects} fetchData={fetchData} />
                    ) : (
                        <p>没有项目数据。</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default AdminHome;












































// import React, { useEffect, useState } from 'react';
// import NotFound from './NotFound';
// import { checkIdentity, getDatas } from '../utility/sendRequest'; // 引入工具函数
// import { useTheme } from '../utility/changeTheme'; // 引入自定义 Hook
// import TentLoader from '../components/TentLoader';
// import Switch from '../components/Switch';
// import '../../css/AdminHome.css';
// import '../../css/import/css/boxicons.min.css';

// const AdminHome = () => {
//     const [projects, setProjects] = useState(null); // 项目数据
//     const [loading, setLoading] = useState(false);   // 加载状态
//     const [error, setError] = useState(null);       // 错误状态

//     // 子菜单展开状态
//     const [categoryOpen, setCategoryOpen] = useState(false);
//     const [postsOpen, setPostsOpen] = useState(false);
//     const [pluginsOpen, setPluginsOpen] = useState(false);
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook

//     useEffect(() => {
//         const firstLoad = async () => {
//             setLoading(true); // 开始加载数据时打开
//             const result = await checkIdentity(); // 调用工具函数获取数据
//             if (result.status !== 200 && !result.data) {
//                 setError(`请求失败: ${result.msg}`);
//             }
//             setLoading(false); // 请求结束后关闭加载状态
//         };
//         firstLoad();
//     }, []);

//     const fetchData = async (projectUrl) => {
//         setLoading(true); // 开始加载数据时打开
//         try {
//             const result = await getDatas(projectUrl); // 调用工具函数获取数据
//             console.log('result:', result);
//             setProjects(result.data);
//             if (result.status !== 200 && !result.data) {
//                 setError(`请求失败: ${result.msg}`);
//             }
//             console.log(`Fetching data for: ${projectUrl}`); // 这里可以处理项目URL
//         } catch (error) {
//             setError(`请求出错: ${error.message}`);
//         } finally {
//             setLoading(false); // 请求结束后关闭加载状态

//         }
//     };

//     const toggleCategoryMenu = () => {
//         setCategoryOpen(!categoryOpen); // 切换 Category 菜单展开状态
//     };

//     const togglePostsMenu = () => {
//         setPostsOpen(!postsOpen); // 切换 Posts 菜单展开状态
//     };

//     const togglePluginsMenu = () => {
//         setPluginsOpen(!pluginsOpen); // 切换 Plugins 菜单展开状态
//     };
    
//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen); // 切换 Sidebar 菜单展开状态
//     };


//     // if (loading) {
//     //     return <TentLoader />;
//     // }
//     if (error) {
//         return <NotFound message={error} link="/admin.html" />;
//     }

//     return (
//         <>
//             <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
//             <div className={`sidebar ${sidebarOpen ? 'sidebar-close' : ''}`}>
//                 <div className="logo-details">
//                     <i className='bx bxl-c-plus-plus'></i>
//                     <span className="logo_name">Lyu World</span>
//                 </div>
//                 <ul className="nav-links">
//                     <li>
//                         <button onClick={() => fetchData('/dashboard')}>
//                             <i className='bx bx-grid-alt'></i>
//                             <span className="link_name">Dashboard</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/category')}>Category</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <div className="iocn-link">
//                             <button onClick={toggleCategoryMenu}>
//                                 <i className='bx bx-collection'></i>
//                                 <span className="link_name">Category</span>
//                                 <i className={`bx bxs-chevron-down arrow ${categoryOpen ? 'rotate' : ''}`}></i>
//                             </button>
                            
//                         </div>
//                         <ul className="sub-menu" style={{ display: categoryOpen ? 'block' : 'none' }}>
//                             <li><button onClick={() => fetchData('/category')}>Category</button></li>
//                             <li><button onClick={() => fetchData('/html-css')}>HTML & CSS</button></li>
//                             <li><button onClick={() => fetchData('/javascript')}>JavaScript</button></li>
//                             <li><button onClick={() => fetchData('/php-mysql')}>PHP & MySQL</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <div className="iocn-link">
//                             <button onClick={togglePostsMenu}>
//                                 <i className='bx bx-book-alt'></i>
//                                 <span className="link_name">Posts</span>
//                                 <i className={`bx bxs-chevron-down arrow ${postsOpen ? 'rotate' : ''}`}></i>
//                             </button>
                            
//                         </div>
//                         <ul className="sub-menu" style={{ display: postsOpen ? 'block' : 'none' }}>
//                             <li><button onClick={() => fetchData('/posts')}>Posts</button></li>
//                             <li><button onClick={() => fetchData('/web-design')}>Web Design</button></li>
//                             <li><button onClick={() => fetchData('/login-form')}>Login Form</button></li>
//                             <li><button onClick={() => fetchData('/card-design')}>Card Design</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <button onClick={() => fetchData('/analytics')}>
//                             <i className='bx bx-pie-chart-alt-2'></i>
//                             <span className="link_name">Analytics</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/analytics')}>Analytics</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <button onClick={() => fetchData('/chart')}>
//                             <i className='bx bx-line-chart'></i>
//                             <span className="link_name">Chart</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/chart')}>Chart</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <div className="iocn-link">
//                             <button onClick={togglePluginsMenu}>
//                                 <i className='bx bx-plug'></i>
//                                 <span className="link_name">Plugins</span>
//                                 <i className={`bx bxs-chevron-down arrow ${pluginsOpen ? 'rotate' : ''}`}></i>
//                             </button>
//                         </div>
//                         <ul className="sub-menu" style={{ display: pluginsOpen ? 'block' : 'none' }}>
//                             <li><button onClick={() => fetchData('/plugins')}>Plugins</button></li>
//                             <li><button onClick={() => fetchData('/ui-face')}>UI Face</button></li>
//                             <li><button onClick={() => fetchData('/pigments')}>Pigments</button></li>
//                             <li><button onClick={() => fetchData('/box-icons')}>Box Icons</button></li>
//                         </ul>
//                     </li>

//                     <li>
//                         <button onClick={() => fetchData('getProjects')}>
//                             <i className='bx bx-compass'></i>
//                             <span className="link_name">Explore</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/explore')}>Explore</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <button onClick={() => fetchData('/history')}>
//                             <i className='bx bx-history'></i>
//                             <span className="link_name">History</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/history')}>History</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <button onClick={() => fetchData('/setting')}>
//                             <i className='bx bx-cog'></i>
//                             <span className="link_name">Setting</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/setting')}>Setting</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <div className="profile-details">
//                             <div className="profile-content">
//                                 <img src="/glask.png" alt="profile" />
//                             </div>
//                             <div className="name-job">
//                                 <div className="profile_name">Lucas Lyu</div>
//                                 <div className="job">Computer Engineering</div>
//                             </div>
//                             <i className='bx bx-log-out'></i>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//             <section className="home-section">
//                 <button className="home-content" onClick={toggleSidebar}>
//                     <i className='bx bx-menu'></i>
//                     <span>Nagivation SliderBar </span>
//                 </button>
//                 <div className="infor">
//                     <h1>项目列表</h1>
//                     {loading ? (
//                         <TentLoader /> 
//                     ) : (
//                     projects ? (
//                     <div className="project-grid">
//                         {Object.keys(projects).map((key) => (
//                             <div key={key} className="project-card">
//                                 <h2>{projects[key].name}</h2>
//                                 <p>{projects[key].description}</p>
//                                 <p>状态: {projects[key].status}</p>
//                                 <button onClick={() => fetchData(projects[key].url)}>
//                                     查看详情
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                     ) : (
//                     <p>没有项目数据。</p>
//                     )
//             )}
//                 </div>
//             </section>
//         </>
//     );
// };

// export default AdminHome;






































// import React, { useEffect, useState } from 'react';
// import NotFound from './NotFound';
// import { checkIdentity, getDatas } from '../utility/sendRequest'; // 引入工具函数
// import TentLoader from '../components/TentLoader';
// import '../../css/style.css';
// import '../../css/import/css/boxicons.min.css';

// const AdminHome = () => {
//     const [projects, setProjects] = useState(null); // 项目数据
//     const [loading, setLoading] = useState(false);   // 加载状态
//     const [error, setError] = useState(null);       // 错误状态

//     // 子菜单展开状态
//     const [categoryOpen, setCategoryOpen] = useState(false);
//     const [postsOpen, setPostsOpen] = useState(false);
//     const [pluginsOpen, setPluginsOpen] = useState(false);
//     const [sidebarOpen, setSidebarOpen] = useState(false); 

//     useEffect(() => {
//         const sidebar = document.querySelector(".sidebar");
//         const sidebarBtn = document.querySelector(".home-content");
//         console.log('sidebar:', sidebar);
//         console.log('sidebarBtn:', sidebarBtn);
//         console.log('sidebarOpen:', sidebarOpen);
//         if (sidebarBtn) {
//             sidebarBtn.addEventListener("click", () => {
//                 sidebar.classList.toggle("open");
//                 setSidebarOpen(!sidebarOpen);
//             });
//         }
//     }, [sidebarOpen]);

//     useEffect(() => {
//         const firstLoad = async () => {
//             setLoading(true); // 开始加载数据时打开
//             const result = await checkIdentity(); // 调用工具函数获取数据
//             if (result.status !== 200 && !result.data) {
//                 setError(`请求失败: ${result.msg}`);
//             }
//             setLoading(false); // 请求结束后关闭加载状态
//         };
//         firstLoad();
//     }, []);

//     const fetchData = async (projectUrl) => {
//         setLoading(true); // 开始加载数据时打开
//         try {
//             const result = await getDatas(); // 调用工具函数获取数据
//             setProjects(result.data);
//             if (result.code !== 200 && !result.data) {
//                 setError(`请求失败: ${result.msg}`);
//             }
//             console.log(`Fetching data for: ${projectUrl}`); // 这里可以处理项目URL
//         } catch (error) {
//             setError(`请求出错: ${error.message}`);
//         } finally {
//             setLoading(false); // 请求结束后关闭加载状态

//         }
//     };

//     const toggleCategoryMenu = () => {
//         setCategoryOpen(!categoryOpen); // 切换 Category 菜单展开状态
//     };

//     const togglePostsMenu = () => {
//         setPostsOpen(!postsOpen); // 切换 Posts 菜单展开状态
//     };

//     const togglePluginsMenu = () => {
//         setPluginsOpen(!pluginsOpen); // 切换 Plugins 菜单展开状态
//     };

//     if (loading) {
//         return (
//             <TentLoader />
//         );
//     }
//     if (error) {
//         return <NotFound message={error} link="/admin.html" />;
//     }

//     return (
//         <>
//             <div className="sidebar">
//                 <div className="logo-details">
//                     <i className='bx bxl-c-plus-plus'></i>
//                     <span className="logo_name">CodingLab</span>
//                 </div>
//                 <ul className="nav-links">
//                     <li>
//                         <button onClick={() => fetchData('/dashboard')}>
//                             <i className='bx bx-grid-alt'></i>
//                             <span className="link_name">Dashboard</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/category')}>Category</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <div className="iocn-link">
//                             <button onClick={toggleCategoryMenu}>
//                                 <i className='bx bx-collection'></i>
//                                 <span className="link_name">Category</span>
//                             </button>
//                             <i className='bx bxs-chevron-down arrow'></i>
//                         </div>
//                         {categoryOpen && (
//                             <ul className="sub-menu">
//                                 <li><button onClick={() => fetchData('/category')}>Category</button></li>
//                                 <li><button onClick={() => fetchData('/html-css')}>HTML & CSS</button></li>
//                                 <li><button onClick={() => fetchData('/javascript')}>JavaScript</button></li>
//                                 <li><button onClick={() => fetchData('/php-mysql')}>PHP & MySQL</button></li>
//                             </ul>
//                         )}
//                     </li>
//                     <li>
//                         <div className="iocn-link">
//                             <button onClick={togglePostsMenu}>
//                                 <i className='bx bx-book-alt'></i>
//                                 <span className="link_name">Posts</span>
//                             </button>
//                             <i className='bx bxs-chevron-down arrow'></i>
//                         </div>
//                         {postsOpen && (
//                             <ul className="sub-menu">
//                                 <li><button onClick={() => fetchData('/posts')}>Posts</button></li>
//                                 <li><button onClick={() => fetchData('/web-design')}>Web Design</button></li>
//                                 <li><button onClick={() => fetchData('/login-form')}>Login Form</button></li>
//                                 <li><button onClick={() => fetchData('/card-design')}>Card Design</button></li>
//                             </ul>
//                         )}
//                     </li>
//                     <li>
//                         <button onClick={() => fetchData('/analytics')}>
//                             <i className='bx bx-pie-chart-alt-2'></i>
//                             <span className="link_name">Analytics</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/analytics')}>Analytics</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <button onClick={() => fetchData('/chart')}>
//                             <i className='bx bx-line-chart'></i>
//                             <span className="link_name">Chart</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/chart')}>Chart</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <div className="iocn-link">
//                             <button onClick={togglePluginsMenu}>
//                                 <i className='bx bx-plug'></i>
//                                 <span className="link_name">Plugins</span>
//                             </button>
//                             <i className='bx bxs-chevron-down arrow'></i>
//                         </div>
//                         {pluginsOpen && (
//                             <ul className="sub-menu">
//                                 <li><button onClick={() => fetchData('/plugins')}>Plugins</button></li>
//                                 <li><button onClick={() => fetchData('/ui-face')}>UI Face</button></li>
//                                 <li><button onClick={() => fetchData('/pigments')}>Pigments</button></li>
//                                 <li><button onClick={() => fetchData('/box-icons')}>Box Icons</button></li>
//                             </ul>
//                         )}
//                     </li>
//                     <li>
//                         <button onClick={() => fetchData('/explore')}>
//                             <i className='bx bx-compass'></i>
//                             <span className="link_name">Explore</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/explore')}>Explore</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <button onClick={() => fetchData('/history')}>
//                             <i className='bx bx-history'></i>
//                             <span className="link_name">History</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/history')}>History</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <button onClick={() => fetchData('/setting')}>
//                             <i className='bx bx-cog'></i>
//                             <span className="link_name">Setting</span>
//                         </button>
//                         <ul className="sub-menu blank">
//                             <li><button onClick={() => fetchData('/setting')}>Setting</button></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <div className="profile-details">
//                             <div className="profile-content">
//                                 <img src="image/profile.jpg" alt="profile" />
//                             </div>
//                             <div className="name-job">
//                                 <div className="profile_name">Prem Shahi</div>
//                                 <div className="job">Web Designer</div>
//                             </div>
//                             <i className='bx bx-log-out'></i>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//             <section className="home-section">
//                 <div className="home-content">
//                     <i className='bx bx-menu'></i>
//                     <span>Nagivation SliderBar </span>
//                 </div>
//                 <div>
//                     <h1>项目列表</h1>

//                     {projects ? (
//                         <ul>
//                             {Object.keys(projects).map((key) => (
//                                 <li key={key}>
//                                     <h2>{projects[key].name}</h2>
//                                     <p>{projects[key].description}</p>
//                                     <p>状态: {projects[key].status}</p>
//                                     <button onClick={() => fetchData(projects[key].url)}>
//                                         查看详情
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>没有项目数据。</p>
//                     )}
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AdminHome;
























// // import React, { useState, useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
// import NotFound from './NotFound';
// import { checkIdentity, getDatas } from '../utility/sendRequest'; // 引入工具函数
// import TentLoader from '../components/TentLoader';


// function AdminHome() {
//     const [projects, setProjects] = useState(null); // 项目数据
//     const [loading, setLoading] = useState(false);   // 加载状态
//     const [error, setError] = useState(null);       // 错误状态
//     const [showButton, setShowButton] = useState(true); // 是否显示按钮
    

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         const result = await getDatas(); // 调用工具函数获取数据
//     //         setProjects(result.data);
//     //         if (result.code !== 200 && !result.data) {
//     //             setError(`请求失败: ${result.msg}`);
//     //         }
//     //         setLoading(false); // 请求结束后关闭加载状态
//     //     };
//     //     fetchData();
//     // }, []);

//     useEffect(() => {
//         const firstLoad = async () => {
//             setLoading(true); // 开始加载数据时打开
//             const result = await checkIdentity(); // 调用工具函数获取数据
//             if (result.status !== 200 && !result.data) {
//                 setError(`请求失败: ${result.msg}`);
//             }
//             setLoading(false); // 请求结束后关闭加载状态
//         };
//         firstLoad();
//     }, []);

//     const fetchData = async () => {
//         setLoading(true); // 开始加载数据时打开
//         try {
//             const result = await getDatas(); // 调用工具函数获取数据
//             setProjects(result.data);
//             if (result.code !== 200 && !result.data) {
//                 setError(`请求失败: ${result.msg}`);
//             }
//         } catch (error) {
//             setError(`请求出错: ${error.message}`);
//         } finally {
//             setLoading(false); // 请求结束后关闭加载状态
//             setShowButton(false); // 隐藏按钮
//         }
//     };




//     if (loading) {
//         return (
//             <TentLoader />
//         );  
//     }

//     if (error) {
//         return <NotFound message={error} link="/admin.html" />;
//     }

//     return (
//         <div>
//             <h1>项目列表</h1>
//             {showButton && (
//                 <button onClick={fetchData}>
//                     加载项目数据
//                 </button>
//             )}
//             {projects ? (
//                 <ul>
//                     {Object.keys(projects).map((key) => (
//                         <li key={key}>
//                             <h2>{projects[key].name}</h2>
//                             <p>{projects[key].description}</p>
//                             <p>状态: {projects[key].status}</p>
//                             <a href={projects[key].url} target="_blank" rel="noopener noreferrer">
//                                 查看详情
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>没有项目数据。</p>
//             )}
//         </div>
//     );
// }

// export default AdminHome;







// import React, { useState, useEffect } from 'react';
// import NotFound from './NotFound';
// import axios from 'axios'; // 引入 axios

// function AdminHome() {
//     const [projects, setProjects] = useState(null); // 项目数据
//     const [loading, setLoading] = useState(true);   // 加载状态
//     const [error, setError] = useState(null);       // 错误状态

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.post('http://192.168.1.68:9999', {
//                 action: 'getProjects' // 发送的数据
//             }, { timeout: 5000 }); // 设置超时时间为 5 秒

//             console.log('返回的数据:', response.data);
//             setProjects(response.data.ProJs); // 设置返回的项目数据
//         } catch (error) {
//             // 检查 error 对象是否具有 response，判断是网络错误还是服务器错误
//             if (error.response) {
//                 // 服务器响应错误（例如 4xx 或 5xx）
//                 setError(`服务器响应错误: ${error.response.status} - ${error.response.statusText}`);
//             } else if (error.request) {
//                 setError(`无法连接到服务器，请检查您的网络连接或稍后重试: ${error.message}`);
        
//             }  else {
//                 // 处理客户端错误
//                 setError(`请求出错: ${error.message}`);
//             }
//             console.error('请求失败:', error);
//         } finally {
//             setLoading(false); // 请求结束后关闭加载状态
//         }
//     };

//     fetchData();
// }, []);


//     if (loading) {
//         return <p>加载中...</p>;
//     }

//     if (error) {
//         return (
//             <NotFound message={error} />
//         )
//     }

//     return (
//         <div>
//             <h1>项目列表</h1>
//             {projects ? (
//                 <ul>
//                     {Object.keys(projects).map((key) => (
//                         <li key={key}>
//                             <h2>{projects[key].name}</h2>
//                             <p>{projects[key].description}</p>
//                             <p>状态: {projects[key].status}</p>
//                             <a href={projects[key].url} target="_blank" rel="noopener noreferrer">
//                                 查看详情
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>没有项目数据。</p>
//             )}
//         </div>
//     );
// }

// export default AdminHome;



// import React, { useState, useEffect } from 'react';

// function AdminHome() {
//     const [projects, setProjects] = useState(null); // 项目数据
//     const [loading, setLoading] = useState(true);   // 加载状态
//     const [error, setError] = useState(null);       // 错误状态

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://192.168.1.68:9999', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         action: 'getProjects', // 模拟的发送数据
//                     }),
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log('返回的数据:', data);
//                     setProjects(data.ProJs); // 设置返回的项目数据
//                 } else {
//                     setError(`请求失败: ${response.statusText}`);
//                 }
//             } catch (error) {
//                 setError(`请求出错: ${error.message}`);
//             } finally {
//                 setLoading(false); // 请求结束，关闭加载状态
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <p>加载中...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>; // 显示错误信息
//     }

//     return (
//         <div>
//             <h1>项目列表</h1>
//             {projects ? (
//                 <ul>
//                     {Object.keys(projects).map((key) => (
//                         <li key={key}>
//                             <h2>{projects[key].name}</h2>
//                             <p>{projects[key].description}</p>
//                             <p>状态: {projects[key].status}</p>
//                             <a href={projects[key].url} target="_blank" rel="noopener noreferrer">
//                                 查看详情
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>没有项目数据。</p>
//             )}
//         </div>
//     );
// }

// export default AdminHome;

