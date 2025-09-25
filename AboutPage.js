function AboutPage({ onNavigate }) {
  try {
    return (
      <div className="min-h-screen" data-name="about-page" data-file="components/AboutPage.js">
        <Navigation onNavigate={onNavigate} currentPage="about" />
        
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About HerbTrace</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing Ayurvedic herb traceability through blockchain technology, 
              ensuring authenticity and quality from farm to consumer.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To create a transparent and trustworthy ecosystem for Ayurvedic herbs by leveraging 
                cutting-edge blockchain technology. We bridge the gap between traditional farming 
                practices and modern verification systems.
              </p>
              <p className="text-gray-600">
                Our platform empowers farmers to showcase their quality produce while giving 
                consumers complete confidence in the authenticity and origin of their herbs.
              </p>
            </div>
            <div className="bg-[var(--secondary-color)] p-8 rounded-xl">
              <div className="w-20 h-20 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-target text-3xl text-white"></div>
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900">Vision 2030</h3>
              <p className="text-gray-600 text-center mt-2">
                To be the global standard for herb traceability and authentication.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-shield text-2xl text-blue-600"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
                <p className="text-gray-600">Building trust through complete transparency in our verification process.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-leaf text-2xl text-green-600"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-gray-600">Promoting sustainable farming practices and environmental responsibility.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-zap text-2xl text-purple-600"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600">Continuously innovating to improve herb quality and traceability.</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4">
                <div className="text-3xl font-bold text-[var(--primary-color)]">1000+</div>
                <div className="text-gray-600">Verified Farmers</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-[var(--primary-color)]">50K+</div>
                <div className="text-gray-600">Herbs Tracked</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-[var(--primary-color)]">25+</div>
                <div className="text-gray-600">States Covered</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-[var(--primary-color)]">99.9%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AboutPage component error:', error);
    return null;
  }
}