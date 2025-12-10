import FilterPanel, { FilterState } from '@/components/dashboard/FilterPanel';
import FeedbackButton from '@/components/dashboard/FeedbackButton';

const DashboardDemographics = () => {
  const handleSearch = (filters: FilterState) => {
    console.log('Searching demographics with filters:', filters);
  };

  const handleClear = () => {
    console.log('Filters cleared');
  };

  return (
    <div>
      <h1 className="text-3xl font-light text-foreground mb-6">Demographics</h1>
      
      <FilterPanel onSearch={handleSearch} onClear={handleClear} />
      
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Demographics analysis and charts will be displayed here.</p>
      </div>
      
      <FeedbackButton />
    </div>
  );
};

export default DashboardDemographics;
