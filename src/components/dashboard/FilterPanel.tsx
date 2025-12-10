import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface FilterPanelProps {
  onSearch: (filters: FilterState) => void;
  onClear: () => void;
}

export interface FilterState {
  partner: string;
  client: string;
  province: string;
  location: string;
  gender: string;
  race: string;
  age: string;
  tenure: string;
  dateFrom: string;
  dateTo: string;
}

const initialFilters: FilterState = {
  partner: '',
  client: '',
  province: '',
  location: '',
  gender: '',
  race: '',
  age: '',
  tenure: '',
  dateFrom: '',
  dateTo: '',
};

const FilterPanel = ({ onSearch, onClear }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters(initialFilters);
    onClear();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Partner</label>
          <Select value={filters.partner} onValueChange={(v) => handleChange('partner', v)}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="-- Any --" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="any">-- Any --</SelectItem>
              <SelectItem value="partner1">Partner 1</SelectItem>
              <SelectItem value="partner2">Partner 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            Client <HelpCircle size={14} className="text-muted-foreground" />
          </label>
          <Select value={filters.client} onValueChange={(v) => handleChange('client', v)}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="-- Any --" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="any">-- Any --</SelectItem>
              <SelectItem value="client1">Client 1</SelectItem>
              <SelectItem value="client2">Client 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            Province <HelpCircle size={14} className="text-muted-foreground" />
          </label>
          <Select value={filters.province} onValueChange={(v) => handleChange('province', v)}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="-- Any --" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="any">-- Any --</SelectItem>
              <SelectItem value="gauteng">Gauteng</SelectItem>
              <SelectItem value="western-cape">Western Cape</SelectItem>
              <SelectItem value="kwazulu-natal">KwaZulu-Natal</SelectItem>
              <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
              <SelectItem value="free-state">Free State</SelectItem>
              <SelectItem value="limpopo">Limpopo</SelectItem>
              <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
              <SelectItem value="north-west">North West</SelectItem>
              <SelectItem value="northern-cape">Northern Cape</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            Location <HelpCircle size={14} className="text-muted-foreground" />
          </label>
          <Select value={filters.location} onValueChange={(v) => handleChange('location', v)}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="-- Any --" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="any">-- Any --</SelectItem>
              <SelectItem value="location1">Location 1</SelectItem>
              <SelectItem value="location2">Location 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <Select value={filters.gender} onValueChange={(v) => handleChange('gender', v)}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="-- Any --" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="any">-- Any --</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Race</label>
          <Select value={filters.race} onValueChange={(v) => handleChange('race', v)}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="-- Any --" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="any">-- Any --</SelectItem>
              <SelectItem value="african">African</SelectItem>
              <SelectItem value="coloured">Coloured</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="white">White</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <Select value={filters.age} onValueChange={(v) => handleChange('age', v)}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="-- Any --" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="any">-- Any --</SelectItem>
              <SelectItem value="18-25">18-25</SelectItem>
              <SelectItem value="26-35">26-35</SelectItem>
              <SelectItem value="36-45">36-45</SelectItem>
              <SelectItem value="46-55">46-55</SelectItem>
              <SelectItem value="56+">56+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tenure</label>
          <Select value={filters.tenure} onValueChange={(v) => handleChange('tenure', v)}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="-- Any --" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="any">-- Any --</SelectItem>
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date (from)</label>
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleChange('dateFrom', e.target.value)}
            className="filter-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date (to)</label>
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleChange('dateTo', e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={handleSearch} className="bg-foreground hover:bg-foreground/90 text-card">
          Search
        </Button>
        <Button onClick={handleClear} variant="destructive">
          Clear
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
