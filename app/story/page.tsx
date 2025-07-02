
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Intro from '@/app/home/Intro';
import Detail from '@/app/story/StoryDetail';

export default function StoryPage() {
    return (
        <main>
            <Intro />
            <Container className="mb-2">
                <Row>
                    <Col className="text-center">
                    <h2>Mollys Story </h2>
                    </Col>
                </Row>
            </Container>
            <Detail />
        </main>
    );
};
