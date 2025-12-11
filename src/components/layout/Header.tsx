import { User, Settings, Lock, LogOut, ChevronDown, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUserRole, isAdmin, isPartner } = useUser();

  const handleLogout = () => {
    // TODO: Implement actual logout with Lovable Cloud
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  const handleSwitchRole = () => {
    const newRole = isAdmin ? 'partner' : 'admin';
    setUserRole(newRole);
    toast({
      title: "Role switched",
      description: `Now viewing as ${newRole === 'admin' ? 'Admin' : 'Partner'}`,
    });
    navigate('/dashboard/overall');
  };

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-end px-6">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
          <span className="text-sm text-foreground">{user.name}</span>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User size={20} className="text-muted-foreground" />
          </div>
          <ChevronDown size={16} className="text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
            <Settings size={16} className="mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/change-password')} className="cursor-pointer">
            <Lock size={16} className="mr-2" />
            Change Password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSwitchRole} className="cursor-pointer">
            <Users size={16} className="mr-2" />
            Switch to {isAdmin ? 'Partner' : 'Admin'} View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut size={16} className="mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;