
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, LucideShield, Settings } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeSwitcher from '@/components/layout/ThemeSwitcher';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Role-Based Access',
      description: 'Tailored experiences for Tutors, Doctors, Gym Trainers, and Barbers with specific features for each role.'
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: 'Appointment Management',
      description: 'Create, manage, and track appointments with real-time availability and automated reminders.'
    },
    {
      icon: <LucideShield className="h-10 w-10 text-primary" />,
      title: 'Secure Authentication',
      description: 'Multi-factor authentication and secure user management to keep your data safe.'
    },
    {
      icon: <Settings className="h-10 w-10 text-primary" />,
      title: 'Customizable Themes',
      description: 'Personalize your experience with multiple theme options to match your brand.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b py-4 px-6 md:px-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white p-1 rounded font-bold">CRM</span>
            <span className="font-bold text-xl">AccessPro</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/register')}>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center py-16 px-6 md:px-10">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Role-Based CRM for <span className="text-primary">Professionals</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A specialized CRM platform designed for Tutors, Doctors, Gym Trainers, 
              and Barbers to manage clients, appointments, and business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" onClick={() => navigate('/register')} className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-6 border shadow-lg">
            <div className="aspect-video rounded-md overflow-hidden bg-card flex items-center justify-center">
              <img 
                src="https://placehold.co/800x450/6D28D9/FFFFFF?text=CRM+Dashboard&font=montserrat" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-10 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Designed for Professionals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { role: 'Tutor', icon: '👨‍🏫' },
              { role: 'Doctor', icon: '👩‍⚕️' },
              { role: 'Gym Trainer', icon: '💪' },
              { role: 'Barber', icon: '💇‍♂️' }
            ].map((item, index) => (
              <div key={index} className="dashboard-card">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.role}</h3>
                <p className="text-muted-foreground mt-2">
                  Specialized dashboard and tools for {item.role.toLowerCase()}s
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-10 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust AccessPro CRM to manage their business.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => navigate('/register')}
            className="gap-2"
          >
            Sign Up Now <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-10 border-t">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-muted-foreground">
              © 2023 AccessPro CRM. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
