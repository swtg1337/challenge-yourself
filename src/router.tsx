import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import HomePage from './pages/HomePage'
import Challenges from './pages/Challenges'



const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/challenges" element={<Challenges />} />
			<Route path="/challenges/:id" element={<App />} />
		</Routes>
	</BrowserRouter>
)

export default Router
