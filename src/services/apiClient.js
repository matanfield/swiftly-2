import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.notion.com/v1/',
  headers: {
    'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  },
});

// Test connection
apiClient.get('/databases').then(response => {
  console.log("Connected to Notion API:", response.status);
}).catch(error => {
  console.error("Failed to connect to Notion API:", error);
}); 