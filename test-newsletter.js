// Test script for newsletter subscription
const testEmail = `abinsajan99@gmail.com`;

async function testNewsletterSubscription() {
  console.log('Testing newsletter subscription...');
  console.log('Test email:', testEmail);
  
  try {
    const response = await fetch('http://localhost:3000/api/newsletter', {
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
      console.log('✅ Subscription successful!');
      console.log('Check Shopify admin for:');
      console.log('1. New customer created with email:', testEmail);
      console.log('2. Marketing consent status should be "PENDING"');
      console.log('3. Confirmation email should be sent to:', testEmail);
    } else {
      console.log('❌ Subscription failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run test
testNewsletterSubscription();