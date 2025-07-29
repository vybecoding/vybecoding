# Form Components

A complete set of form components with consistent styling, validation states, and accessibility features.

## Components

### Input

Versatile input component with icon support and multiple variants.

```tsx
import { Input } from '@/components/ui/form';

// Basic usage
<Input placeholder="Enter text..." />

// With icons
<Input 
  leftIcon={<Mail size={18} />}
  placeholder="Email address"
/>

// Password with toggle
<Input 
  type={showPassword ? 'text' : 'password'}
  rightIcon={showPassword ? <EyeOff /> : <Eye />}
  onRightIconClick={() => setShowPassword(!showPassword)}
/>

// Variants
<Input variant="filled" />
<Input variant="error" />
<Input variant="success" />

// Sizes
<Input inputSize="sm" />
<Input inputSize="md" /> // default
<Input inputSize="lg" />
```

### Label

Form labels with optional required indicator and descriptions.

```tsx
import { Label } from '@/components/ui/form';

// Basic label
<Label htmlFor="email">Email Address</Label>

// Required field
<Label htmlFor="password" required>
  Password
</Label>

// With description
<Label 
  htmlFor="username" 
  description="Choose a unique username"
>
  Username
</Label>

// Error state
<Label variant="error">Invalid Field</Label>
```

### Textarea

Multi-line text input with character counting and resize control.

```tsx
import { Textarea } from '@/components/ui/form';

// Basic usage
<Textarea placeholder="Enter your message..." />

// With character count
<Textarea 
  maxLength={500}
  showCount
  placeholder="Limited to 500 characters"
/>

// Resize options
<Textarea resize="none" />     // No resize
<Textarea resize="vertical" /> // Vertical only (default)
<Textarea resize="both" />     // Both directions

// Variants and sizes
<Textarea variant="filled" textareaSize="lg" />
```

### Select

Dropdown select with custom styling.

```tsx
import { Select } from '@/components/ui/form';

// Basic usage
<Select
  placeholder="Select an option"
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
    { value: 'opt3', label: 'Option 3', disabled: true },
  ]}
/>

// With default value
<Select
  options={options}
  defaultValue="opt1"
/>

// Sizes and variants
<Select 
  selectSize="lg"
  variant="filled"
  options={options}
/>
```

### Checkbox

Customizable checkbox with check icon.

```tsx
import { Checkbox } from '@/components/ui/form';

// Basic usage
<label className="flex items-center gap-2">
  <Checkbox />
  <span>Accept terms</span>
</label>

// Controlled
<Checkbox 
  checked={isChecked}
  onCheckedChange={setIsChecked}
/>

// Variants
<Checkbox variant="error" />
<Checkbox variant="success" />

// With default state
<Checkbox defaultChecked />
```

### Radio

Radio buttons with group support.

```tsx
import { Radio, RadioGroup } from '@/components/ui/form';

// Basic usage
<RadioGroup>
  <label className="flex items-center gap-2">
    <Radio name="plan" value="free" />
    <span>Free Plan</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio name="plan" value="pro" />
    <span>Pro Plan</span>
  </label>
</RadioGroup>

// Horizontal layout
<RadioGroup orientation="horizontal">
  <Radio name="size" value="sm" />
  <Radio name="size" value="md" />
  <Radio name="size" value="lg" />
</RadioGroup>
```

### FormField

Wrapper component that combines label, input, and error handling.

```tsx
import { FormField, Input } from '@/components/ui/form';

// Complete field with all elements
<FormField
  label="Email Address"
  description="We'll never share your email"
  error={errors.email}
  required
  htmlFor="email"
>
  <Input 
    id="email"
    type="email"
    variant={errors.email ? 'error' : 'default'}
  />
</FormField>
```

## Form Patterns

### Login Form

```tsx
<form className="space-y-4">
  <FormField label="Email" required>
    <Input 
      type="email"
      leftIcon={<Mail size={18} />}
      placeholder="email@example.com"
    />
  </FormField>
  
  <FormField label="Password" required>
    <Input 
      type="password"
      leftIcon={<Lock size={18} />}
      placeholder="Enter password"
    />
  </FormField>
  
  <label className="flex items-center gap-2">
    <Checkbox />
    <span className="text-sm">Remember me</span>
  </label>
  
  <Button type="submit" fullWidth>
    Sign In
  </Button>
</form>
```

### Multi-Step Form

```tsx
<form>
  {/* Step 1: Personal Info */}
  <div className={step === 1 ? 'block' : 'hidden'}>
    <Grid cols={2} gap="md">
      <FormField label="First Name" required>
        <Input />
      </FormField>
      <FormField label="Last Name" required>
        <Input />
      </FormField>
    </Grid>
  </div>
  
  {/* Step 2: Account Details */}
  <div className={step === 2 ? 'block' : 'hidden'}>
    <Stack gap="md">
      <FormField label="Username" required>
        <Input leftIcon={<User />} />
      </FormField>
      <FormField label="Bio">
        <Textarea maxLength={200} showCount />
      </FormField>
    </Stack>
  </div>
</form>
```

### Inline Newsletter Form

```tsx
<Stack direction="row" gap="sm" align="end">
  <FormField label="Subscribe to updates" className="flex-1">
    <Input 
      type="email"
      placeholder="your@email.com"
      leftIcon={<Mail size={18} />}
    />
  </FormField>
  <Button>Subscribe</Button>
</Stack>
```

## Validation Patterns

### Client-Side Validation

```tsx
const [errors, setErrors] = useState({});

const validate = (values) => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return errors;
};

// In your form
<FormField 
  label="Email" 
  error={errors.email}
  required
>
  <Input 
    variant={errors.email ? 'error' : 'default'}
    value={values.email}
    onChange={handleChange}
  />
</FormField>
```

### Real-Time Validation

```tsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (value) => {
  if (!value) {
    setEmailError('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(value)) {
    setEmailError('Please enter a valid email');
  } else {
    setEmailError('');
  }
};

<Input
  type="email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }}
  onBlur={() => validateEmail(email)}
  variant={emailError ? 'error' : 'default'}
/>
```

## Accessibility

All form components are built with accessibility in mind:

1. **Proper labeling**: Use `Label` component with `htmlFor`
2. **Error announcements**: Error messages are associated with inputs
3. **Keyboard navigation**: Full keyboard support
4. **Focus management**: Clear focus indicators
5. **Required fields**: Visual and semantic indicators
6. **ARIA attributes**: Proper roles and states

## Best Practices

1. **Always use labels**: Every input should have an associated label
2. **Show validation errors**: Provide clear, actionable error messages
3. **Indicate required fields**: Use the `required` prop on labels
4. **Group related fields**: Use `FormField` for consistent spacing
5. **Provide help text**: Use descriptions for complex fields
6. **Test keyboard navigation**: Ensure all controls are keyboard accessible
7. **Consider mobile**: Test touch targets and virtual keyboards