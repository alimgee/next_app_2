import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Intro from '@/app/home/Intro';
import { Items } from '@/app/news/Articles';
import { Container, Row, Col } from 'reactstrap';

export const metadata: Metadata = {
  title: "News & Events - Molly Rose",
  description: "Latest news and events related to childhood cancer awareness and support for families affected by childhood cancer.",
};

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