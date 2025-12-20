/**
 * Diagnostic script to test Strapi API connection
 */

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'd4bf3630db95af840fef5ef925fda0cb9415a258b42e5c23d31ea072943177f7a74b636187115c4b9ba65d17f7dd111ab45f87a9825cafde1216945930709ed3da34a76d9571fea4b6fd4e2bf5ab0ff02362005712f64a7de066ee18fd4f9ee3bb780848a7a04891ecc3be6cd9945725006b50a68ae9d6f6d3bf3047d702b329';

async function testAPI() {
  console.log('🔍 Testing Strapi API Connection...\n');
  
  // Test 1: Check if Strapi is running
  console.log('1. Testing Strapi server...');
  try {
    const response = await fetch(`${STRAPI_URL}/api`);
    console.log(`   ✅ Strapi is running (Status: ${response.status})`);
  } catch (error) {
    console.log(`   ❌ Cannot connect to Strapi: ${error.message}`);
    console.log('   Make sure Strapi is running at http://localhost:1337');
    return;
  }

  // Test 2: Check API token
  console.log('\n2. Testing API token...');
  try {
    const response = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });
    
    if (response.ok) {
      console.log('   ✅ API token is valid');
    } else {
      const text = await response.text();
      console.log(`   ❌ API token error: ${response.status} - ${text.substring(0, 100)}`);
    }
  } catch (error) {
    console.log(`   ⚠️  Could not verify token: ${error.message}`);
  }

  // Test 3: Check if content types exist
  console.log('\n3. Checking content types...');
  const contentTypes = [
    'home-page',
    'projects',
    'services',
    'testimonials',
    'team-members',
    'blog-posts',
    'global-setting'
  ];

  for (const contentType of contentTypes) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/${contentType}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      });
      
      if (response.status === 200) {
        console.log(`   ✅ ${contentType} exists`);
      } else if (response.status === 403) {
        console.log(`   ⚠️  ${contentType} exists but no permission (403)`);
      } else if (response.status === 404) {
        console.log(`   ❌ ${contentType} does NOT exist (404) - Create it in Content-Type Builder!`);
      } else {
        const text = await response.text();
        console.log(`   ⚠️  ${contentType}: Status ${response.status} - ${text.substring(0, 50)}`);
      }
    } catch (error) {
      console.log(`   ❌ ${contentType}: ${error.message}`);
    }
  }

  // Test 4: Try to create a test entry
  console.log('\n4. Testing create permission...');
  try {
    const response = await fetch(`${STRAPI_URL}/api/home-page`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          hero: {
            title: 'Test',
            subtitle: 'Test',
            ctaText: 'Test',
            ctaLink: '/test',
          },
        },
      }),
    });

    const text = await response.text();
    
    if (response.ok) {
      console.log('   ✅ Create permission works!');
    } else if (response.status === 405) {
      console.log('   ❌ Method Not Allowed (405)');
      console.log('   This means:');
      console.log('     - Content type might not exist');
      console.log('     - Or permissions are not set');
      console.log(`   Response: ${text.substring(0, 200)}`);
    } else if (response.status === 403) {
      console.log('   ❌ Forbidden (403) - No create permission');
      console.log('   Enable "create" permission in Settings → Users & Permissions → Roles → Public');
    } else {
      console.log(`   ⚠️  Status ${response.status}: ${text.substring(0, 200)}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('\n✅ Diagnostic complete!\n');
}

testAPI();

