const { PrismaClient } = require('../generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const articlesPath = path.join(__dirname, '../app/news/data.json');
  const archivedArticlesPath = path.join(__dirname, '../app/news/archive_data.json');

  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  const archivedArticles = JSON.parse(fs.readFileSync(archivedArticlesPath, 'utf-8'));

  console.log(`Found ${articles.length} articles and ${archivedArticles.length} archived articles.`);

  for (const article of articles) {
    console.log(`Creating article: ${article.name}`);
    await prisma.article.create({
      data: article,
    });
  }

  for (const article of archivedArticles) {
    console.log(`Creating archived article: ${article.name}`);
    await prisma.article.create({
      data: article,
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });