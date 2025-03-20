
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Globe, Mail, Moon, Palette, Bell, Shield, Users, Smartphone } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    twoFactorAuth: true,
    sessionTimeout: "30",
    language: "english",
    timeZone: "UTC-05:00",
    autoSave: true
  });

  const handleSaveSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" defaultValue="Doctor" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Configure language and timezone preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select 
                      id="language" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={settings.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select 
                      id="timezone" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={settings.timeZone}
                      onChange={(e) => handleInputChange('timeZone', e.target.value)}
                    >
                      <option value="UTC-08:00">Pacific Time (UTC-08:00)</option>
                      <option value="UTC-07:00">Mountain Time (UTC-07:00)</option>
                      <option value="UTC-06:00">Central Time (UTC-06:00)</option>
                      <option value="UTC-05:00">Eastern Time (UTC-05:00)</option>
                      <option value="UTC+00:00">Greenwich Mean Time (UTC+00:00)</option>
                      <option value="UTC+01:00">Central European Time (UTC+01:00)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    These settings will be applied to all your content and notifications.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the appearance of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={isDarkMode}
                      onCheckedChange={toggleDarkMode}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4" />
                      <Label>Color Theme</Label>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                      <div 
                        className={`cursor-pointer rounded-md border-2 p-1 ${theme === 'default' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setTheme('default')}
                      >
                        <div className="h-24 rounded bg-gradient-to-br from-blue-500 to-blue-700 p-2">
                          <div className="h-4 w-12 rounded-full bg-white/20"></div>
                          <div className="mt-2 h-2 w-16 rounded-full bg-white/20"></div>
                          <div className="mt-1 h-2 w-12 rounded-full bg-white/20"></div>
                        </div>
                        <p className="mt-2 text-center text-sm font-medium">Blue</p>
                      </div>
                      
                      <div 
                        className={`cursor-pointer rounded-md border-2 p-1 ${theme === 'wellness' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setTheme('wellness')}
                      >
                        <div className="h-24 rounded bg-gradient-to-br from-green-500 to-green-700 p-2">
                          <div className="h-4 w-12 rounded-full bg-white/20"></div>
                          <div className="mt-2 h-2 w-16 rounded-full bg-white/20"></div>
                          <div className="mt-1 h-2 w-12 rounded-full bg-white/20"></div>
                        </div>
                        <p className="mt-2 text-center text-sm font-medium">Green</p>
                      </div>
                      
                      <div 
                        className={`cursor-pointer rounded-md border-2 p-1 ${theme === 'modern' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setTheme('modern')}
                      >
                        <div className="h-24 rounded bg-gradient-to-br from-purple-500 to-purple-700 p-2">
                          <div className="h-4 w-12 rounded-full bg-white/20"></div>
                          <div className="mt-2 h-2 w-16 rounded-full bg-white/20"></div>
                          <div className="mt-1 h-2 w-12 rounded-full bg-white/20"></div>
                        </div>
                        <p className="mt-2 text-center text-sm font-medium">Purple</p>
                      </div>
                      
                      <div 
                        className={`cursor-pointer rounded-md border-2 p-1 ${theme === 'warm' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setTheme('warm')}
                      >
                        <div className="h-24 rounded bg-gradient-to-br from-orange-500 to-orange-700 p-2">
                          <div className="h-4 w-12 rounded-full bg-white/20"></div>
                          <div className="mt-2 h-2 w-16 rounded-full bg-white/20"></div>
                          <div className="mt-1 h-2 w-12 rounded-full bg-white/20"></div>
                        </div>
                        <p className="mt-2 text-center text-sm font-medium">Orange</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interface Settings</CardTitle>
                <CardDescription>Customize your workspace experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autosave">Auto-save Changes</Label>
                    <p className="text-sm text-muted-foreground">Automatically save your work as you make changes</p>
                  </div>
                  <Switch 
                    id="autosave" 
                    checked={settings.autoSave}
                    onCheckedChange={() => handleToggle('autoSave')}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input 
                    id="session-timeout" 
                    type="number" 
                    value={settings.sessionTimeout}
                    onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Set how long until your session expires after inactivity</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleToggle('emailNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                  </div>
                  <Switch 
                    id="sms-notifications" 
                    checked={settings.smsNotifications}
                    onCheckedChange={() => handleToggle('smsNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about new features and offers</p>
                  </div>
                  <Switch 
                    id="marketing-emails" 
                    checked={settings.marketingEmails}
                    onCheckedChange={() => handleToggle('marketingEmails')}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    You can change your preferences anytime
                  </p>
                </div>
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>Select which events trigger notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="new-appointment" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="new-appointment">New Appointment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="appointment-reminder" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="appointment-reminder">Appointment Reminder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="appointment-cancelled" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="appointment-cancelled">Appointment Cancelled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="appointment-changed" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="appointment-changed">Appointment Changed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="new-message" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="new-message">New Message</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-received" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="payment-received">Payment Received</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    You'll only be notified according to your preferences above
                  </p>
                </div>
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Password Management</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => {
                  toast({
                    title: "Password updated",
                    description: "Your password has been changed successfully.",
                  });
                }}>
                  Update Password
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require a verification code when signing in</p>
                  </div>
                  <Switch 
                    id="two-factor" 
                    checked={settings.twoFactorAuth}
                    onCheckedChange={() => handleToggle('twoFactorAuth')}
                  />
                </div>
                
                {settings.twoFactorAuth && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Two-factor authentication is enabled</AlertTitle>
                    <AlertDescription>
                      You will need to enter a verification code from your authenticator app when you sign in.
                    </AlertDescription>
                  </Alert>
                )}
                
                {settings.twoFactorAuth && (
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Setup Authenticator App
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Two-factor authentication adds an extra layer of security to your account
                  </p>
                </div>
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Devices & Sessions</CardTitle>
                <CardDescription>Manage devices that are currently signed in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Current Device</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • Active now</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" disabled>This Device</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Smartphone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Mobile Device</p>
                        <p className="text-sm text-muted-foreground">iOS App • Last active 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Sign Out</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Sign Out of All Devices</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
