import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const encResp = formData.get('encResp') as string;
    if (!encResp) {
      return NextResponse.redirect(new URL(`${process.env.BASE_URL}payment/response?status=error&message=No response data`));
    }

    const backendResponse = await fetch(process.env.BACKEND_API_URL_FOR_CCAVENUE!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `encResp=${encodeURIComponent(encResp)}`,
    });

    const data = await backendResponse.json();
    
    const statusMap: { [key: string]: string } = {
      'Success': 'success',
      'Failure': 'failed', 
      'Aborted': 'cancelled',
      'Invalid': 'failed',
      'Timeout': 'failed'
    };

    const status = statusMap[data.order_status] || 'failed';

    const params = new URLSearchParams({
      status,
      orderId: data.order_id || '',
      amount: data.amount || '',
      trackingId: data.bank_ref_no || '',
      message: `Payment ${data.order_status.toLowerCase()}. Mode: ${data.payment_mode || 'N/A'}`
    });
    
    return NextResponse.redirect(new URL(`${process.env.BASE_URL}payment/response?${params.toString()}`));
    
  } catch (error) {
    console.error('CCAvenue response processing error:', error);
    return NextResponse.redirect(new URL(`${process.env.BASE_URL}payment/response?status=error&message=Processing failed`));
  }
}