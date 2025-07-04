import { prisma } from '@/lib/prisma';
import Intro from '@/app/home/Intro';
import { Items } from '@/app/news/Articles';
import { Container, Row, Col } from 'reactstrap';

async function getArticles() {
  const articles = await prisma.article.findMany({
    orderBy: {
      date: 'desc',
    },
  });
  return articles;
}

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <main>
      <Intro />
      <Container>
        <Row>
          <Col>
            <h2>News & Events </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Items articles={articles} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}