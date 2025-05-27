import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the data
    if (!data.customerDetails || !data.items || !data.total) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert order into database
    const [newOrder] = await db.insert(orders).values({
      customerDetails: data.customerDetails,
      items: data.items,
      total: data.total,
      status: 'pending',
      paymentStatus: 'pending'
    }).returning();

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      message: 'Order created successfully',
      order: newOrder
    });

  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // For fetching orders (if needed)
  return NextResponse.json({ message: 'Orders endpoint' });
}