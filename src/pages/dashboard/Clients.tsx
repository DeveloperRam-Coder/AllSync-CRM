
import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MoreHorizontal, 
  Trash2, 
  Edit, 
  UserPlus,
  Download,
  ArrowUpDown,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

// Mock data
const clientsData = [
  {
    id: 1,
    name: "Emma Johnson",
    email: "emma.j@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    lastAppointment: "2023-05-10",
    nextAppointment: "2023-06-15",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    customerSince: "2021-03-15",
    notes: "Prefers evening appointments",
    tags: ["VIP", "Regular"]
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "mike.brown@example.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    lastAppointment: "2023-05-05",
    nextAppointment: "2023-06-20",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    customerSince: "2020-11-08",
    notes: "Allergic to certain products",
    tags: ["New Client"]
  },
  {
    id: 3,
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    phone: "+1 (555) 345-6789",
    status: "inactive",
    lastAppointment: "2023-01-20",
    nextAppointment: null,
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    customerSince: "2022-01-10",
    notes: "",
    tags: []
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    lastAppointment: "2023-05-15",
    nextAppointment: "2023-06-10",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    customerSince: "2021-07-22",
    notes: "Prefers morning appointments",
    tags: ["Regular"]
  },
  {
    id: 5,
    name: "Olivia Davis",
    email: "olivia.d@example.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    lastAppointment: "2023-05-08",
    nextAppointment: "2023-06-25",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    customerSince: "2022-04-15",
    notes: "",
    tags: ["VIP"]
  }
];

const Clients = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState(clientsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  const handleAddClient = () => {
    // Validate form
    if (!newClient.name || !newClient.email || !newClient.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newClientData = {
      id: clients.length + 1,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      status: "active",
      lastAppointment: null,
      nextAppointment: null,
      avatar: "",
      customerSince: new Date().toISOString().split('T')[0],
      notes: newClient.notes,
      tags: ["New Client"]
    };

    setClients([...clients, newClientData]);
    setIsAddingClient(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      notes: ""
    });

    toast({
      title: "Client Added",
      description: "New client has been added successfully.",
    });
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
    toast({
      title: "Client Deleted",
      description: "Client has been removed from your list.",
    });
  };

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <DashboardLayout title="Clients">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="pl-10 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>
                    Enter the client's information to add them to your client list.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={newClient.name}
                      onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="+1 (555) 123-4567" 
                      value={newClient.phone}
                      onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input 
                      id="notes" 
                      placeholder="Any additional information" 
                      value={newClient.notes}
                      onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingClient(false)}>Cancel</Button>
                  <Button onClick={handleAddClient}>Add Client</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-6 p-4 font-medium text-muted-foreground text-sm border-b">
            <div className="md:col-span-2 flex items-center">
              <Button variant="ghost" size="sm" className="hover:bg-transparent p-0">
                <span>Name</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="hidden md:flex items-center">Status</div>
            <div className="hidden md:flex items-center">
              <Button variant="ghost" size="sm" className="hover:bg-transparent p-0">
                <span>Last Visit</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="hidden md:flex items-center">Next Appointment</div>
            <div className="flex items-center justify-end">Actions</div>
          </div>
          
          {filteredClients.length === 0 ? (
            <div className="p-8 text-center">
              <User className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No clients found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We couldn't find any clients matching your search.
              </p>
              <Button className="mt-4" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          ) : (
            filteredClients.map((client) => (
              <div key={client.id} className="grid grid-cols-1 md:grid-cols-6 p-4 border-b last:border-0 hover:bg-muted/50 transition-colors">
                <div className="md:col-span-2 flex items-center gap-3 mb-2 md:mb-0">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {client.name}
                      {client.tags.includes("VIP") && (
                        <Badge variant="secondary" className="ml-2">VIP</Badge>
                      )}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <Mail className="h-3 w-3" />
                      <span>{client.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex md:block items-center mb-2 md:mb-0">
                  <span className="text-sm text-muted-foreground md:hidden mr-2">Status:</span>
                  {client.status === "active" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      <XCircle className="h-3 w-3 mr-1" /> Inactive
                    </Badge>
                  )}
                </div>
                <div className="flex md:block items-center mb-2 md:mb-0">
                  <span className="text-sm text-muted-foreground md:hidden mr-2">Last Visit:</span>
                  <div className="text-sm flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    {formatDate(client.lastAppointment)}
                  </div>
                </div>
                <div className="flex md:block items-center mb-2 md:mb-0">
                  <span className="text-sm text-muted-foreground md:hidden mr-2">Next Appointment:</span>
                  <div className="text-sm flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    {formatDate(client.nextAppointment)}
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Button variant="ghost" size="sm" onClick={() => handleViewClient(client)}>
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Client
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Appointment
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClient(client.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Client
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{filteredClients.length} clients</p>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Client Detail Dialog */}
      {selectedClient && (
        <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Client Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 border-2 border-primary/20">
                      <AvatarImage src={selectedClient.avatar} />
                      <AvatarFallback className="text-2xl">{selectedClient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-semibold text-lg">{selectedClient.name}</h3>
                    <div className="mt-1 flex gap-1">
                      {selectedClient.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Client since {formatDate(selectedClient.customerSince)}
                    </p>
                  </div>

                  <div className="flex-1 space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${selectedClient.email}`} className="text-primary hover:underline">
                            {selectedClient.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${selectedClient.phone}`} className="hover:underline">
                            {selectedClient.phone}
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Appointment Status</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Visit:</span>
                          <span>{formatDate(selectedClient.lastAppointment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next Appointment:</span>
                          <span>{formatDate(selectedClient.nextAppointment)}</span>
                        </div>
                        <div className="pt-2">
                          <Button size="sm" className="w-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Appointment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="appointments">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No past appointments</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        This client doesn't have any recorded appointment history.
                      </p>
                      <Button className="mt-4">
                        Schedule First Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <Label htmlFor="client-notes" className="text-sm font-medium">Client Notes</Label>
                    <textarea 
                      id="client-notes"
                      className="mt-2 w-full h-32 p-3 rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue={selectedClient.notes || ""}
                      placeholder="Add notes about this client..."
                    ></textarea>
                    <Button className="mt-2">Save Notes</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="preference-1" />
                      <Label htmlFor="preference-1">Prefers morning appointments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="preference-2" />
                      <Label htmlFor="preference-2">Email reminders only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="preference-3" />
                      <Label htmlFor="preference-3">Has product allergies</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedClient(null)}>Close</Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default Clients;
