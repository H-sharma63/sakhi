import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export { prisma }

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const customer = await prisma.customer.upsert({
      where: {
        email: data.email,
      },
      update: {
        name: data.name,
        mobile: data.mobile,
        address: data.address,
        pincode: data.pincode,
        city: data.city,
        state: data.state,
      },
      create: {
        email: data.email,
        name: data.name,
        mobile: data.mobile,
        address: data.address,
        pincode: data.pincode,
        city: data.city,
        state: data.state,
      },
    });

    return NextResponse.json({ success: true, customer });
  } catch (error) {
    console.error('Error saving customer details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save customer details' },
      { status: 500 }
    );
  }
}