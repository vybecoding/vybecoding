import { CalEmbed } from '@/components/cal/CalEmbed';
import { CalButton } from '@/components/cal/CalButton';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Session</h1>

        {/* Different booking options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free Consultation */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Free Consultation</h2>
            <p className="text-gray-600 mb-6">
              15-minute discovery call to discuss your project needs
            </p>
            <CalButton 
              calLink="your-username/consultation"
              buttonText="Book Free Call"
              className="w-full"
            />
          </div>

          {/* Paid Coaching Session */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">1-on-1 Coaching</h2>
            <p className="text-gray-600 mb-6">
              60-minute deep dive session with personalized guidance
            </p>
            <CalButton 
              calLink="your-username/coaching"
              buttonText="Book Session"
              price={150}
              currency="USD"
              className="w-full"
            />
          </div>
        </div>

        {/* Inline calendar embed */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Or Choose Your Preferred Time</h2>
          <div className="h-[600px]">
            <CalEmbed 
              calLink="your-username"
              config={{
                layout: 'month_view',
                theme: 'light',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}