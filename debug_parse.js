const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

try {
    const filePath = path.join(process.cwd(), 'src/content/countries', 'donetsk.mdx');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('File length:', fileContent.length);
    const { data, content } = matter(fileContent);
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('Content head:', content.substring(0, 100));
} catch (error) {
    console.error('Error during parsing:', error);
}
