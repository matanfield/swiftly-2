import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

// Validate environment variables
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !DATABASE_ID) {
  console.error('Error: NOTION_API_KEY and NOTION_DATABASE_ID environment variables are required');
  process.exit(1);
}

const notion = new Client({
  auth: NOTION_API_KEY,
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Retry wrapper function
async function withRetry(operation, retries = MAX_RETRIES) {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await delay(RETRY_DELAY);
      return withRetry(operation, retries - 1);
    }
    throw error;
  }
}

// Convert table blocks to markdown
async function convertTableToMarkdown(block) {
  // Table conversion logic here
  return ''; // Placeholder for now
}

// Map Notion blocks to Markdown with enhanced support
async function convertBlocksToMarkdown(blocks) {
  let markdown = '';
  
  for (const block of blocks) {
    try {
      switch (block.type) {
        case 'paragraph':
          markdown += block.paragraph.rich_text.map(text => text.plain_text).join('') + '\n\n';
          break;
        case 'heading_1':
          markdown += '# ' + block.heading_1.rich_text.map(text => text.plain_text).join('') + '\n\n';
          break;
        case 'heading_2':
          markdown += '## ' + block.heading_2.rich_text.map(text => text.plain_text).join('') + '\n\n';
          break;
        case 'heading_3':
          markdown += '### ' + block.heading_3.rich_text.map(text => text.plain_text).join('') + '\n\n';
          break;
        case 'bulleted_list_item':
          markdown += '- ' + block.bulleted_list_item.rich_text.map(text => text.plain_text).join('') + '\n';
          break;
        case 'numbered_list_item':
          markdown += '1. ' + block.numbered_list_item.rich_text.map(text => text.plain_text).join('') + '\n';
          break;
        case 'code':
          markdown += '```' + (block.code.language || '') + '\n' + 
                     block.code.rich_text.map(text => text.plain_text).join('') + 
                     '\n```\n\n';
          break;
        case 'quote':
          markdown += '> ' + block.quote.rich_text.map(text => text.plain_text).join('') + '\n\n';
          break;
        case 'table':
          markdown += await convertTableToMarkdown(block);
          break;
        case 'image':
          if (block.image.type === 'external') {
            markdown += `![](${block.image.external.url})\n\n`;
          }
          break;
        default:
          console.log(`Unsupported block type: ${block.type}`);
      }
    } catch (error) {
      console.error(`Error processing block of type ${block.type}:`, error);
    }
  }
  
  return markdown;
}

// Get all pages from Notion database with retry
async function getNotionPages() {
  return withRetry(async () => {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Title',
          direction: 'ascending',
        },
      ],
    });

    return response.results;
  });
}

// Get content of a specific page with retry
async function getPageContent(pageId) {
  return withRetry(async () => {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    return convertBlocksToMarkdown(blocks.results);
  });
}

// Save content to markdown file with error handling
async function saveToMarkdown(filePath, content) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Successfully saved: ${filePath}`);
  } catch (error) {
    console.error(`Error saving file ${filePath}:`, error);
    throw error;
  }
}

// Main sync function with enhanced error handling
async function syncNotionToVitePress() {
  try {
    console.log('Starting Notion to VitePress sync...');
    const pages = await getNotionPages();
    console.log(`Found ${pages.length} pages to sync`);
    
    for (const page of pages) {
      try {
        if (!page.properties.Title?.title?.[0]?.plain_text || !page.properties.Tab?.select?.name) {
          console.error('Invalid page structure:', page.id);
          continue;
        }

        const title = page.properties.Title.title[0].plain_text;
        const tab = page.properties.Tab.select.name.toLowerCase();
        
        // Handle special case for home page
        if (tab === 'home' && title === 'index.md') {
          const content = await getPageContent(page.id);
          await saveToMarkdown('docs/index.md', content);
          continue;
        }
        
        // Create path based on tab and title
        const fileName = title.toLowerCase().replace(/\s+/g, '-');
        const filePath = `docs/${tab}/${fileName}`;
        
        const content = await getPageContent(page.id);
        await saveToMarkdown(filePath, content);
        
        console.log(`Synced: ${filePath}`);
      } catch (error) {
        console.error(`Error processing page ${page.id}:`, error);
      }
    }
    
    console.log('Sync completed successfully!');
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

// Run the sync
syncNotionToVitePress();