
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Shield, 
  CreditCard,
  Bell,
  Link as LinkIcon,
  Edit
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Please enter a valid address' }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567', // Default value
      address: '123 Main Street, Anytown, CA 12345', // Default value
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    updateUser({
      name: values.name,
      email: values.email,
    });
    setIsEditDialogOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Mock data for demonstration
  const membershipData = {
    plan: 'Professional',
    status: 'Active',
    renewalDate: 'May 15, 2024',
    paymentMethod: 'Visa •••• 4242',
  };

  const securityData = {
    lastLogin: 'May 1, 2023 at 14:30',
    twoFactorEnabled: false,
    devices: [
      { name: 'Macbook Pro', lastActive: '2 hours ago' },
      { name: 'iPhone 13', lastActive: '5 minutes ago' },
    ],
  };

  const notificationSettings = {
    email: true,
    push: true,
    sms: false,
    newsletter: true,
  };

  return (
    <DashboardLayout title="Profile">
      <div className="container mx-auto py-6 max-w-6xl animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Profile Card */}
          <Card className="w-full md:w-1/3">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                    {user?.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{user?.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <Mail className="h-4 w-4" />
                {user?.email}
              </CardDescription>
              <div className="mt-2">
                <Badge variant="outline" className="capitalize">
                  {user?.role?.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>123 Main Street, Anytown, CA 12345</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>Medical Director at City Hospital</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since March 15, 2023</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setIsEditDialogOpen(true)} 
                className="w-full"
                variant="outline"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardFooter>
          </Card>

          {/* Tabs Content */}
          <div className="flex-1">
            <Tabs 
              defaultValue="overview" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                    <CardDescription>View and manage your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Full Name</p>
                        <p className="p-3 bg-muted rounded-md">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Email</p>
                        <p className="p-3 bg-muted rounded-md">{user?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Role</p>
                        <p className="p-3 bg-muted rounded-md capitalize">{user?.role?.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Member Since</p>
                        <p className="p-3 bg-muted rounded-md">March 15, 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Membership Details</CardTitle>
                    <CardDescription>View your current subscription and payment information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Plan</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{membershipData.plan}</Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {membershipData.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Renewal Date</p>
                        <p className="p-3 bg-muted rounded-md">{membershipData.renewalDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Payment Method</p>
                        <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span>{membershipData.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full sm:w-auto">Update Payment Method</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Security Settings</CardTitle>
                    <CardDescription>Manage your account security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Account Access</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                          </div>
                          <Button variant="outline" size="sm">Change Password</Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">
                              {securityData.twoFactorEnabled ? 'Enabled' : 'Not enabled'}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            {securityData.twoFactorEnabled ? 'Disable' : 'Enable'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Login Activity</h3>
                      <p className="text-sm mb-4">Last login: {securityData.lastLogin}</p>
                      
                      <h4 className="font-medium mb-2">Active Devices</h4>
                      <div className="space-y-2">
                        {securityData.devices.map((device, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md">
                            <div>
                              <p className="font-medium">{device.name}</p>
                              <p className="text-sm text-muted-foreground">Active {device.lastActive}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                              Log Out
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications and updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                          </div>
                        </div>
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={notificationSettings.email}
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                          </div>
                        </div>
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={notificationSettings.push}
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                          </div>
                        </div>
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={notificationSettings.sms}
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Marketing & Newsletter</p>
                            <p className="text-sm text-muted-foreground">Receive news and promotional offers</p>
                          </div>
                        </div>
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={notificationSettings.newsletter}
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full sm:w-auto">Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information below.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Anytown, CA 12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Profile;
