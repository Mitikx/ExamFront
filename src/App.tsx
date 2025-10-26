import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import { AppProvider } from './context/AppProvider';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

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
            <ErrorBoundary>
                <Router>
                    <Header />
                    <main className="container">
                        <Routes>
                            <Route path="/" element={<UserList />} />
                            <Route path="/user/:id" element={<UserDetail />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </Router>
            </ErrorBoundary>
        </AppProvider>
    );
}
export default App;