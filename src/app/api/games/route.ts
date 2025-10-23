import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { games } from '@/db/schema';
import { eq, like, and, desc, asc, or, SQL } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Search parameter
    const search = searchParams.get('search');
    
    // Filter parameters
    const categoryId = searchParams.get('categoryId');
    const provider = searchParams.get('provider');
    const isFeatured = searchParams.get('featured');
    
    // Sort parameters
    const sort = searchParams.get('sort') ?? 'createdAt';
    const order = searchParams.get('order') ?? 'desc';

    // Build conditions array with proper typing
    const conditions: SQL[] = [eq(games.isActive, true)];

    // Add search condition
    if (search) {
      const searchConditions = [
        like(games.name, `%${search}%`),
        like(games.description, `%${search}%`),
        like(games.provider, `%${search}%`)
      ];
      
      const orCondition = or(...searchConditions);
      if (orCondition) {
        conditions.push(orCondition);
      }
    }

    // Add filter conditions
    if (categoryId && !isNaN(parseInt(categoryId))) {
      conditions.push(eq(games.categoryId, parseInt(categoryId)));
    }

    if (provider) {
      conditions.push(eq(games.provider, provider));
    }

    if (isFeatured !== null && isFeatured !== undefined) {
      const featuredValue = isFeatured === 'true' || isFeatured === '1';
      conditions.push(eq(games.isFeatured, featuredValue));
    }

    // Build the base query
    const baseQuery = db.select({
      id: games.id,
      name: games.name,
      slug: games.slug,
      categoryId: games.categoryId,
      provider: games.provider,
      imageUrl: games.imageUrl,
      thumbnailUrl: games.thumbnailUrl,
      description: games.description,
      minBet: games.minBet,
      maxBet: games.maxBet,
      rtp: games.rtp,
      isFeatured: games.isFeatured,
      playCount: games.playCount,
      createdAt: games.createdAt,
    }).from(games);

    // Apply conditions if any exist
    let finalQuery;
    if (conditions.length > 0) {
      finalQuery = baseQuery.where(and(...conditions));
    } else {
      finalQuery = baseQuery;
    }

    // Apply sorting
    switch (sort) {
      case 'playCount':
        finalQuery = finalQuery.orderBy(order === 'asc' ? asc(games.playCount) : desc(games.playCount));
        break;
      case 'name':
        finalQuery = finalQuery.orderBy(order === 'asc' ? asc(games.name) : desc(games.name));
        break;
      case 'createdAt':
      default:
        finalQuery = finalQuery.orderBy(order === 'asc' ? asc(games.createdAt) : desc(games.createdAt));
        break;
    }

    // Apply pagination and execute
    const results = await finalQuery.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET games error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}
