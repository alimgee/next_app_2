import { prisma } from '@/lib/prisma';
import Intro from '@/app/home/Intro';
import { Items } from '@/app/news/Articles';
import TwitterContainer from '@/app/about/Twitter';
import { Container, Row, Col } from 'reactstrap';

async function getArticles() {
  const articles = await prisma.article.findMany();
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
          <Col md="8">
            <Items articles={articles} />
          </Col>
          <Col md="4">
            <TwitterContainer />
          </Col>
        </Row>
      </Container>
    </main>
  );
}