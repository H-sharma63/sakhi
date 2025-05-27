import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { addresses } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Delete the address from database
    await db
      .delete(addresses)
      .where(eq(addresses.id, parseInt(params.id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete address error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete address' },
      { status: 500 }
    );
  }
}