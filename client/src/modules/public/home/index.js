// main external export
import Home from './components/home/home';
export default Home;

// internal exports for <Home/>
import LoginForm from './components/loginForm/loginForm';
import RegisterForm from './components/registerForm/registerForm';
export { LoginForm, RegisterForm };
