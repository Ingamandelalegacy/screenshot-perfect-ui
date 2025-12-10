import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Profile = () => {
  // Mock user data - will be replaced with real data when Lovable Cloud is enabled
  const user = {
    role: 'Partner',
    name: 'Admin UAT User 3',
    email: 'admin_uatuser3@mailinator.com',
    phone: ''
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1a1f3c]">Profile</h1>
      
      {/* Breadcrumb */}
      <div className="bg-muted/50 rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/dashboard/overall" className="text-foreground hover:underline">Home</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Profile</span>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-card rounded-lg shadow-sm overflow-hidden max-w-3xl">
        <div className="bg-[#1a1f3c] px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Details</h2>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-[#7c6fb0] hover:bg-[#6a5f9a] text-white"
          >
            Edit
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm font-semibold text-foreground">Role</p>
            <p className="text-sm text-primary">{user.role}</p>
          </div>
          
          <div>
            <p className="text-sm font-semibold text-foreground">Name</p>
            <p className="text-sm text-primary">{user.name}</p>
          </div>
          
          <div>
            <p className="text-sm font-semibold text-foreground">Email</p>
            <p className="text-sm text-primary">{user.email}</p>
          </div>
          
          <div>
            <p className="text-sm font-semibold text-foreground">Phone</p>
            <p className="text-sm text-primary">{user.phone || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
