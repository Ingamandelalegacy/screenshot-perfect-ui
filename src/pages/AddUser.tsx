import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import FeedbackButton from '@/components/dashboard/FeedbackButton';

const AddUser = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Integrate with Supabase auth.signUp when Cloud is enabled
      // For now, simulate the signup process
      console.log('Creating user with data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('User created successfully!');
      navigate('/manage-users');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-light text-foreground mb-4">Add User</h1>

      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/manage-users" className="text-[#008080] hover:underline">
          Manage Users
        </Link>
        <span className="text-muted-foreground mx-2">/</span>
        <span className="text-muted-foreground">Add User</span>
      </div>

      {/* Form Card */}
      <div className="bg-card rounded-lg border border-border overflow-hidden max-w-3xl">
        {/* Section Header */}
        <div className="bg-[#1a1f3c] px-6 py-3 rounded-t-lg">
          <h2 className="text-white font-semibold">Details</h2>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name <span className="text-destructive">*</span>
              </label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={`bg-background border-border ${errors.firstName ? 'border-destructive' : ''}`}
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <p className="text-destructive text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Name <span className="text-destructive">*</span>
              </label>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={`bg-background border-border ${errors.lastName ? 'border-destructive' : ''}`}
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <p className="text-destructive text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`bg-background border-border ${errors.email ? 'border-destructive' : ''}`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background border-border"
                disabled={isSubmitting}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Role <span className="text-destructive">*</span>
              </label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                disabled={isSubmitting}
              >
                <SelectTrigger className={`bg-background border-border ${errors.role ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="-- Select --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Client">Client</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-destructive text-sm mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <Button 
              type="submit" 
              className="bg-sidebar hover:bg-sidebar/90 text-sidebar-foreground px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>

      <FeedbackButton />
    </div>
  );
};

export default AddUser;
