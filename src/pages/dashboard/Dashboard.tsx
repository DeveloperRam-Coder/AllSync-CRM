
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Calendar, Users, DollarSign, TrendingUp, Clock } from 'lucide-react';

// Type for stats and activity items
interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  positive: boolean;
}

interface ActivityItem {
  id: number;
  title: string;
  time: string;
  description: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [statCards, setStatCards] = useState<StatsCardProps[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading animation for progress bar
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set role-specific stats
    if (user?.role) {
      const roleStats = getRoleSpecificStats(user.role);
      setStatCards(roleStats.stats);
      setRecentActivity(roleStats.activity);
    }
  }, [user?.role]);

  const getRoleSpecificStats = (role: string) => {
    switch (role) {
      case 'doctor':
        return {
          stats: [
            { title: 'Total Patients', value: 142, change: '+12% from last month', icon: <Users className="h-8 w-8" />, positive: true },
            { title: 'Appointments Today', value: 8, change: '2 remaining', icon: <Calendar className="h-8 w-8" />, positive: true },
            { title: 'Average Rating', value: '4.8/5', change: '+0.2 from last month', icon: <TrendingUp className="h-8 w-8" />, positive: true },
            { title: 'Monthly Revenue', value: '$4,250', change: '+8.2% from last month', icon: <DollarSign className="h-8 w-8" />, positive: true },
          ],
          activity: [
            { id: 1, title: 'New appointment', time: '10 minutes ago', description: 'Sarah Johnson scheduled for a consultation' },
            { id: 2, title: 'Prescription updated', time: '1 hour ago', description: 'Updated prescription for Michael Brown' },
            { id: 3, title: 'Payment received', time: '3 hours ago', description: 'Payment of $150 from David Wilson' },
          ]
        };
      case 'tutor':
        return {
          stats: [
            { title: 'Total Students', value: 54, change: '+5% from last month', icon: <Users className="h-8 w-8" />, positive: true },
            { title: 'Classes Today', value: 4, change: '1 remaining', icon: <Calendar className="h-8 w-8" />, positive: true },
            { title: 'Average Rating', value: '4.6/5', change: '+0.1 from last month', icon: <TrendingUp className="h-8 w-8" />, positive: true },
            { title: 'Monthly Revenue', value: '$3,150', change: '+5.7% from last month', icon: <DollarSign className="h-8 w-8" />, positive: true },
          ],
          activity: [
            { id: 1, title: 'New student enrolled', time: '20 minutes ago', description: 'Emily White joined your Math class' },
            { id: 2, title: 'Class rescheduled', time: '2 hours ago', description: 'Physics class moved to 4PM tomorrow' },
            { id: 3, title: 'Homework submitted', time: '5 hours ago', description: '12 students submitted the algebra assignment' },
          ]
        };
      case 'gym_trainer':
        return {
          stats: [
            { title: 'Active Clients', value: 37, change: '+3% from last month', icon: <Users className="h-8 w-8" />, positive: true },
            { title: 'Sessions Today', value: 6, change: '2 remaining', icon: <Calendar className="h-8 w-8" />, positive: true },
            { title: 'Client Progress', value: '78%', change: '+5% from last month', icon: <TrendingUp className="h-8 w-8" />, positive: true },
            { title: 'Monthly Revenue', value: '$3,800', change: '+9.1% from last month', icon: <DollarSign className="h-8 w-8" />, positive: true },
          ],
          activity: [
            { id: 1, title: 'New client signed up', time: '30 minutes ago', description: 'Jason Miller purchased a 3-month plan' },
            { id: 2, title: 'Workout complete', time: '1 hour ago', description: 'Lisa Thompson completed today\'s workout' },
            { id: 3, title: 'Goal achieved', time: '4 hours ago', description: 'Mark Davis reached his weight loss goal' },
          ]
        };
      case 'barber':
        return {
          stats: [
            { title: 'Clients Served', value: 89, change: '+7% from last month', icon: <Users className="h-8 w-8" />, positive: true },
            { title: 'Appointments Today', value: 12, change: '3 remaining', icon: <Calendar className="h-8 w-8" />, positive: true },
            { title: 'Average Rating', value: '4.9/5', change: '+0.3 from last month', icon: <TrendingUp className="h-8 w-8" />, positive: true },
            { title: 'Daily Revenue', value: '$450', change: '+12.3% from yesterday', icon: <DollarSign className="h-8 w-8" />, positive: true },
          ],
          activity: [
            { id: 1, title: 'New appointment', time: '15 minutes ago', description: 'Daniel Garcia booked for a haircut at 3PM' },
            { id: 2, title: 'Service completed', time: '45 minutes ago', description: 'Haircut and beard trim for Chris Evans' },
            { id: 3, title: 'Feedback received', time: '2 hours ago', description: 'Robert Williams left a 5-star review' },
          ]
        };
      default:
        return {
          stats: [
            { title: 'Total Clients', value: 0, change: '0% change', icon: <Users className="h-8 w-8" />, positive: false },
            { title: 'Appointments', value: 0, change: 'No change', icon: <Calendar className="h-8 w-8" />, positive: false },
            { title: 'Performance', value: '0%', change: 'No change', icon: <TrendingUp className="h-8 w-8" />, positive: false },
            { title: 'Revenue', value: '$0', change: 'No change', icon: <DollarSign className="h-8 w-8" />, positive: false },
          ],
          activity: []
        };
    }
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <section className="space-y-2">
          <h2 className="text-3xl font-bold">{getGreeting()}, {user?.name?.split(' ')[0]}</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your {user?.role?.replace('_', ' ')} account today.
          </p>
        </section>
        
        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index} className="stats-card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="stats-label">{stat.title}</p>
                  <p className="stats-value">{stat.value}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <p className={`text-sm mt-2 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </p>
            </Card>
          ))}
        </section>
        
        {/* Progress Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="dashboard-card lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Monthly Overview</h3>
              <span className="text-sm text-muted-foreground">Last 30 days</span>
            </div>
            <div className="h-64 flex items-center justify-center border rounded-md">
              <BarChart className="h-20 w-20 text-muted" />
              <p className="text-muted-foreground ml-4">Chart data visualization would appear here</p>
            </div>
          </Card>
          
          <Card className="dashboard-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Today's Schedule</h3>
              <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-muted rounded-md">
                <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium">
                  10:00
                </div>
                <div>
                  <p className="font-medium">Client Appointment</p>
                  <p className="text-sm text-muted-foreground">John Doe - 1 hour</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-muted rounded-md">
                <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium">
                  13:30
                </div>
                <div>
                  <p className="font-medium">Team Meeting</p>
                  <p className="text-sm text-muted-foreground">Weekly review - 30 min</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-muted rounded-md">
                <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium">
                  15:45
                </div>
                <div>
                  <p className="font-medium">Client Appointment</p>
                  <p className="text-sm text-muted-foreground">Jane Smith - 45 min</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
        
        {/* Tasks & Activity Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Monthly Goal Progress</h3>
              <span className="text-sm text-muted-foreground">66% complete</span>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">New clients</p>
                  <p className="text-sm text-muted-foreground">8/12</p>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Revenue target</p>
                  <p className="text-sm text-muted-foreground">$3,800/$5,000</p>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Client satisfaction</p>
                  <p className="text-sm text-muted-foreground">4.8/5.0</p>
                </div>
                <Progress value={96} className="h-2" />
              </div>
            </div>
          </Card>
          
          <Card className="dashboard-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recent Activity</h3>
              <span className="text-sm text-primary hover:underline cursor-pointer">View all</span>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="bg-muted h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
              
              {recentActivity.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No recent activity found</p>
                </div>
              )}
            </div>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
