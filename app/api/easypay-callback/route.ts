import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const encryptedResponse = formData.get('i') as string;

    if (!encryptedResponse) {
      return NextResponse.json(
        { success: false, error: 'No response data' },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/bapi/orders/verify-easypay-payment`;
    
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        encryptedResponse,
        transactionId: request.nextUrl.searchParams.get('transactionId') || 0
      }),
    });

    const data = await backendResponse.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        data
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Payment verification failed',
        error: data.error
      }, { status: 400 });
    }

  } catch (error) {
    console.error('EasyPay callback error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Callback processing failed' },
      { status: 500 }
    );
  }
}
