
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar as CalendarIcon, Clock, Plus, Check, X, UserCircle, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock appointment data
interface Appointment {
  id: string;
  clientName: string;
  date: Date;
  time: string;
  duration: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: string;
  notes?: string;
}

const formSchema = z.object({
  clientName: z.string().min(2, { message: 'Client name is required' }),
  date: z.date({ required_error: 'Appointment date is required' }),
  time: z.string({ required_error: 'Appointment time is required' }),
  duration: z.string({ required_error: 'Duration is required' }),
  type: z.string({ required_error: 'Appointment type is required' }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AppointmentPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientName: 'John Doe',
      date: new Date(2023, 5, 12),
      time: '10:00 AM',
      duration: '1 hour',
      status: 'scheduled',
      type: 'Consultation',
      notes: 'First time client'
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      date: new Date(2023, 5, 13),
      time: '2:30 PM',
      duration: '45 min',
      status: 'completed',
      type: 'Follow-up',
      notes: 'Regular client'
    },
    {
      id: '3',
      clientName: 'Robert Johnson',
      date: new Date(2023, 5, 14),
      time: '11:15 AM',
      duration: '30 min',
      status: 'cancelled',
      type: 'Check-up',
      notes: 'Cancelled due to illness'
    }
  ]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: '',
      date: undefined,
      time: '',
      duration: '1 hour',
      type: '',
      notes: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    // Create new appointment
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      clientName: values.clientName,
      date: values.date,
      time: values.time,
      duration: values.duration,
      status: 'scheduled',
      type: values.type,
      notes: values.notes,
    };

    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
    form.reset();
    
    toast({
      title: "Appointment created",
      description: `Appointment with ${values.clientName} has been scheduled for ${format(values.date, 'PPP')} at ${values.time}`,
    });
  };

  const handleStatusChange = (appointmentId: string, newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: newStatus } 
        : appointment
    );
    setAppointments(updatedAppointments);
    
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      toast({
        title: `Appointment ${newStatus}`,
        description: `Appointment with ${appointment.clientName} has been marked as ${newStatus}`,
      });
    }
  };

  const filteredAppointments = appointments.filter(appointment => 
    statusFilter === 'all' || appointment.status === statusFilter
  );

  // Get appointment type options based on user role
  const getAppointmentTypes = () => {
    switch (user?.role) {
      case 'doctor':
        return ['Consultation', 'Follow-up', 'Check-up', 'Procedure', 'Emergency'];
      case 'tutor':
        return ['One-on-one Session', 'Group Class', 'Exam Prep', 'Homework Help'];
      case 'gym_trainer':
        return ['Personal Training', 'Fitness Assessment', 'Nutrition Consultation', 'Group Workout'];
      case 'barber':
        return ['Haircut', 'Beard Trim', 'Shave', 'Hair Coloring', 'Full Service'];
      default:
        return ['Appointment'];
    }
  };

  return (
    <DashboardLayout title="Appointments">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Appointments</h2>
            <p className="text-muted-foreground">
              Manage your schedule and appointments
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All appointments</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create new appointment</DialogTitle>
                  <DialogDescription>
                    Add a new appointment to your schedule
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter client name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
                                  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
                                  '4:00 PM', '4:30 PM', '5:00 PM'].map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {['15 min', '30 min', '45 min', '1 hour', '1.5 hours', '2 hours'].map((duration) => (
                                  <SelectItem key={duration} value={duration}>
                                    {duration}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Appointment Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {getAppointmentTypes().map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Add any additional notes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Appointment</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No appointments found</p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Create your first appointment
              </Button>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-muted rounded-full p-3 hidden sm:block">
                      <UserCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{appointment.clientName}</h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{format(appointment.date, 'PPP')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time} ({appointment.duration})</span>
                        </div>
                        <span className="hidden md:inline">•</span>
                        <span>{appointment.type}</span>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm mt-2">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      appointment.status === 'scheduled' && "bg-blue-100 text-blue-800",
                      appointment.status === 'completed' && "bg-green-100 text-green-800",
                      appointment.status === 'cancelled' && "bg-red-100 text-red-800",
                    )}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </div>
                    
                    {appointment.status === 'scheduled' && (
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handleStatusChange(appointment.id, 'completed')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    {appointment.status === 'cancelled' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 p-0 px-2 text-xs"
                        onClick={() => handleStatusChange(appointment.id, 'scheduled')}
                      >
                        Reschedule
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentPage;
