import { FileText } from 'lucide-react';
import FeedbackButton from '@/components/dashboard/FeedbackButton';

const NeedsAnalysis = () => {
  return (
    <div>
      <h1 className="text-3xl font-light text-foreground mb-6">Needs Analysis & Scorecard</h1>
      
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <FileText size={48} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Needs analysis and scorecard data will be displayed here.</p>
      </div>
      
      <FeedbackButton />
    </div>
  );
};

export default NeedsAnalysis;
