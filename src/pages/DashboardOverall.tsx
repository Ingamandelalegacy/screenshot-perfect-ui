import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FilterPanel, { FilterState } from '@/components/dashboard/FilterPanel';
import CollapsibleSection from '@/components/dashboard/CollapsibleSection';
import EmployeeLocationChart from '@/components/dashboard/EmployeeLocationChart';
import FeedbackButton from '@/components/dashboard/FeedbackButton';

const DashboardOverall = () => {
  const [filters, setFilters] = useState<FilterState | null>(null);

  const handleSearch = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log('Searching with filters:', newFilters);
  };

  const handleClear = () => {
    setFilters(null);
    console.log('Filters cleared');
  };

  const handleDownloadAllCharts = () => {
    console.log('Downloading all charts...');
  };

  return (
    <div>
      <h1 className="text-3xl font-light text-foreground mb-6">Dashboard</h1>
      
      <FilterPanel onSearch={handleSearch} onClear={handleClear} />
      
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={handleDownloadAllCharts}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Download size={16} className="mr-2" />
          Download All Charts
        </Button>
      </div>
      
      <CollapsibleSection title="Demographics" defaultOpen={true}>
        <div className="py-4 text-muted-foreground">
          Demographics data will be displayed here.
        </div>
      </CollapsibleSection>
      
      <CollapsibleSection title="Employee Location" defaultOpen={true}>
        <EmployeeLocationChart />
      </CollapsibleSection>
      
      <FeedbackButton />
    </div>
  );
};

export default DashboardOverall;
