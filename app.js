class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentScreen, setCurrentScreen] = React.useState('dashboard');
    const [screenData, setScreenData] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState(null);

    const navigateToScreen = (screen, data = null) => {
      setCurrentScreen(screen);
      setScreenData(data);
    };

    const handleLogin = (user) => {
      setCurrentUser(user);
      if (user.userType === 'farmer') {
        setCurrentScreen('farmer-dashboard');
      } else if (user.userType === 'customer') {
        setCurrentScreen('customer-dashboard');
      } else if (user.userType === 'admin') {
        setCurrentScreen('admin-dashboard');
      }
    };

    const handleLogout = () => {
      setCurrentUser(null);
      setCurrentScreen('dashboard');
    };

    const navigateBack = () => {
      if (currentScreen === 'login-farmer' || currentScreen === 'login-customer' || currentScreen === 'login-admin') {
        setCurrentScreen('dashboard');
      } else if (currentScreen === 'about' || currentScreen === 'features' || currentScreen === 'contact') {
        setCurrentScreen('dashboard');
      } else if (currentScreen === 'qr-generated' || currentScreen === 'farmer-form') {
        setCurrentScreen('farmer-dashboard');
      } else if (currentScreen === 'qr-scanner' || currentScreen === 'herb-details') {
        setCurrentScreen('customer-dashboard');
      } else if (currentScreen === 'farmer-dashboard' || currentScreen === 'customer-dashboard' || currentScreen === 'admin-dashboard') {
        setCurrentScreen('dashboard');
      } else if (currentScreen === 'location-picker') {
        setCurrentScreen('farmer-form');
      }
    };

    const renderScreen = () => {
      switch (currentScreen) {
        case 'dashboard':
          return <HomePage onNavigate={navigateToScreen} />;
        case 'home':
          return <HomePage onNavigate={navigateToScreen} />;
        case 'about':
          return <AboutPage onNavigate={navigateToScreen} />;
        case 'features':
          return <FeaturesPage onNavigate={navigateToScreen} />;
        case 'contact':
          return <ContactPage onNavigate={navigateToScreen} />;
        case 'qa-results':
          return <QAResultsPage onNavigate={navigateToScreen} />;
        case 'stakeholders':
          return <StakeholdersPage onNavigate={navigateToScreen} />;
        case 'compliance':
          return <CompliancePage onNavigate={navigateToScreen} />;
        case 'login-farmer':
          return <Login userType="farmer" onLogin={handleLogin} onBack={navigateBack} />;
        case 'login-customer':
          return <Login userType="customer" onLogin={handleLogin} onBack={navigateBack} />;
        case 'login-admin':
          return <Login userType="admin" onLogin={handleLogin} onBack={navigateBack} />;
        case 'farmer-dashboard':
          return <FarmerDashboard currentUser={currentUser} onNavigate={navigateToScreen} onLogout={handleLogout} />;
        case 'customer-dashboard':
          return <CustomerDashboard currentUser={currentUser} onNavigate={navigateToScreen} onLogout={handleLogout} />;
        case 'admin-dashboard':
          return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />;
        case 'farmer-form':
          return <FarmerForm currentUser={currentUser} onNavigate={navigateToScreen} onBack={navigateBack} />;
        case 'location-picker':
          return <LocationPicker onLocationSelect={(location) => { setScreenData(location); navigateBack(); }} onBack={navigateBack} />;
        case 'qr-generated':
          return <QRGenerator batchId={screenData?.batchId} onBack={navigateBack} />;
        case 'qr-scanner':
          return <QRScanner onNavigate={navigateToScreen} onBack={navigateBack} />;
        case 'herb-details':
          return <HerbDetails herbData={screenData} onBack={navigateBack} />;
        default:
          return <HomeScreen onNavigate={navigateToScreen} />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
        {renderScreen()}
        {(currentScreen === 'dashboard' || currentScreen === 'home' || currentScreen === 'about' || currentScreen === 'features' || currentScreen === 'contact' || currentScreen === 'qa-results' || currentScreen === 'stakeholders' || currentScreen === 'compliance') && <Footer onNavigate={navigateToScreen} />}
        
        {/* Community Chat - Shows when user is logged in */}
        {currentUser && <CommunityChat currentUser={currentUser} />}
        
        {/* Floating Social & Contact Bar - Shows after using any portal */}
        {(currentUser && (currentScreen === 'farmer-dashboard' || currentScreen === 'customer-dashboard' || currentScreen === 'admin-dashboard')) && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex space-x-2">
              <button
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                title="WhatsApp Support"
              >
                <div className="icon-message-circle text-lg text-green-600"></div>
              </button>
              <button
                onClick={() => window.open('https://instagram.com/herbtrace', '_blank')}
                className="w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-full flex items-center justify-center transition-colors"
                title="Follow on Instagram"
              >
                <div className="icon-instagram text-lg text-pink-600"></div>
              </button>
              <button
                onClick={() => window.open('https://facebook.com/herbtrace', '_blank')}
                className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors"
                title="Follow on Facebook"
              >
                <div className="icon-facebook text-lg text-blue-600"></div>
              </button>
              <button
                onClick={() => alert('📧 Email: support@herbtrace.com\n📞 Phone: +91 98765 43210\n🕐 Support Hours: 9 AM - 9 PM IST')}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                title="Contact Information"
              >
                <div className="icon-phone text-lg text-gray-600"></div>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

function HomeScreen({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Ayurvedic Herb Traceability" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-[var(--secondary-color)] rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="icon-leaf text-3xl text-[var(--primary-color)]"></div>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Welcome to</h1>
          <h2 className="text-2xl font-semibold text-gradient">Herb Traceability</h2>
          <p className="text-[var(--text-secondary)] text-center max-w-sm">
            Track your Ayurvedic herbs from farm to consumer with blockchain verification
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => onNavigate('login-farmer')}
            className="w-full btn-primary flex items-center justify-center space-x-3"
          >
            <div className="icon-users text-xl"></div>
            <span>Farmer Portal</span>
          </button>
          
          <button
            onClick={() => onNavigate('login-customer')}
            className="w-full btn-secondary flex items-center justify-center space-x-3"
          >
            <div className="icon-search text-xl"></div>
            <span>Customer Portal</span>
          </button>

          <button
            onClick={() => onNavigate('login-admin')}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-3"
          >
            <div className="icon-settings text-xl"></div>
            <span>Admin Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function FarmerScreen({ onNavigate, onBack }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Farmer Portal" onBack={onBack} />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-[var(--secondary-color)] rounded-full flex items-center justify-center mx-auto">
            <div className="icon-sprout text-3xl text-[var(--primary-color)]"></div>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Farmer Dashboard</h1>
          <p className="text-[var(--text-secondary)] text-center max-w-sm">
            Add your herb collection to the blockchain for complete traceability
          </p>
        </div>

        <div className="w-full max-w-sm">
          <button
            onClick={() => onNavigate('farmer-form')}
            className="w-full btn-primary flex items-center justify-center space-x-3"
          >
            <div className="icon-plus text-xl"></div>
            <span>Add Herb Collection</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CustomerScreen({ onNavigate, onBack }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Customer Portal" onBack={onBack} />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-[var(--secondary-color)] rounded-full flex items-center justify-center mx-auto">
            <div className="icon-qr-code text-3xl text-[var(--primary-color)]"></div>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Customer Portal</h1>
          <p className="text-[var(--text-secondary)] text-center max-w-sm">
            Scan QR code to verify the authenticity and origin of your herbs
          </p>
        </div>

        <div className="w-full max-w-sm">
          <button
            onClick={() => onNavigate('qr-scanner')}
            className="w-full btn-primary flex items-center justify-center space-x-3"
          >
            <div className="icon-camera text-xl"></div>
            <span>Scan QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);