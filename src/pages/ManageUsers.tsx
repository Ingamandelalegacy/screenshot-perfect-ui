import { Users } from 'lucide-react';
import FeedbackButton from '@/components/dashboard/FeedbackButton';

const ManageUsers = () => {
  return (
    <div>
      <h1 className="text-3xl font-light text-foreground mb-6">Manage Users</h1>
      
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Users size={48} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">User management interface will be displayed here.</p>
      </div>
      
      <FeedbackButton />
    </div>
  );
};

export default ManageUsers;
