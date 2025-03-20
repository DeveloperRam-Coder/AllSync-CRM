
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Home, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  Settings,
  BarChart4,
  Users,
  CreditCard,
  Bell,
  LayoutDashboard,
  ClipboardList,
  FileBarChart,
  UserCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeSwitcher from './ThemeSwitcher';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const coreMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: FileBarChart, label: 'Reports', path: '/reports' },
  ];

  // Add role-specific menu items
  const roleSpecificMenuItems = () => {
    switch (user?.role) {
      case 'doctor':
        return [
          { icon: ClipboardList, label: 'Health Records', path: '/records' }
        ];
      case 'tutor':
        return [
          { icon: ClipboardList, label: 'Classes', path: '/classes' }
        ];
      case 'gym_trainer':
        return [
          { icon: ClipboardList, label: 'Workouts', path: '/workouts' }
        ];
      case 'barber':
        return [
          { icon: ClipboardList, label: 'Services', path: '/services' }
        ];
      default:
        return [];
    }
  };

  const userMenuItems = [
    { icon: UserCircle, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const allMenuItems = [...coreMenuItems, ...roleSpecificMenuItems()];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActivePath = (path: string) => {
    return window.location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <button onClick={toggleSidebar} className="p-2">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-medium">{title}</h1>
        <ThemeSwitcher />
      </div>

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar z-50 w-64 border-r transition-all duration-300 ease-in-out flex-shrink-0 flex flex-col h-full",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 fixed md:static top-0 left-0 h-screen"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="text-xl font-bold text-sidebar-foreground flex items-center gap-2">
            <span className="bg-primary text-white p-1 rounded">CRM</span>
            <span>AccessPro</span>
          </Link>
          <button onClick={toggleSidebar} className="md:hidden p-2">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-sidebar-accent/50 border-0 rounded-md py-2 pl-9 pr-3 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:outline-none focus:ring-1 focus:ring-sidebar-ring"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-sidebar-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <nav className="px-2 py-4 space-y-1 overflow-y-auto">
            <div className="px-3 mb-2">
              <p className="text-xs uppercase font-medium text-sidebar-foreground/50 tracking-wider">
                Main
              </p>
            </div>
            
            {allMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-link group",
                  isActivePath(item.path) && "active"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.label === 'Appointments' && (
                  <Badge variant="outline" className="ml-auto bg-sidebar-primary/10 text-sidebar-primary border-sidebar-primary/20">3</Badge>
                )}
              </Link>
            ))}
            
            <div className="px-3 my-2 pt-2">
              <p className="text-xs uppercase font-medium text-sidebar-foreground/50 tracking-wider">
                User
              </p>
            </div>
            
            {userMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-link",
                  isActivePath(item.path) && "active"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {user?.role?.replace('_', ' ')}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex gap-2 items-center">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex gap-2 items-center">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex gap-2 items-center text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1 w-full">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">New Appointment</span>
                      <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Emma Johnson scheduled an appointment for tomorrow at 2:00 PM.
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1 w-full">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium">New Client</span>
                      <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      David Wilson signed up and created an account.
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1 w-full">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <span className="font-medium">Payment Received</span>
                      <span className="text-xs text-muted-foreground ml-auto">5h ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You received a payment of $125 from Michael Brown.
                    </p>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-2 cursor-pointer">
                  <Link to="/notifications" className="text-sm text-center w-full">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeSwitcher />
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              My Account
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto animate-fade-in">
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar} />
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
