import { Menu } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { useState, useEffect } from 'react';

// Province data with coordinates for markers
const provinceData: Record<string, { employees: number; coordinates: [number, number] }> = {
  'Eastern Cape': { employees: 0, coordinates: [26.5, -32.0] },
  'Free State': { employees: 0, coordinates: [26.5, -29.0] },
  'Gauteng': { employees: 409, coordinates: [28.0, -26.0] },
  'KwaZulu-Natal': { employees: 130, coordinates: [30.5, -29.5] },
  'Limpopo': { employees: 0, coordinates: [29.5, -23.5] },
  'Mpumalanga': { employees: 0, coordinates: [30.0, -25.5] },
  'Northern Cape': { employees: 0, coordinates: [21.0, -29.0] },
  'North West': { employees: 0, coordinates: [25.5, -26.0] },
  'Western Cape': { employees: 38, coordinates: [19.5, -33.5] },
};

// Map province names from various GeoJSON formats
const normalizeProvinceName = (name: string): string => {
  const normalized = name?.toLowerCase().trim() || '';
  const mappings: Record<string, string> = {
    'eastern cape': 'Eastern Cape',
    'free state': 'Free State',
    'gauteng': 'Gauteng',
    'kwazulu-natal': 'KwaZulu-Natal',
    'kwazulu natal': 'KwaZulu-Natal',
    'kzn': 'KwaZulu-Natal',
    'limpopo': 'Limpopo',
    'mpumalanga': 'Mpumalanga',
    'northern cape': 'Northern Cape',
    'north west': 'North West',
    'north-west': 'North West',
    'northwest': 'North West',
    'western cape': 'Western Cape',
  };
  return mappings[normalized] || name;
};

const getColorIntensity = (value: number, max: number): string => {
  if (value === 0) return 'hsl(220, 25%, 90%)';
  const intensity = Math.min(value / max, 1);
  const lightness = 75 - intensity * 35;
  return `hsl(220, 55%, ${lightness}%)`;
};

const EmployeeLocationChart = () => {
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [geoData, setGeoData] = useState<object | null>(null);
  
  const maxEmployees = Math.max(...Object.values(provinceData).map(p => p.employees));

  useEffect(() => {
    // Fetch South Africa provinces TopoJSON
    fetch('https://code.highcharts.com/mapdata/countries/za/za-all.topo.json')
      .then(response => response.json())
      .then(data => {
        setGeoData(data);
      })
      .catch(err => console.error('Failed to load map data:', err));
  }, []);

  if (!geoData) {
    return (
      <div className="py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 text-center">
            <h3 className="text-lg font-semibold text-foreground">Employee per Location</h3>
            <p className="text-sm text-muted-foreground">Provinces of South Africa (Monthly Average)</p>
          </div>
        </div>
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading map...</div>
        </div>
      </div>
    );
  }

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
      <div className="relative h-[400px] w-full">
        {tooltipContent && (
          <div 
            className="absolute z-20 bg-popover border border-border rounded-md px-3 py-2 shadow-lg pointer-events-none text-sm"
            style={{ left: tooltipPosition.x, top: tooltipPosition.y, transform: 'translate(-50%, -120%)' }}
          >
            <span className="font-medium text-foreground">{tooltipContent}</span>
          </div>
        )}
        
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1100,
            center: [25, -29],
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup center={[25, -29]} zoom={1}>
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const props = geo.properties;
                  const rawName = props['hc-a2'] || props.name || props.NAME_1 || props.NAME || '';
                  
                  // Map Highcharts codes to province names
                  const codeToName: Record<string, string> = {
                    'EC': 'Eastern Cape',
                    'FS': 'Free State',
                    'GT': 'Gauteng',
                    'NL': 'KwaZulu-Natal',
                    'LP': 'Limpopo',
                    'MP': 'Mpumalanga',
                    'NC': 'Northern Cape',
                    'NW': 'North West',
                    'WC': 'Western Cape',
                  };
                  
                  const provinceName = codeToName[rawName] || normalizeProvinceName(rawName);
                  const data = provinceData[provinceName];
                  const employees = data?.employees || 0;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getColorIntensity(employees, maxEmployees)}
                      stroke="hsl(220, 20%, 70%)"
                      strokeWidth={0.8}
                      style={{
                        default: { outline: 'none' },
                        hover: { 
                          fill: employees > 0 ? 'hsl(220, 60%, 50%)' : 'hsl(220, 25%, 82%)',
                          outline: 'none',
                          cursor: 'pointer',
                          strokeWidth: 1.5
                        },
                        pressed: { outline: 'none' },
                      }}
                      onMouseEnter={(evt) => {
                        const { clientX, clientY } = evt;
                        const container = (evt.target as SVGElement).closest('.relative');
                        if (container) {
                          const rect = container.getBoundingClientRect();
                          setTooltipPosition({
                            x: clientX - rect.left,
                            y: clientY - rect.top
                          });
                        }
                        setTooltipContent(`${provinceName}: ${employees} employees`);
                      }}
                      onMouseMove={(evt) => {
                        const { clientX, clientY } = evt;
                        const container = (evt.target as SVGElement).closest('.relative');
                        if (container) {
                          const rect = container.getBoundingClientRect();
                          setTooltipPosition({
                            x: clientX - rect.left,
                            y: clientY - rect.top
                          });
                        }
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
                    r={Math.max(5, Math.sqrt(data.employees) / 2.5)}
                    fill="hsl(25, 90%, 55%)"
                    stroke="#fff"
                    strokeWidth={1.5}
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
                  />
                  <text
                    textAnchor="middle"
                    y={-Math.max(8, Math.sqrt(data.employees) / 2.5) - 4}
                    style={{ 
                      fontFamily: 'system-ui', 
                      fill: 'hsl(220, 30%, 25%)',
                      fontSize: '9px',
                      fontWeight: 600
                    }}
                  >
                    {name}
                  </text>
                  <text
                    textAnchor="middle"
                    y={3}
                    style={{ 
                      fontFamily: 'system-ui', 
                      fill: '#fff',
                      fontSize: '8px',
                      fontWeight: 700
                    }}
                  >
                    {data.employees}
                  </text>
                </Marker>
              )
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Employees:</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(220, 25%, 90%)' }}></div>
            <span className="text-xs text-muted-foreground">0</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(220, 55%, 60%)' }}></div>
            <span className="text-xs text-muted-foreground">200</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(220, 55%, 40%)' }}></div>
            <span className="text-xs text-muted-foreground">400+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLocationChart;
