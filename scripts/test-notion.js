import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !DATABASE_ID) {
  console.error('Error: NOTION_API_KEY and NOTION_DATABASE_ID environment variables are required');
  process.exit(1);
}

// Create a custom HTTPS agent with keep-alive
const agent = new https.Agent({
  keepAlive: true,
  timeout: 30000, // Increase timeout to 30 seconds
});

const notion = new Client({
  auth: NOTION_API_KEY,
  notionVersion: '2022-06-28',
  fetch: (url, init) => {
    return fetch(url, {
      ...init,
      agent,
      timeout: 30000,
    });
  },
});

// Helper function for delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Retry wrapper
async function withRetry(operation, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.log(`Attempt ${attempt}/${maxRetries} failed`);
      if (attempt === maxRetries) throw error;
      await delay(attempt * 1000); // Exponential backoff
    }
  }
}

async function testConnection() {
  try {
    console.log('Testing Notion connection...');
    console.log('Database ID:', DATABASE_ID);
    
    // Test basic API connectivity
    console.log('\nTesting API access...');
    const user = await withRetry(() => notion.users.me());
    console.log('✓ Successfully connected to Notion API');
    console.log('Connected as:', user.name);
    
    // Test database access
    console.log('\nTesting database access...');
    const database = await withRetry(() => 
      notion.databases.retrieve({
        database_id: DATABASE_ID
      })
    );
    console.log('✓ Successfully connected to database');
    console.log('Database name:', database.title[0]?.plain_text || database.id);
    
    // Test database query
    console.log('\nTesting database query...');
    const pages = await withRetry(() =>
      notion.databases.query({
        database_id: DATABASE_ID,
        page_size: 1
      })
    );
    console.log('✓ Successfully queried database');
    console.log('Found pages:', pages.results.length);
    
    console.log('\n✓ All tests passed successfully!');
    return true;
  } catch (error) {
    console.error('\n❌ Connection test failed:');
    console.error('Error type:', error.name);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'unauthorized') {
      console.error('\nTroubleshooting: Please verify your NOTION_API_KEY');
    } else if (error.code === 'object_not_found') {
      console.error('\nTroubleshooting: Please verify your DATABASE_ID');
    } else if (error.code === 'ECONNRESET') {
      console.error('\nTroubleshooting: Network connection issue detected');
      console.error('- Check your internet connection');
      console.error('- Verify if you need to configure a proxy');
      console.error('- Try running the test again');
    }
    
    return false;
  }
}

testConnection();