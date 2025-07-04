import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // You might also want to check for specific user roles here, e.g., session.user.role === 'admin'

    await prisma.article.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Article deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, content, link, date, provider } = await request.json();

    if (!name || !content || !link || !date || !provider) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const article = await prisma.article.create({
      data: {
        name,
        content,
        link,
        date,
        provider,
      },
    });

    return NextResponse.json({ message: 'Article added successfully', article }, { status: 201 });
  } catch (error) {
    console.error('Error adding article:', error);
    return NextResponse.json({ error: 'Failed to add article' }, { status: 500 });
  }
}