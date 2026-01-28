import { NextRequest, NextResponse } from 'next/server';

function escapeHtml(text: string): string {
  const map: {[key: string]: string} = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { encryptedData, referenceId, customerRefNumber, amount } = body;

    if (!encryptedData || typeof encryptedData !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid encrypted data' },
        { status: 400 }
      );
    }

    const paymentUrl = process.env.EASYPAY_PAYMENT_URL || 'https://uat-etendering.axis.bank.in/easypay2.0/frontend/api/payment';
    const escapedEncryptedData = escapeHtml(encryptedData);

    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body onload="document.forms[0].submit()">
          <form method="POST" action="${paymentUrl}">
            <input type="hidden" name="i" value="${escapedEncryptedData}" />
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
      encryptedData: escapedEncryptedData,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      }
    });

  } catch (error) {
    console.error('EasyPay API error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment initiation failed' },
      { status: 500 }
    );
  }
}
