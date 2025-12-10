import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const ChangePassword = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.newPassword.length < 6 || !/\d/.test(formData.newPassword)) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters with 1 number",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement actual password change with Lovable Cloud
    toast({
      title: "Success",
      description: "Password updated successfully",
    });
    
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1a1f3c]">Change Password</h1>
      
      {/* Breadcrumb */}
      <div className="bg-muted/50 rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/dashboard/overall" className="text-foreground hover:underline">Home</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Change Password</span>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-card rounded-lg shadow-sm overflow-hidden max-w-3xl">
        <div className="bg-[#1a1f3c] px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Details</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <p className="text-sm text-primary">
            For security purposes please enter your current password first.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              Current Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              required
              className="max-w-md"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">
              New Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="At least 6 characters with 1 number"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              required
              className="max-w-md"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="max-w-md"
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit"
              className="bg-[#7c6fb0] hover:bg-[#6a5f9a] text-white px-8"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
