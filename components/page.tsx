
import React from 'react';
import Intro from '../app/home/Intro';
import Quote from '@/app/home/Quote';
import CardSection from '@/app/home/Cards';
import NoticeSection from '@/app/home/Notice';

export default function HomePage() {
  return (
    <main>
      <Intro />
      <Quote />
      <NoticeSection />
      <CardSection />
    </main>
  );
};
