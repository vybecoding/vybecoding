'use client';

import { CalButton } from '@/components/cal/CalButton';
import { CalFloatingButton } from '@/components/cal/CalFloatingButton';

const services = [
  {
    title: 'Code Review',
    description: 'Get expert feedback on your code quality, architecture, and best practices',
    duration: '45 min',
    price: 100,
    calLink: 'your-username/code-review',
  },
  {
    title: 'Technical Interview Prep',
    description: 'Mock interviews with real-world coding challenges and system design',
    duration: '90 min',
    price: 200,
    calLink: 'your-username/interview-prep',
  },
  {
    title: 'Architecture Consultation',
    description: 'Design scalable systems and solve complex architectural challenges',
    duration: '60 min',
    price: 250,
    calLink: 'your-username/architecture',
  },
  {
    title: 'Debugging Session',
    description: 'Live debugging help for your toughest problems',
    duration: '30 min',
    price: 75,
    calLink: 'your-username/debugging',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Services
          </h1>
          <p className="text-xl text-gray-600">
            Book expert help for your development needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.calLink} className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-500">{service.duration}</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ${service.price}
                </span>
              </div>

              <CalButton
                calLink={service.calLink}
                buttonText="Book Now"
                price={service.price}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 bg-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Need Something Custom?</h2>
          <p className="text-gray-600 mb-6">
            Let's discuss your specific requirements
          </p>
          <CalButton
            calLink="your-username/custom-project"
            buttonText="Schedule Discussion"
            className="inline-block"
          />
        </div>
      </div>

      {/* Floating button for quick booking */}
      <CalFloatingButton
        calLink="your-username"
        buttonText="Quick Book"
        buttonPosition="bottom-right"
      />
    </div>
  );
}