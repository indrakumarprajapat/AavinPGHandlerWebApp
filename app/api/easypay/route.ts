import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { encryptedData, referenceId, customerRefNumber, amount } = body;

    if (!encryptedData) {
      return NextResponse.json(
        { success: false, error: 'Missing encrypted data' },
        { status: 400 }
      );
    }

    const paymentUrl = process.env.EASYPAY_PAYMENT_URL || 'https://uat-etendering.axis.bank.in/easypay2.0/frontend/api/payment';

    const html = `
      <html>
        <body onload="document.forms[0].submit()">
          <form method="POST" action="${paymentUrl}">
            <input type="hidden" name="i" value="${encryptedData}" />
          </form>
          <p>Redirecting to Axis Bank...</p>
        </body>
      </html>
    `;

    return NextResponse.json({
      success: true,
      referenceId,
      customerRefNumber,
      amount,
      paymentUrl,
      html,
      encryptedData,
    });

  } catch (error) {
    console.error('EasyPay API error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Payment initiation failed' },
      { status: 500 }
    );
  }
}
