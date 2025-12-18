import { Link, useLocation } from 'wouter';
import { Map, TrendingUp, User, Home } from 'lucide-react';

export default function VerticalNav() {
    const [location] = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/map', icon: Map, label: 'Journey' },
        { path: '/progress', icon: User, label: 'Profile' },
    ];

    return (
        <nav className="fixed left-0 top-0 h-screen w-20 bg-slate-900/80 backdrop-blur-md border-r border-bright-cyan/20 z-50 flex flex-col items-center py-8 gap-6">
            <div className="text-2xl mb-4">🎬</div>
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                    <Link key={item.path} href={item.path}>
                        <a
                            className={`
                flex flex-col items-center gap-1 p-3 rounded-lg transition-all
                ${isActive
                                    ? 'bg-bright-cyan/20 text-bright-cyan'
                                    : 'text-gray-400 hover:text-bright-cyan hover:bg-bright-cyan/10'
                                }
              `}
                            aria-label={item.label}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs">{item.label}</span>
                        </a>
                    </Link>
                );
            })}
        </nav>
    );
}
