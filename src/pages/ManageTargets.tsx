import { Target } from 'lucide-react';
import FeedbackButton from '@/components/dashboard/FeedbackButton';

const ManageTargets = () => {
  return (
    <div>
      <h1 className="text-3xl font-light text-foreground mb-6">Manage Targets</h1>
      
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Target size={48} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Target management interface will be displayed here.</p>
      </div>
      
      <FeedbackButton />
    </div>
  );
};

export default ManageTargets;
