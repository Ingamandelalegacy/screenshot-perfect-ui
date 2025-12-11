import { Menu } from 'lucide-react';

// South African province data
const provinceData = [
  { name: 'Northern Cape', employees: 0, x: 25, y: 50, width: 30 },
  { name: 'Western Cape', employees: 38, x: 22, y: 75, width: 18 },
  { name: 'Eastern Cape', employees: 0, x: 55, y: 72, width: 22 },
  { name: 'Free State', employees: 0, x: 45, y: 45, width: 18 },
  { name: 'KwaZulu-Natal', employees: 130, x: 68, y: 55, width: 15 },
  { name: 'Gauteng', employees: 409, x: 55, y: 32, width: 10 },
  { name: 'Mpumalanga', employees: 0, x: 68, y: 30, width: 12 },
  { name: 'Limpopo', employees: 0, x: 58, y: 15, width: 18 },
  { name: 'North West', employees: 0, x: 38, y: 30, width: 15 },
];

const getColorIntensity = (value: number, max: number) => {
  if (value === 0) return 'hsl(220, 20%, 92%)';
  const intensity = Math.min(value / max, 1);
  return `hsl(220, 30%, ${90 - intensity * 40}%)`;
};

const EmployeeLocationChart = () => {
  const maxEmployees = Math.max(...provinceData.map(p => p.employees));

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <h3 className="text-lg font-semibold text-foreground">Employee per Location</h3>
          <p className="text-sm text-muted-foreground">Provinces of South Africa (Monthly Average)</p>
        </div>
        <button className="p-2 hover:bg-muted rounded">
          <Menu size={20} className="text-muted-foreground" />
        </button>
      </div>
      
      {/* SVG Map representation */}
      <div className="relative h-[350px] w-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full max-w-2xl h-full">
          {/* Simplified South Africa shape */}
          <path
            d="M15,70 L20,45 L25,30 L35,20 L50,15 L65,12 L80,18 L85,30 L82,45 L80,60 L75,75 L60,82 L45,85 L30,82 L18,78 Z"
            fill="hsl(220, 20%, 95%)"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
          
          {/* Province labels and circles */}
          {provinceData.map((province) => (
            <g key={province.name}>
              <circle
                cx={province.x}
                cy={province.y}
                r={Math.max(2, Math.sqrt(province.employees) / 4)}
                fill={getColorIntensity(province.employees, maxEmployees)}
                stroke="hsl(var(--border))"
                strokeWidth="0.3"
              />
              <text
                x={province.x}
                y={province.y - 5}
                textAnchor="middle"
                fontSize="3"
                fill="hsl(var(--foreground))"
                fontWeight="500"
              >
                {province.name}
              </text>
              {province.employees > 0 && (
                <text
                  x={province.x}
                  y={province.y + 1.5}
                  textAnchor="middle"
                  fontSize="2.5"
                  fill="hsl(var(--muted-foreground))"
                >
                  {province.employees}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-16 h-3 bg-gradient-to-r from-[hsl(220,20%,92%)] to-[hsl(220,30%,50%)] rounded"></div>
          <span className="text-xs text-muted-foreground">0</span>
          <span className="text-xs text-muted-foreground">200</span>
          <span className="text-xs text-muted-foreground">400</span>
          <span className="text-xs text-muted-foreground">600</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLocationChart;
