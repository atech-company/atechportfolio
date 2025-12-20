/**
 * Verify all content types are created correctly
 */

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'd4bf3630db95af840fef5ef925fda0cb9415a258b42e5c23d31ea072943177f7a74b636187115c4b9ba65d17f7dd111ab45f87a9825cafde1216945930709ed3da34a76d9571fea4b6fd4e2bf5ab0ff02362005712f64a7de066ee18fd4f9ee3bb780848a7a04891ecc3be6cd9945725006b50a68ae9d6f6d3bf3047d702b329';

const contentTypes = [
  { name: 'Home Page', apiId: 'home-page', type: 'single' },
  { name: 'Project', apiId: 'project', type: 'collection' },
  { name: 'Service', apiId: 'service', type: 'collection' },
  { name: 'Testimonial', apiId: 'testimonial', type: 'collection' },
  { name: 'Team Member', apiId: 'team-member', type: 'collection' },
  { name: 'Blog Post', apiId: 'blog-post', type: 'collection' },
  { name: 'Global Setting', apiId: 'global-setting', type: 'single' },
];

async function verifyContentTypes() {
  console.log('🔍 Verifying Content Types...\n');
  
  let allExist = true;
  let allHavePermission = true;

  for (const contentType of contentTypes) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/${contentType.apiId}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      });

      if (response.status === 200 || response.status === 404) {
        // 200 = exists with data, 404 = exists but empty (both OK)
        console.log(`✅ ${contentType.name} (${contentType.apiId}) - EXISTS`);
        
        // Test create permission
        if (contentType.type === 'single') {
          // For single types, test POST
          const createResponse = await fetch(`${STRAPI_URL}/api/${contentType.apiId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: {} }),
          });
          
          if (createResponse.status === 200 || createResponse.status === 400) {
            console.log(`   ✅ Has create permission`);
          } else if (createResponse.status === 403) {
            console.log(`   ❌ Missing create permission (403 Forbidden)`);
            allHavePermission = false;
          } else if (createResponse.status === 405) {
            console.log(`   ❌ Missing create permission (405 Method Not Allowed)`);
            allHavePermission = false;
          } else {
            const text = await createResponse.text();
            console.log(`   ⚠️  Status ${createResponse.status}: ${text.substring(0, 50)}`);
          }
        } else {
          // For collections, test POST
          const createResponse = await fetch(`${STRAPI_URL}/api/${contentType.apiId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: { title: 'Test' } }),
          });
          
          if (createResponse.status === 200 || createResponse.status === 400) {
            console.log(`   ✅ Has create permission`);
          } else if (createResponse.status === 403) {
            console.log(`   ❌ Missing create permission (403 Forbidden)`);
            allHavePermission = false;
          } else if (createResponse.status === 405) {
            console.log(`   ❌ Missing create permission (405 Method Not Allowed)`);
            allHavePermission = false;
          } else {
            const text = await createResponse.text();
            console.log(`   ⚠️  Status ${createResponse.status}: ${text.substring(0, 50)}`);
          }
        }
      } else if (response.status === 403) {
        console.log(`⚠️  ${contentType.name} (${contentType.apiId}) - EXISTS but no permission`);
        allHavePermission = false;
      } else {
        console.log(`❌ ${contentType.name} (${contentType.apiId}) - DOES NOT EXIST`);
        console.log(`   Create it in Content-Type Builder!`);
        allExist = false;
      }
    } catch (error) {
      console.log(`❌ ${contentType.name} (${contentType.apiId}) - ERROR: ${error.message}`);
      allExist = false;
    }
    console.log('');
  }

  console.log('\n📊 Summary:');
  if (allExist && allHavePermission) {
    console.log('✅ All content types exist and have proper permissions!');
    console.log('✅ You can now run: node seed-strapi.js');
  } else {
    if (!allExist) {
      console.log('❌ Some content types are missing. Create them first!');
      console.log('   See: CREATE_CONTENT_TYPES_STEP_BY_STEP.md');
    }
    if (!allHavePermission) {
      console.log('\n❌ PERMISSIONS NEEDED: Some content types are missing create permission.');
      console.log('\n🔧 Quick Fix:');
      console.log('   1. Go to Strapi Admin: http://localhost:1337/admin');
      console.log('   2. Settings → Users & Permissions Plugin → Roles → Public');
      console.log('   3. For EACH content type, enable:');
      console.log('      ☑ find');
      console.log('      ☑ findOne');
      console.log('      ☑ create  ← THIS IS THE ONE YOU NEED!');
      console.log('      ☑ update  (for single types: Home Page, Global Setting)');
      console.log('   4. Click "Save" (top right)');
      console.log('   5. Run this script again to verify');
      console.log('\n   Or see: QUICK_FIX_PERMISSIONS.md for detailed guide');
    }
  }
}

verifyContentTypes();

