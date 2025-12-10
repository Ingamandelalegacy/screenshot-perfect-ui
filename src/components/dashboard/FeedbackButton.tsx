import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeedbackButton = () => {
  return (
    <Button
      className="fixed bottom-4 right-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
    >
      Submit UAT Feedback
      <ExternalLink size={16} className="ml-2" />
    </Button>
  );
};

export default FeedbackButton;
