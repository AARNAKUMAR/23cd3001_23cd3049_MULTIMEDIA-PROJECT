import { Route, Switch } from 'wouter';
import LevelMap from './pages/LevelMap';
import Progress from './pages/Progress';
import Home from './pages/Home';
import VerticalNav from './components/VerticalNav';

function App() {
    return (
        <div className="min-h-screen">
            <VerticalNav />
            <Switch>
                <Route path="/" component={Home} />
                <Route path="/map" component={LevelMap} />
                <Route path="/progress" component={Progress} />
                <Route>404 - Page Not Found</Route>
            </Switch>
        </div>
    );
}

export default App;
