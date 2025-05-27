import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { addresses } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
    const userAddresses = await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, userId));

    return NextResponse.json({ success: true, addresses: userAddresses });
  } catch (error) {
    console.error('Fetch addresses error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch addresses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const newAddress = await db
      .insert(addresses)
      .values({
        userId: data.userId,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        pincode: data.pincode,
        city: data.city,
        state: data.state,
        isDefault: data.isDefault || false
      })
      .returning();

    return NextResponse.json({
      success: true,
      address: newAddress[0]
    });
  } catch (error) {
    console.error('Save address error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save address' },
      { status: 500 }
    );
  }
}