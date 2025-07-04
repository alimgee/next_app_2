import { prisma } from '@/lib/prisma';

async function getFirstArticle() {
  const article = await prisma.article.findFirst();
  return article;
}

export async function FirstArticle() {
  const article = await getFirstArticle();

  if (!article) {
    return null;
  }

  return (
    <>
      <div className="card-text" ><h3 className="news-header" style={{fontFamily:"Roboto Mono"}}>{article.name} </h3></div>
      <div className="card-text mb-3"><span >{article.content}</span></div>
    </>
  );
}