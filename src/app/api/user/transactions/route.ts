import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { transactions } from '@/db/schema';
import { eq, and, desc, asc, SQL } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    // Validate userId is provided
    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json({ 
        error: "Valid userId is required",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Filter parameters
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    // Sorting parameters
    const sortField = searchParams.get('sort') ?? 'createdAt';
    const sortOrder = searchParams.get('order') ?? 'desc';

    // Build query conditions
    const conditions: SQL[] = [eq(transactions.userId, parseInt(userId))];

    // Add type filter if provided
    if (type) {
      const validTypes = ['deposit', 'withdrawal', 'bet', 'win', 'bonus', 'refund'];
      if (!validTypes.includes(type)) {
        return NextResponse.json({ 
          error: "Invalid transaction type. Must be one of: deposit, withdrawal, bet, win, bonus, refund",
          code: "INVALID_TYPE" 
        }, { status: 400 });
      }
      conditions.push(eq(transactions.type, type));
    }

    // Add status filter if provided
    if (status) {
      const validStatuses = ['pending', 'completed', 'failed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ 
          error: "Invalid status. Must be one of: pending, completed, failed, cancelled",
          code: "INVALID_STATUS" 
        }, { status: 400 });
      }
      conditions.push(eq(transactions.status, status));
    }

    // Build the base query
    let baseQuery = db.select().from(transactions).where(and(...conditions));

    // Apply sorting based on conditions
    if (sortField === 'createdAt') {
      if (sortOrder === 'asc') {
        const results = await baseQuery.orderBy(asc(transactions.createdAt)).limit(limit).offset(offset);
        return NextResponse.json(results, { status: 200 });
      } else {
        const results = await baseQuery.orderBy(desc(transactions.createdAt)).limit(limit).offset(offset);
        return NextResponse.json(results, { status: 200 });
      }
    } else {
      // Default sorting
      const results = await baseQuery.orderBy(desc(transactions.createdAt)).limit(limit).offset(offset);
      return NextResponse.json(results, { status: 200 });
    }

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
