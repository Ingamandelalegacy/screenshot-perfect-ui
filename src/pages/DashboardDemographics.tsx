import FilterPanel, { FilterState } from '@/components/dashboard/FilterPanel';
import FeedbackButton from '@/components/dashboard/FeedbackButton';
import CollapsibleSection from '@/components/dashboard/CollapsibleSection';
import EmployeeLocationChart from '@/components/dashboard/EmployeeLocationChart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Legend,
} from 'recharts';

// Mock data for headcount by client
const headcountData = [
  { name: 'AC', value: 6 },
  { name: 'B & Q', value: 0 },
  { name: 'Capital One', value: 214, highlight: 62 },
  { name: 'Daily Pay', value: 2 },
  { name: 'Door Dash', value: 195, highlight: 68 },
  { name: 'First Central Insurance', value: 1 },
  { name: 'Mason', value: 4 },
  { name: 'Nesting', value: 2 },
  { name: 'Teleperformance SA', value: 8 },
];

// Mock data for province group
const provinceData = [
  { province: 'Eastern Cape', bar: 0, line: 0 },
  { province: 'Free State', bar: 0, line: 0 },
  { province: 'Gauteng', bar: 409, line: 409 },
  { province: 'KwaZulu-Natal', bar: 130, line: 130 },
  { province: 'Limpopo', bar: 0, line: 0 },
  { province: 'Mpumalanga', bar: 0, line: 0 },
  { province: 'North West', bar: 0, line: 0 },
  { province: 'Northern Cape', bar: 0, line: 0 },
  { province: 'Western Cape', bar: 38, line: 38 },
];

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
      
      {/* Employee Location Map */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <EmployeeLocationChart />
      </div>
      
      {/* Gender Section */}
      <CollapsibleSection title="Gender" defaultOpen={true}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Headcount by Client */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-lg font-semibold text-foreground text-center mb-1">Headcount</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">(Monthly Average)</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                layout="vertical"
                data={headcountData}
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
                <Bar dataKey="highlight" fill="#22d3ee" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Headcount Province Group */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-lg font-semibold text-foreground text-center mb-1">Headcount Province Group</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">(Monthly Average)</p>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart
                data={provinceData}
                margin={{ top: 5, right: 20, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="province" 
                  stroke="hsl(var(--muted-foreground))" 
                  angle={-45} 
                  textAnchor="end" 
                  interval={0}
                  fontSize={11}
                  height={60}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="bar" name="Headcount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="line" name="Trend" stroke="#1e293b" strokeWidth={2} dot />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CollapsibleSection>
      
      <FeedbackButton />
    </div>
  );
};

export default DashboardDemographics;
