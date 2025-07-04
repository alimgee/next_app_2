'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AddArticlePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [provider, setProvider] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/auth/signin'); // Redirect to sign-in page if not authenticated
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // Client-side date validation
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      setMessage('Invalid date format. Please use YYYY-MM-DD.');
      return;
    }

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, content, link, date, provider }),
    });

    if (res.ok) {
      setMessage('Article added successfully!');
      setName('');
      setContent('');
      setLink('');
      setDate('');
      setProvider('');
      router.push('/news'); // Redirect to news page after successful submission
    } else {
      try {
        const data = await res.json();
        setMessage(`Failed to add article: ${data.error || res.statusText}`);
      } catch (error) {
        setMessage(`Failed to add article: ${res.statusText || 'Unknown error'}`);
      }
    }
  };

  if (status === 'loading' || !session) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Add New Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">Link</label>
          <input
            type="url"
            className="form-control"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="text"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g., July 4, 2025"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="provider" className="form-label">Provider</label>
          <input
            type="text"
            className="form-control"
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Article</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}