const notion = new Client({ auth: process.env.NOTION_API_KEY });
// Check if NOTION_API_KEY is correctly set in your environment variables 