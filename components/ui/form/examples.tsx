import React from 'react';
import { 
  Input, 
  Label, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio, 
  RadioGroup,
  FormField 
} from './index';
import { Button } from '../button';
import { Stack, Grid, Box } from '../layout';
import { 
  Search, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  Calendar,
  CreditCard,
  AlertCircle
} from 'lucide-react';

export const FormExamples = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    bio: '',
    role: '',
    newsletter: false,
    plan: 'free'
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation example
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="space-y-12 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Form Components</h1>

      {/* Input Variants */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Input Variants</h2>
        
        <Grid cols={2} gap="lg">
          <FormField label="Default Input">
            <Input placeholder="Enter text..." />
          </FormField>

          <FormField label="Filled Input">
            <Input variant="filled" placeholder="Filled variant" />
          </FormField>

          <FormField label="Error State" error="This field has an error">
            <Input variant="error" placeholder="Error input" />
          </FormField>

          <FormField label="Success State">
            <Input variant="success" placeholder="Valid input" defaultValue="Valid data" />
          </FormField>
        </Grid>
      </section>

      {/* Input Sizes */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Input Sizes</h2>
        
        <Stack gap="md">
          <Input inputSize="sm" placeholder="Small input" />
          <Input inputSize="md" placeholder="Medium input (default)" />
          <Input inputSize="lg" placeholder="Large input" />
        </Stack>
      </section>

      {/* Input with Icons */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Inputs with Icons</h2>
        
        <Grid cols={2} gap="lg">
          <FormField label="Search">
            <Input 
              leftIcon={<Search size={18} />} 
              placeholder="Search..." 
            />
          </FormField>

          <FormField label="Email">
            <Input 
              type="email"
              leftIcon={<Mail size={18} />} 
              placeholder="email@example.com" 
            />
          </FormField>

          <FormField label="Password">
            <Input 
              type={showPassword ? 'text' : 'password'}
              leftIcon={<Lock size={18} />}
              rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              placeholder="Enter password"
            />
          </FormField>

          <FormField label="Username">
            <Input 
              leftIcon={<User size={18} />}
              placeholder="@username"
            />
          </FormField>
        </Grid>
      </section>

      {/* Textarea */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Textarea</h2>
        
        <Grid cols={2} gap="lg">
          <FormField label="Default Textarea">
            <Textarea placeholder="Enter your message..." />
          </FormField>

          <FormField label="With Character Count">
            <Textarea 
              placeholder="Limited to 200 characters" 
              maxLength={200}
              showCount
            />
          </FormField>

          <FormField label="Non-resizable">
            <Textarea 
              placeholder="Fixed size textarea" 
              resize="none"
            />
          </FormField>

          <FormField label="Large Text">
            <Textarea 
              textareaSize="lg"
              placeholder="Large text size" 
              rows={4}
            />
          </FormField>
        </Grid>
      </section>

      {/* Select */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Select</h2>
        
        <Grid cols={2} gap="lg">
          <FormField label="Role Selection">
            <Select
              placeholder="Select a role"
              options={[
                { value: 'developer', label: 'Developer' },
                { value: 'designer', label: 'Designer' },
                { value: 'manager', label: 'Manager' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </FormField>

          <FormField label="Country">
            <Select
              options={[
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
                { value: 'au', label: 'Australia' },
              ]}
              defaultValue="us"
            />
          </FormField>

          <FormField label="Plan Selection" error="Please select a plan">
            <Select
              variant="error"
              placeholder="Choose a plan"
              options={[
                { value: 'free', label: 'Free - $0/month' },
                { value: 'pro', label: 'Pro - $19/month' },
                { value: 'team', label: 'Team - $49/month' },
                { value: 'enterprise', label: 'Enterprise - Custom', disabled: true },
              ]}
            />
          </FormField>

          <FormField label="Size Options">
            <Select
              selectSize="lg"
              options={[
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' },
                { value: 'xl', label: 'Extra Large' },
              ]}
            />
          </FormField>
        </Grid>
      </section>

      {/* Checkbox */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Checkbox</h2>
        
        <Stack gap="lg">
          <Box className="space-y-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">I agree to the terms and conditions</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox defaultChecked />
              <span className="text-sm">Subscribe to newsletter</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox variant="error" />
              <span className="text-sm text-red-400">Required checkbox</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer opacity-50">
              <Checkbox disabled />
              <span className="text-sm">Disabled option</span>
            </label>
          </Box>

          <Box className="p-4 bg-gray-900 rounded-lg">
            <h3 className="font-medium mb-3">Notification Preferences</h3>
            <Stack gap="sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox defaultChecked />
                <span className="text-sm">Email notifications</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox defaultChecked />
                <span className="text-sm">SMS notifications</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox />
                <span className="text-sm">Push notifications</span>
              </label>
            </Stack>
          </Box>
        </Stack>
      </section>

      {/* Radio */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Radio Buttons</h2>
        
        <Grid cols={2} gap="lg">
          <Box>
            <h3 className="font-medium mb-3">Subscription Plan</h3>
            <RadioGroup>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio name="plan" value="free" defaultChecked />
                <span className="text-sm">Free Plan</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio name="plan" value="pro" />
                <span className="text-sm">Pro Plan - $19/month</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio name="plan" value="team" />
                <span className="text-sm">Team Plan - $49/month</span>
              </label>
            </RadioGroup>
          </Box>

          <Box>
            <h3 className="font-medium mb-3">Theme Preference</h3>
            <RadioGroup orientation="horizontal">
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio name="theme" value="light" />
                <span className="text-sm">Light</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio name="theme" value="dark" defaultChecked />
                <span className="text-sm">Dark</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio name="theme" value="system" />
                <span className="text-sm">System</span>
              </label>
            </RadioGroup>
          </Box>
        </Grid>
      </section>

      {/* Complete Form Example */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Complete Form Example</h2>
        
        <Box className="p-6 bg-gray-900 rounded-lg max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Create Account</h3>
            
            <Grid cols={2} gap="md">
              <FormField label="First Name" required>
                <Input placeholder="John" />
              </FormField>
              
              <FormField label="Last Name" required>
                <Input placeholder="Doe" />
              </FormField>
            </Grid>

            <FormField 
              label="Email" 
              required 
              error={errors.email}
            >
              <Input 
                type="email"
                leftIcon={<Mail size={18} />}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                variant={errors.email ? 'error' : 'default'}
              />
            </FormField>

            <FormField 
              label="Password" 
              required
              description="Must be at least 8 characters"
              error={errors.password}
            >
              <Input 
                type={showPassword ? 'text' : 'password'}
                leftIcon={<Lock size={18} />}
                rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                onRightIconClick={() => setShowPassword(!showPassword)}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                variant={errors.password ? 'error' : 'default'}
              />
            </FormField>

            <FormField label="Role" required>
              <Select
                placeholder="Select your role"
                options={[
                  { value: 'developer', label: 'Developer' },
                  { value: 'designer', label: 'Designer' },
                  { value: 'manager', label: 'Manager' },
                  { value: 'other', label: 'Other' },
                ]}
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </FormField>

            <FormField label="Bio" description="Tell us about yourself">
              <Textarea 
                placeholder="I'm a developer who loves..."
                maxLength={500}
                showCount
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </FormField>

            <Box className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox 
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked })}
                />
                <span className="text-sm">Send me updates about new features</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox required />
                <span className="text-sm">
                  I agree to the <a href="#" className="text-accent-cyan hover:underline">Terms of Service</a>
                </span>
              </label>
            </Box>

            <Stack direction="row" gap="md" className="pt-4">
              <Button type="submit" variant="primary" fullWidth>
                Create Account
              </Button>
              <Button type="button" variant="outline" fullWidth>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      </section>

      {/* Inline Form */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Inline Form Example</h2>
        
        <Box className="p-4 bg-gray-900 rounded-lg">
          <Stack direction="row" gap="sm" align="end">
            <FormField label="Subscribe to newsletter" className="flex-1">
              <Input 
                type="email"
                placeholder="Enter your email"
                leftIcon={<Mail size={18} />}
              />
            </FormField>
            <Button variant="primary">Subscribe</Button>
          </Stack>
        </Box>
      </section>
    </div>
  );
};