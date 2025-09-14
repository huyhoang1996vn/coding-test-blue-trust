const User = require('../models/User');

/**
 * Initialize database with sample data
 * Creates 4 sample users for testing and development
 */
async function initData() {
  try {
    console.log('Starting database initialization...');
    
    // Initialize the users table
    await User.initTable();
    
    // Check if users already exist
    const existingUsers = await User.findAll();
    if (existingUsers.length > 0) {
      console.log(`Database already contains ${existingUsers.length} users. Skipping initialization.`);
      return;
    }
    
    // Sample user data
    const sampleUsers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        country: 'United States',
        city: 'New York',
        email: 'john.doe@example.com',
        phoneNumber: '+84935682466',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        country: 'Canada',
        city: 'Toronto',
        email: 'jane.smith@example.com',
        phoneNumber: '+84935682466',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Ahmed',
        lastName: 'Hassan',
        country: 'Egypt',
        city: 'Cairo',
        email: 'ahmed.hassan@example.com',
        phoneNumber: '+84935682466',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Maria',
        lastName: 'Garcia',
        country: 'Spain',
        city: 'Madrid',
        email: 'maria.garcia@example.com',
        phoneNumber: '+84935682466',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      }
    ];
    
    console.log('Creating sample users...');
    
    // Create each user
    for (const userData of sampleUsers) {
      try {
        const user = await User.create(userData);
        console.log(`✓ Created user: ${user.firstName} ${user.lastName} (${user.email})`);
      } catch (error) {
        console.error(`✗ Failed to create user ${userData.email}:`, error.message);
      }
    }
    
    // Verify the data was created
    const finalUsers = await User.findAll();
    console.log(`\nDatabase initialization completed successfully!`);
    console.log(`Total users in database: ${finalUsers.length}`);
    
    // Display created users
    console.log('\nCreated users:');
    finalUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} - ${user.email} (${user.country})`);
    });
    
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
}

/**
 * Clear all data from the database
 * WARNING: This will delete all users
 */
async function clearData() {
  try {
    console.log('Clearing all user data...');
    
    const query = 'DELETE FROM users';
    const pool = require('../config/database');
    await pool.query(query);
    
    console.log('All user data cleared successfully!');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
}

/**
 * Reset database (clear and reinitialize)
 */
async function resetData() {
  try {
    await clearData();
    await initData();
  } catch (error) {
    console.error('Error resetting data:', error);
    throw error;
  }
}

// Export functions
module.exports = {
  initData,
  clearData,
  resetData
};

// If this script is run directly, initialize the data
if (require.main === module) {
  initData()
    .then(() => {
      console.log('\nInitialization script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\nInitialization script failed:', error);
      process.exit(1);
    });
}