
'use client';

import React from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import Intro from '@/app/home/Intro';
import { Items } from '@/app/news/Articles';
import TwitterContainer from '@/app/about/Twitter';

export default function NewsPage() {

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
                        <Items />
                    </Col>
                    <Col md="4">
                        <TwitterContainer />
                    </Col>
                </Row>
            </Container>
        </main>
    );
};
