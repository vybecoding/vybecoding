import React from 'react';
import { Button, ButtonGroup, IconButton } from './index';
import { 
  ArrowRight, 
  Download, 
  Heart, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  X,
  Plus,
  Edit,
  Trash,
  Share,
  Mail,
  Github,
  ExternalLink
} from 'lucide-react';

export const ButtonExamples = () => {
  const [copied, setCopied] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAsync = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="space-y-12 p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">Button Component System</h1>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="primary">Primary Gradient</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Sizes</h2>
        <div className="flex items-center gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons with Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button leftIcon={<Download size={16} />}>
            Download
          </Button>
          <Button rightIcon={<ArrowRight size={16} />}>
            Continue
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Mail size={16} />}
            rightIcon={<ExternalLink size={16} />}
          >
            Send Email
          </Button>
          <Button variant="outline" leftIcon={<Github size={16} />}>
            View on GitHub
          </Button>
        </div>
      </section>

      {/* Icon Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Icon Buttons</h2>
        <div className="flex items-center gap-4">
          <IconButton aria-label="Settings" size="sm">
            <Settings size={16} />
          </IconButton>
          <IconButton aria-label="Like">
            <Heart size={20} />
          </IconButton>
          <IconButton aria-label="Edit" size="lg" variant="primary">
            <Edit size={24} />
          </IconButton>
          <IconButton aria-label="Delete" variant="danger">
            <Trash size={20} />
          </IconButton>
          <IconButton aria-label="Share" variant="outline">
            <Share size={20} />
          </IconButton>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button States</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button disabled>Disabled</Button>
            <Button variant="primary" disabled>Disabled Primary</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Button loading onClick={handleAsync}>
              {loading ? 'Processing...' : 'Click to Load'}
            </Button>
            <Button variant="primary" loading>
              Saving...
            </Button>
            <Button 
              variant="outline"
              leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      </section>

      {/* Full Width */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Full Width Buttons</h2>
        <div className="max-w-md space-y-2">
          <Button fullWidth>Full Width Default</Button>
          <Button variant="primary" fullWidth>Full Width Primary</Button>
          <Button variant="outline" fullWidth leftIcon={<Plus size={16} />}>
            Create New Project
          </Button>
        </div>
      </section>

      {/* Button Groups */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Button Groups</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Separate Buttons</h3>
            <ButtonGroup>
              <Button variant="outline">Save</Button>
              <Button variant="outline">Cancel</Button>
              <Button variant="danger">Delete</Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Attached Buttons</h3>
            <ButtonGroup attached>
              <Button variant="outline">
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">
                <ChevronRight size={16} />
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Vertical Group</h3>
            <ButtonGroup orientation="vertical" attached>
              <Button variant="outline" fullWidth>
                Option 1
              </Button>
              <Button variant="outline" fullWidth>
                Option 2
              </Button>
              <Button variant="outline" fullWidth>
                Option 3
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Real-world Examples</h2>
        
        <div className="space-y-6">
          {/* Form Actions */}
          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="font-medium mb-4">Form Actions</h3>
            <div className="flex justify-end gap-3">
              <Button variant="ghost">Cancel</Button>
              <Button variant="outline">Save as Draft</Button>
              <Button variant="primary">Publish</Button>
            </div>
          </div>

          {/* Card Actions */}
          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="font-medium mb-2">Project Card</h3>
            <p className="text-gray-400 text-sm mb-4">
              A sample project with inline actions
            </p>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" leftIcon={<Edit size={14} />}>
                Edit
              </Button>
              <Button size="sm" variant="outline" leftIcon={<Share size={14} />}>
                Share
              </Button>
              <div className="ml-auto">
                <IconButton size="sm" variant="ghost" aria-label="Delete">
                  <Trash size={16} />
                </IconButton>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="font-medium mb-4">Delete Confirmation</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" fullWidth>
                Cancel
              </Button>
              <Button variant="danger" fullWidth leftIcon={<Trash size={16} />}>
                Delete Permanently
              </Button>
            </div>
          </div>

          {/* Toggle States */}
          <div className="p-6 bg-gray-900 rounded-lg">
            <h3 className="font-medium mb-4">View Options</h3>
            <ButtonGroup attached>
              <Button variant="outline">Grid</Button>
              <Button variant="primary">List</Button>
              <Button variant="outline">Calendar</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>
    </div>
  );
};