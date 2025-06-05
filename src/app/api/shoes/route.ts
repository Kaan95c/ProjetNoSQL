import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Shoe from '@/models/Shoe';

export async function GET() {
  try {
    await connectDB();
    const shoes = await Shoe.find({}).sort({ createdAt: -1 });
    return NextResponse.json(shoes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des chaussures' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const shoe = await Shoe.create(data);
    return NextResponse.json(shoe, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création de la chaussure' },
      { status: 500 }
    );
  }
} 