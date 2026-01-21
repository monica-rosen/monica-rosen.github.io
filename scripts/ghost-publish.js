const GhostAdminAPI = require('@tryghost/admin-api');
const fs = require('fs');
const marked = require('marked');
const matter = require('gray-matter'); // NEW: Handles Jekyll Front Matter

async function publishPost() {
  const filePath = process.argv[2];
  console.log(`📂 Robot is looking at file: ${filePath}`); // ADD THIS LINE
  
  if (!filePath || !fs.existsSync(filePath)) {
    console.error("❌ Error: The robot couldn't find the file path provided.");
    process.exit(1);
  }

  const fileString = fs.readFileSync(filePath, 'utf8');

  // 1. Use gray-matter to split the file
  // 'data' is your Front Matter (title, date, etc.)
  // 'content' is the actual Markdown story
  const { data, content } = matter(fileString);

  // 2. Convert Markdown to HTML
  const htmlBody = marked.parse(content);

  // 3. Initialize Ghost API
  const api = new GhostAdminAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: 'v5.0'
  });

  try {
    console.log(`🚀 Syncing Jekyll post: "${data.title}"`);
    await api.posts.add(
      {
        title: data.title || "Untitled Post", // Uses the title from your Jekyll header
        html: htmlBody,
        status: 'draft'
      },
      { source: 'html' }
    );
    console.log('✅ Success! Draft created in Ghost.');
  } catch (err) {
    console.error('❌ Ghost Sync Error:', err);
    process.exit(1);
  }
}

publishPost();