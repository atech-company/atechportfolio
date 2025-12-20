/**
 * Check API token permissions
 */

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'd4bf3630db95af840fef5ef925fda0cb9415a258b42e5c23d31ea072943177f7a74b636187115c4b9ba65d17f7dd111ab45f87a9825cafde1216945930709ed3da34a76d9571fea4b6fd4e2bf5ab0ff02362005712f64a7de066ee18fd4f9ee3bb780848a7a04891ecc3be6cd9945725006b50a68ae9d6f6d3bf3047d702b329';

async function checkToken() {
  console.log('🔍 Checking API Token and Permissions...\n');

  // Test 1: Check if token works at all
  console.log('1. Testing token authentication...');
  try {
    const response = await fetch(`${STRAPI_URL}/api/projects`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });
    
    if (response.status === 200 || response.status === 404) {
      console.log('   ✅ Token is valid and can read data');
    } else if (response.status === 401) {
      console.log('   ❌ Token is invalid (401 Unauthorized)');
      console.log('   → Create a new API token in Strapi Admin');
      return;
    } else {
      console.log(`   ⚠️  Status: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return;
  }

  // Test 2: Try to create a project (collection type)
  console.log('\n2. Testing create permission for Project...');
  try {
    const response = await fetch(`${STRAPI_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: 'Test Project',
          slug: 'test-project-' + Date.now(),
          description: 'Test',
        },
      }),
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = { message: text };
    }

    if (response.status === 200) {
      console.log('   ✅ CREATE permission works!');
      console.log('   → Permissions are set correctly');
    } else if (response.status === 403) {
      console.log('   ❌ 403 Forbidden - No create permission');
      console.log('   → Go to: Settings → Users & Permissions → Roles → Public');
      console.log('   → Enable "create" for Project');
    } else if (response.status === 405) {
      console.log('   ❌ 405 Method Not Allowed');
      console.log('   → This usually means:');
      console.log('     1. Permission not enabled (check Public role)');
      console.log('     2. Token is Read-only (create Full access token)');
      console.log('     3. Strapi needs restart after permission changes');
    } else if (response.status === 400) {
      console.log('   ✅ Permission works! (400 = validation error, which is OK)');
      console.log('   → The create permission is enabled');
    } else {
      console.log(`   ⚠️  Status ${response.status}: ${text.substring(0, 100)}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 3: Check if using admin token would work
  console.log('\n3. Recommendations:');
  console.log('   If permissions are enabled but still not working:');
  console.log('   1. ✅ Make sure you clicked "Save" after enabling permissions');
  console.log('   2. ✅ Restart Strapi (Ctrl+C, then npm run develop)');
  console.log('   3. ✅ Create a NEW Full access token (not Read-only)');
  console.log('   4. ✅ Update the token in seed-strapi.js');
  console.log('\n   Alternative: Use admin credentials instead of API token');
  console.log('   (See: use-admin-auth.md)');
}

checkToken();

