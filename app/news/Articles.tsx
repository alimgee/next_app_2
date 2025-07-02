
'use client';

import React, { useState } from "react";
import Script from 'next/script';
import { Articles } from "./data";
import { ArchivedArticles } from "./archive_data";
import {
    Card,
    CardBody,
    Collapse,
    Button
} from 'reactstrap';

export const Items = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            {Articles.map((data, key) => (
                <Card key={key} className="mb-3">
                    <CardBody>
                        <div>
                            <div className="card-text">
                                <a href={data.link} target="_blank" rel="noopener noreferrer" title="Go to news article" style={{ textDecoration: "none" }}>
                                    <div className="news-header">{data.name}</div>
                                </a>
                                <div className="news-content">{data.content}</div>
                                <span className="small text-muted">(source: {data.provider})</span>
                            </div>
                            <div className="small text-muted mt-1">{data.date}</div>
                        </div>
                        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-text="Driving awareness of childhood cancer." data-hashtags="ChildhoodCancer" data-related="mollyrosecancer" data-show-count="false">Tweet</a>
                    </CardBody>
                </Card>
            ))}
            <div>
                <Button onClick={toggle} style={{ marginBottom: '1.5rem', padding: '0.5rem 1.5rem' }}>
                    View Archived Articles <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </Button>
                <Collapse isOpen={isOpen}>
                    <div>
                        {ArchivedArticles.map((data, key) => (
                            <Card key={key} className="mb-3">
                                <CardBody>
                                    <div>
                                        <div className="card-text">
                                            <a href={data.link} target="_blank" rel="noopener noreferrer" title="Go to news article" style={{ textDecoration: "none" }}>
                                                <div className="news-header">{data.name}</div>
                                            </a>
                                            <div className="news-content">{data.content}</div>
                                            <span className="small text-muted">(source: {data.provider})</span>
                                        </div>
                                        <div className="small text-muted mt-1">{data.date}</div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </Collapse>
            </div>
            <Script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></Script>
        </div>
    );
};
