import { ClipboardList } from 'lucide-react';
import FeedbackButton from '@/components/dashboard/FeedbackButton';

const NeedsAnalysisRequests = () => {
  return (
    <div>
      <h1 className="text-3xl font-light text-foreground mb-6">Needs Analysis & Scorecard Requests</h1>
      
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <ClipboardList size={48} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Needs analysis requests will be displayed here.</p>
      </div>
      
      <FeedbackButton />
    </div>
  );
};

export default NeedsAnalysisRequests;
