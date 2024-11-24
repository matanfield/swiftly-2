const databaseId = process.env.NOTION_DATABASE_ID;
const notion = new Client({ auth: process.env.NOTION_API_KEY, logLevel: LogLevel.DEBUG });

// Function to fetch pages
async function fetchPages() {
  try {
    const response = await notion.databases.query({ database_id: databaseId });
    // Ensure 'Title' and 'Tab' properties exist
    response.results.forEach(page => {
      const title = page.properties.Title.title[0].plain_text;
      const tab = page.properties.Tab.select.name;
      // ... existing code ...
    });
  } catch (error) {
    console.error("Error fetching pages from Notion:", error);
    throw error;
  }
}
// ... existing code ... 