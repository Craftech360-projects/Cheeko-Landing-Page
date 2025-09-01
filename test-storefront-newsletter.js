// Test script for Storefront API newsletter subscription
const testEmail = `test-${Date.now()}@example.com`;

async function testStorefrontNewsletter() {
  console.log('Testing Storefront API newsletter subscription...');
  console.log('Test email:', testEmail);
  
  try {
    const response = await fetch('http://localhost:3000/api/newsletter-storefront', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });

    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ SUCCESS: Newsletter subscription worked!');
      console.log('Message:', data.message);
      console.log('\n⚠️  IMPORTANT: Check if a confirmation email was sent to:', testEmail);
    } else {
      console.log('❌ ERROR: Newsletter subscription failed');
      console.log('Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

// Run the test
testStorefrontNewsletter();