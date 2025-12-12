import { Menu } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useState } from 'react';

// South African provinces TopoJSON from deldersveld collection
const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/south-africa/south-africa-provinces.json';

// Province data with coordinates for markers
const provinceData: Record<string, { employees: number; coordinates: [number, number] }> = {
  'Eastern Cape': { employees: 0, coordinates: [26.5, -32.0] },
  'Free State': { employees: 0, coordinates: [26.5, -29.0] },
  'Gauteng': { employees: 409, coordinates: [28.0, -26.0] },
  'KwaZulu-Natal': { employees: 130, coordinates: [30.5, -29.5] },
  'Limpopo': { employees: 0, coordinates: [29.5, -23.5] },
  'Mpumalanga': { employees: 0, coordinates: [30.0, -25.5] },
  'Northern Cape': { employees: 0, coordinates: [21.0, -29.0] },
  'North West': { employees: 0, coordinates: [25.5, -26.5] },
  'Western Cape': { employees: 38, coordinates: [19.5, -33.5] },
};

// Map province names from GeoJSON to our data
const getProvinceKey = (geoName: string): string => {
  const mappings: Record<string, string> = {
    'Eastern Cape': 'Eastern Cape',
    'Free State': 'Free State',
    'Gauteng': 'Gauteng',
    'KwaZulu-Natal': 'KwaZulu-Natal',
    'Kwazulu-Natal': 'KwaZulu-Natal',
    'Limpopo': 'Limpopo',
    'Mpumalanga': 'Mpumalanga',
    'Northern Cape': 'Northern Cape',
    'North West': 'North West',
    'North-West': 'North West',
    'Western Cape': 'Western Cape',
  };
  return mappings[geoName] || geoName;
};

const getColorIntensity = (value: number, max: number): string => {
  if (value === 0) return 'hsl(220, 20%, 92%)';
  const intensity = Math.min(value / max, 1);
  // Blue gradient: from light to dark blue
  const lightness = 85 - intensity * 45;
  return `hsl(220, 50%, ${lightness}%)`;
};

const EmployeeLocationChart = () => {
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const maxEmployees = Math.max(...Object.values(provinceData).map(p => p.employees));

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
      
      {/* Map Container */}
      <div className="relative h-[400px] w-full flex items-center justify-center">
        {tooltipContent && (
          <div 
            className="absolute z-10 bg-popover border border-border rounded-md px-3 py-2 shadow-lg pointer-events-none"
            style={{ left: tooltipPosition.x, top: tooltipPosition.y, transform: 'translate(-50%, -100%)' }}
          >
            <span className="text-sm font-medium text-foreground">{tooltipContent}</span>
          </div>
        )}
        
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1200,
            center: [25, -29],
          }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const provinceName = geo.properties.NAME_1 || geo.properties.name || '';
                const mappedName = getProvinceKey(provinceName);
                const data = provinceData[mappedName];
                const employees = data?.employees || 0;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getColorIntensity(employees, maxEmployees)}
                    stroke="hsl(var(--border))"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { 
                        fill: employees > 0 ? 'hsl(220, 60%, 50%)' : 'hsl(220, 20%, 85%)',
                        outline: 'none',
                        cursor: 'pointer'
                      },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={(evt) => {
                      const rect = (evt.target as SVGElement).getBoundingClientRect();
                      const container = (evt.target as SVGElement).closest('.relative')?.getBoundingClientRect();
                      if (container) {
                        setTooltipPosition({
                          x: rect.left + rect.width / 2 - container.left,
                          y: rect.top - container.top - 10
                        });
                      }
                      setTooltipContent(`${mappedName}: ${employees} employees`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                  />
                );
              })
            }
          </Geographies>
          
          {/* Province markers with employee counts */}
          {Object.entries(provinceData).map(([name, data]) => (
            data.employees > 0 && (
              <Marker key={name} coordinates={data.coordinates}>
                <circle
                  r={Math.max(6, Math.sqrt(data.employees) / 2)}
                  fill="hsl(220, 70%, 45%)"
                  stroke="#fff"
                  strokeWidth={2}
                  opacity={0.9}
                />
                <text
                  textAnchor="middle"
                  y={-Math.max(8, Math.sqrt(data.employees) / 2) - 6}
                  style={{ 
                    fontFamily: 'system-ui', 
                    fill: 'hsl(var(--foreground))',
                    fontSize: '11px',
                    fontWeight: 600
                  }}
                >
                  {name}
                </text>
                <text
                  textAnchor="middle"
                  y={4}
                  style={{ 
                    fontFamily: 'system-ui', 
                    fill: '#fff',
                    fontSize: '10px',
                    fontWeight: 600
                  }}
                >
                  {data.employees}
                </text>
              </Marker>
            )
          ))}
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-24 h-4 bg-gradient-to-r from-[hsl(220,20%,92%)] via-[hsl(220,50%,65%)] to-[hsl(220,50%,40%)] rounded"></div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>0</span>
            <span>200</span>
            <span>400+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLocationChart;
