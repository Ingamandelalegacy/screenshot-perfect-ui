import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Trash2, Pencil, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FeedbackButton from '@/components/dashboard/FeedbackButton';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  partner: string;
  client: string;
  status: string;
}

// Mock data matching the screenshot
const mockUsers: User[] = [
  { id: '1', firstName: 'Caspio', lastName: 'Admin', email: 'admin.caspio@mailinator.com', phone: '1234', role: 'Admin', partner: '', client: '', status: 'Active' },
  { id: '2', firstName: 'Client', lastName: 'Caspio', email: 'client.caspio@mailinator.com', phone: '123123', role: 'Client', partner: 'Merchants', client: 'Door Dash', status: 'Active' },
  { id: '3', firstName: 'Dave', lastName: 'Caspi', email: 'dave.loresto@caspio.com', phone: '', role: 'Admin', partner: '', client: '', status: 'Active' },
  { id: '4', firstName: 'Testa', lastName: 'Caspio', email: 'test.caspio@mailinator.com', phone: '', role: 'Admin', partner: '', client: '', status: 'Active' },
  { id: '5', firstName: 'Partner', lastName: 'Caspio', email: 'partner.caspio@mailinator.com', phone: '123', role: 'Partner', partner: 'Merchants', client: '', status: 'Active' },
  { id: '6', firstName: 'Eloi', lastName: 'QA', email: 'eloisa.juego+1@caspio.com', phone: '987-654-3210', role: 'Admin', partner: '', client: '', status: 'Active' },
  { id: '7', firstName: 'test', lastName: 'Mail', email: 'MLtest@mailinator.com', phone: '', role: 'Admin', partner: '', client: '', status: 'Active' },
  { id: '8', firstName: 'TestDoor', lastName: 'Dasher', email: 'testdoordasher@mailinator.com', phone: '123123', role: 'Client', partner: 'Merchants', client: 'Door Dash', status: 'Active' },
];

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users] = useState<User[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: '',
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSearch = () => {
    // Filter logic would go here
    console.log('Searching with filters:', filters);
  };

  const handleReset = () => {
    setFilters({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      status: '',
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesFirstName = !filters.firstName || user.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
    const matchesLastName = !filters.lastName || user.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
    const matchesEmail = !filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase());
    const matchesRole = !filters.role || filters.role === 'any' || user.role === filters.role;
    const matchesStatus = !filters.status || filters.status === 'any' || user.status === filters.status;
    return matchesFirstName && matchesLastName && matchesEmail && matchesRole && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-light text-foreground">Manage Users</h1>
        <Button 
          onClick={() => navigate('/manage-users/add')}
          className="bg-[#0066cc] hover:bg-[#0055aa] text-white"
        >
          <UserPlus size={18} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Filter Panel */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
            <Input
              value={filters.firstName}
              onChange={(e) => setFilters({ ...filters, firstName: e.target.value })}
              className="bg-background border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
            <Input
              value={filters.lastName}
              onChange={(e) => setFilters({ ...filters, lastName: e.target.value })}
              className="bg-background border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <Input
              value={filters.email}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
              className="bg-background border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Role</label>
            <Select value={filters.role} onValueChange={(value) => setFilters({ ...filters, role: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="-- Any --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">-- Any --</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Client">Client</SelectItem>
                <SelectItem value="Partner">Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="-- Any --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">-- Any --</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSearch} className="bg-[#008080] hover:bg-[#006666] text-white">
              Search
            </Button>
            <Button onClick={handleReset} className="bg-accent hover:bg-accent/80 text-white">
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-4 text-sm">
        <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <Trash2 size={14} />
          Delete
        </button>
        <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <Pencil size={14} />
          Edit
        </button>
        <button className="flex items-center gap-1 text-[#008080] hover:text-[#006666]">
          <LayoutGrid size={14} />
          Grid Edit
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-sidebar hover:bg-sidebar">
              <TableHead className="w-12 text-sidebar-foreground">
                <Checkbox
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-sidebar-foreground font-semibold">First Name</TableHead>
              <TableHead className="text-sidebar-foreground font-semibold">Last Name</TableHead>
              <TableHead className="text-sidebar-foreground font-semibold">Email</TableHead>
              <TableHead className="text-sidebar-foreground font-semibold">Phone</TableHead>
              <TableHead className="text-sidebar-foreground font-semibold">Role</TableHead>
              <TableHead className="text-sidebar-foreground font-semibold">Partner</TableHead>
              <TableHead className="text-sidebar-foreground font-semibold">Client</TableHead>
              <TableHead className="text-sidebar-foreground font-semibold">Status</TableHead>
              <TableHead className="text-sidebar-foreground font-semibold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="text-foreground">{user.firstName}</TableCell>
                <TableCell className="text-foreground">{user.lastName}</TableCell>
                <TableCell className="text-[#0066cc]">{user.email}</TableCell>
                <TableCell className="text-foreground">{user.phone}</TableCell>
                <TableCell className="text-foreground">{user.role}</TableCell>
                <TableCell className="text-foreground">{user.partner}</TableCell>
                <TableCell className="text-foreground">{user.client}</TableCell>
                <TableCell className="text-foreground">{user.status}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-[#008080] hover:bg-[#006666] text-white text-xs px-3 py-1 h-7">
                      Details
                    </Button>
                    <Button size="sm" className="bg-[#0066cc] hover:bg-[#0055aa] text-white text-xs px-3 py-1 h-7">
                      Edit
                    </Button>
                    <Button size="sm" className="bg-[#cc3366] hover:bg-[#aa2255] text-white text-xs px-3 py-1 h-7">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <FeedbackButton />
    </div>
  );
};

export default ManageUsers;
