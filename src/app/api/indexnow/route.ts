import { NextResponse } from 'next/server';
import { submitToIndexNow } from '@/shared/utils/indexing';

export async function POST() {
  try {
    const results = await submitToIndexNow();
    const allOk = results.every(r => r.status === 200);

    return NextResponse.json({
      ok: allOk,
      results,
      message: allOk
        ? 'URLs submitted to IndexNow successfully'
        : 'Some IndexNow submissions failed',
    }, { status: allOk ? 200 : 502 });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: String(error),
    }, { status: 500 });
  }
}
