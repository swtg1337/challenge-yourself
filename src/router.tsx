import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import HomePage from './pages/HomePage'



const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/challenges" element={<App />} />
			<Route path="/challenges/:id" element={<App />} />
		</Routes>
	</BrowserRouter>
)

export default Router
