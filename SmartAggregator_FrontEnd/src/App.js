import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import AOS from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react';

function App() {

	useEffect(() => {
        AOS.init();
    }, []);

	return (
		<Router>
			<Home />
		</Router>
	);
}

export default App;
