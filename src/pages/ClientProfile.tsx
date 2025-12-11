import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ClientProfile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1a1f3c]">Client Profile</h1>
      
      {/* Breadcrumb */}
      <div className="bg-muted/50 rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/dashboard/overall" className="text-foreground hover:underline">Home</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Client Profile</span>
        </div>
      </div>

      {/* Filter Card */}
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Client</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-- Any --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">-- Any --</SelectItem>
                  <SelectItem value="client1">Client 1</SelectItem>
                  <SelectItem value="client2">Client 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Province</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-- Any --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">-- Any --</SelectItem>
                  <SelectItem value="gauteng">Gauteng</SelectItem>
                  <SelectItem value="western-cape">Western Cape</SelectItem>
                  <SelectItem value="kwazulu-natal">KwaZulu-Natal</SelectItem>
                  <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
                  <SelectItem value="limpopo">Limpopo</SelectItem>
                  <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
                  <SelectItem value="north-west">North West</SelectItem>
                  <SelectItem value="free-state">Free State</SelectItem>
                  <SelectItem value="northern-cape">Northern Cape</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-- Any --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">-- Any --</SelectItem>
                  <SelectItem value="johannesburg">Johannesburg</SelectItem>
                  <SelectItem value="cape-town">Cape Town</SelectItem>
                  <SelectItem value="durban">Durban</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Gender</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-- Any --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">-- Any --</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Race</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-- Any --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">-- Any --</SelectItem>
                  <SelectItem value="african">African</SelectItem>
                  <SelectItem value="coloured">Coloured</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Age</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-- Any --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">-- Any --</SelectItem>
                  <SelectItem value="18-25">18-25</SelectItem>
                  <SelectItem value="26-35">26-35</SelectItem>
                  <SelectItem value="36-45">36-45</SelectItem>
                  <SelectItem value="46-55">46-55</SelectItem>
                  <SelectItem value="56+">56+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tenure</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-- Any --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">-- Any --</SelectItem>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Date (from)</Label>
              <Input type="date" className="bg-background" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Date (to)</Label>
              <Input type="date" className="bg-background" />
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button className="bg-[#1a1f3c] hover:bg-[#2a2f4c] text-white px-8">
              Search
            </Button>
            <Button variant="destructive" className="px-8">
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Results placeholder */}
      <div className="bg-card rounded-lg shadow-sm p-6">
        <p className="text-muted-foreground text-center">
          Use the filters above to search for client profiles
        </p>
      </div>
    </div>
  );
};

export default ClientProfile;
