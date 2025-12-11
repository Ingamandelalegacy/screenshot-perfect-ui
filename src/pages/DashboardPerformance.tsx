import FilterPanel, { FilterState } from '@/components/dashboard/FilterPanel';
import FeedbackButton from '@/components/dashboard/FeedbackButton';
import CollapsibleSection from '@/components/dashboard/CollapsibleSection';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

// Mock data for handling time
const handlingTimeData = [
  { month: 'September 2024', value: 406 },
  { month: 'November 2024', value: 164 },
  { month: 'January 2025', value: 7 },
  { month: 'February 2025', value: 0 },
  { month: 'March 2025', value: 0 },
  { month: 'June 2025', value: 58 },
];

// Mock data for customer satisfaction
const satisfactionData = [
  { month: 'September 2024', value: 45 },
  { month: 'November 2024', value: 0 },
  { month: 'January 2025', value: 0 },
  { month: 'February 2025', value: 0 },
  { month: 'March 2025', value: 0 },
  { month: 'June 2025', value: 32 },
];

// Mock data for NPS gauge
const npsValue = 0;

// Mock data for punctuality
const punctualityData = [
  { month: 'September 2024', value: 62 },
  { month: 'November 2024', value: 87 },
];

const DashboardPerformance = () => {
  const handleSearch = (filters: FilterState) => {
    console.log('Searching performance with filters:', filters);
  };

  const handleClear = () => {
    console.log('Filters cleared');
  };

  // NPS gauge data
  const gaugeData = [
    { name: 'negative', value: 50, color: '#ef4444' },
    { name: 'neutral', value: 50, color: '#22c55e' },
  ];
  
  const needleAngle = ((npsValue + 50) / 100) * 180 - 90;

  return (
    <div>
      <h1 className="text-3xl font-light text-foreground mb-6">Performance</h1>
      
      <FilterPanel onSearch={handleSearch} onClear={handleClear} />
      
      <CollapsibleSection title="Performance" defaultOpen={true}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Handling Time */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-lg font-semibold text-foreground text-center mb-4">Handling Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={handlingTimeData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))" 
                  angle={-45} 
                  textAnchor="end"
                  interval={0}
                  fontSize={11}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Actual Value', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]}>
                  {handlingTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#6366f1" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-center text-muted-foreground mt-2">Months</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full bg-[#6366f1]"></div>
              <span className="text-sm text-muted-foreground">Actual Seconds</span>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-lg font-semibold text-foreground text-center mb-4">Customer Satisfaction</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={satisfactionData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))" 
                  angle={-45} 
                  textAnchor="end"
                  interval={0}
                  fontSize={11}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  label={{ value: 'Percentage', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Satisfaction']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Net Promoter Score Gauge */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-lg font-semibold text-foreground text-center mb-4">Net Promoter Score</h3>
            <div className="relative">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="80%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    stroke="none"
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: '40px' }}>
                <span className="text-4xl font-bold text-foreground">{npsValue}</span>
              </div>
              <div className="flex justify-between px-12 text-sm text-muted-foreground mt-[-30px]">
                <span>-50</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Punctuality */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-lg font-semibold text-foreground text-center mb-4">Punctuality</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={punctualityData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))" 
                  angle={-45} 
                  textAnchor="end"
                  interval={0}
                  fontSize={11}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  label={{ value: 'Percentage', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Punctuality']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CollapsibleSection>
      
      <FeedbackButton />
    </div>
  );
};

export default DashboardPerformance;
