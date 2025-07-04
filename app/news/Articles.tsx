'use client';

import React from "react";
import Script from 'next/script';
import { Card, CardBody } from 'reactstrap';
import { useSession } from 'next-auth/react';

export const Items = ({ articles }) => {
    const { data: session } = useSession();

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this article?')) {
            return;
        }

        const res = await fetch(`/api/articles`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            alert('Article deleted successfully!');
            // You might want to refresh the page or remove the item from the list
            window.location.reload();
        } else {
            const data = await res.json();
            alert(`Failed to delete article: ${data.error || res.statusText}`);
        }
    };

    return (
        <div>
            {articles.map((data, key) => (
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
                            <div className="small text-muted mt-1">{new Date(data.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            {session && (
                                <button
                                    className="btn btn-danger btn-sm mt-2"
                                    onClick={() => handleDelete(data.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-text="Driving awareness of childhood cancer." data-hashtags="ChildhoodCancer" data-related="mollyrosecancer" data-show-count="false">Tweet</a>
                    </CardBody>
                </Card>
            ))}
            <Script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></Script>
        </div>
    );
};
