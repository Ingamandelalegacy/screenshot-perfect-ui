import { Menu } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { province: 'EC', value: 180 },
  { province: 'FS', value: 120 },
  { province: 'GP', value: 450 },
  { province: 'KZN', value: 320 },
  { province: 'LP', value: 200 },
  { province: 'MP', value: 150 },
  { province: 'NC', value: 80 },
  { province: 'NW', value: 140 },
  { province: 'WC', value: 280 },
];

const EmployeeLocationChart = () => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <h3 className="text-lg font-semibold text-primary">Employee per Location</h3>
          <p className="text-sm text-muted-foreground">Provinces of South Africa (Monthly Average)</p>
        </div>
        <button className="p-2 hover:bg-muted rounded">
          <Menu size={20} className="text-muted-foreground" />
        </button>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="province" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '4px',
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeLocationChart;
