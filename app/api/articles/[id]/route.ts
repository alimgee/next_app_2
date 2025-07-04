import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Basic authentication check (same as add article)
  const authHeader = request.headers.get('authorization');
  const [type, credentials] = authHeader?.split(' ') || [];

  if (type !== 'Basic' || !credentials) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [username, password] = Buffer.from(credentials, 'base64').toString().split(':');

  if (username !== adminUsername || password !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    await prisma.article.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Article deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
