import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import { AppProvider, ThemeContext } from './context/ThemeContext.tsx';
import { useContext } from 'react';

function Header(){
    const ctx = useContext(ThemeContext);
    return (
        <header className="header container">
            <h1>Annuaire</h1>
            <button className="theme-toggle" onClick={ctx.toggleTheme}>{ctx.theme === 'light' ? '🌞' : '🌙'}</button>
        </header>
    )
}

function App() {
    return (
        <AppProvider>
            <Router>
                <Header />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<UserList />} />
                        <Route path="/user/:id" element={<UserDetail />} />
                    </Routes>
                </main>
            </Router>
        </AppProvider>
    );
}
export default App;