// Herb Database Utilities using Trickle Database

const HERB_OBJECT_TYPE = 'ayurvedic_herb';

// Generate unique batch ID
function generateBatchId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `HERB${timestamp}${random}`.toUpperCase();
}

// Generate dummy blockchain hash
function generateBlockchainHash() {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

// User authentication - simplified to accept any email/password
async function authenticateUser(email, password, userType) {
  try {
    // Always return a valid user object for any email/password combination
    if (email && password) {
      // Extract name from email for personalization
      const emailPrefix = email.split('@')[0];
      const userName = emailPrefix.includes('.') 
        ? emailPrefix.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
      
      // Create unique user ID based on email
      const userId = `${userType.toUpperCase()}_${emailPrefix.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}`;
      
      return {
        userId: userId,
        email: email,
        userType: userType,
        fullName: userName,
        phone: '+91 9876543210',
        address: userType === 'farmer' ? `${userName}'s Farm` : userType === 'customer' ? `${userName}'s Address` : 'Admin Office'
      };
    }
    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

// Get farmer collections
async function getFarmerCollections(farmerId) {
  try {
    const result = await trickleListObjects(HERB_OBJECT_TYPE, 100, true);
    return result.items
      .filter(item => item.objectData.farmerId === farmerId)
      .map(item => item.objectData);
  } catch (error) {
    console.error('Error getting farmer collections:', error);
    return [];
  }
}

// Add herb to database
async function addHerbToDatabase(formData, farmerId, farmerName) {
  try {
    console.log('=== Starting addHerbToDatabase ===');
    console.log('Input form data:', formData);
    
    // Check if trickleCreateObject function exists
    if (typeof trickleCreateObject === 'undefined') {
      throw new Error('trickleCreateObject function is not available');
    }
    console.log('trickleCreateObject function is available');
    
    const batchId = generateBatchId();
    const blockchainHash = generateBlockchainHash();
    const harvestDate = new Date().toLocaleDateString();

    console.log('Generated values:', { batchId, blockchainHash, harvestDate });

    // Validate required fields
    if (!formData.herbName || !formData.quantity || !formData.location) {
      const missing = [];
      if (!formData.herbName) missing.push('herbName');
      if (!formData.quantity) missing.push('quantity');
      if (!formData.location) missing.push('location');
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    // Create a clean record matching database schema
    const herbRecord = {
      batchId: String(batchId),
      herbName: String(formData.herbName),
      quantity: parseFloat(formData.quantity) || 0,
      location: JSON.stringify(formData.location),
      photo: String(formData.photo || ''),
      harvestDate: String(harvestDate),
      blockchainHash: String(blockchainHash),
      farmerId: farmerId || 'FARMER001',
      farmerName: farmerName || 'Unknown Farmer',
      processing: formData.processing || [],
      testing: formData.testing || [],
      organicCertified: Boolean(formData.organicCertified),
      qualityGrade: String(formData.qualityGrade || 'Standard')
    };

    console.log('Prepared herb record for database:', herbRecord);
    console.log('Object type:', HERB_OBJECT_TYPE);
    
    console.log('Calling trickleCreateObject...');
    const result = await trickleCreateObject(HERB_OBJECT_TYPE, herbRecord);
    console.log('Database create successful:', result);
    
    return batchId;
  } catch (error) {
    console.error('=== Error in addHerbToDatabase ===');
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error object:', error);
    
    // Re-throw with more context
    throw new Error(`Database operation failed: ${error.message}`);
  }
}

// Get herb from database by batch ID
async function getHerbFromDatabase(batchId) {
  try {
    const result = await trickleListObjects(HERB_OBJECT_TYPE, 100, true);
    
    const herb = result.items.find(item => 
      item.objectData.batchId === batchId
    );

    if (herb) {
      // Parse location data from JSON string
      const herbData = { ...herb.objectData };
      if (herbData.location && typeof herbData.location === 'string') {
        try {
          herbData.location = JSON.parse(herbData.location);
        } catch (e) {
          console.warn('Failed to parse location data:', e);
          herbData.location = null;
        }
      }
      return herbData;
    }

    return null;
  } catch (error) {
    console.error('Error getting herb from database:', error);
    throw new Error('Failed to retrieve herb data');
  }
}
