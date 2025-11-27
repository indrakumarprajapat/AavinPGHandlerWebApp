import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const encResp = formData.get('encResp') as string;
    
    if (!encResp) {
      return NextResponse.redirect(new URL('/payment/success?status=error&message=No response data', request.url));
    }

    // Call your backend API to decrypt the response
    const backendResponse = await fetch('https://7d9cbac7a91a.ngrok-free.app/ccavenue/payment-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `encResp=${encodeURIComponent(encResp)}`,
    });

    // The backend will redirect, so we follow that redirect
    return NextResponse.redirect(backendResponse.url);
    
  } catch (error) {
    console.error('CCAvenue response processing error:', error);
    return NextResponse.redirect(new URL('/payment/success?status=error&message=Processing failed', request.url));
  }
}