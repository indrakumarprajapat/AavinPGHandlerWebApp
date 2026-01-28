import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');
    const crn = searchParams.get('crn');
    const amt = searchParams.get('amt');
    const data = searchParams.get('data');

    if (!ref || !crn || !amt || !data) {
      return new NextResponse('Missing required parameters', { status: 400 });
    }

    const decryptedData = decodeURIComponent(data);
    const paymentUrl = process.env.EASYPAY_PAYMENT_URL || 'https://uat-etendering.axisbank.co.in/easypay2.0/frontend/index.php/api/payment';

    // Create HTML page that will auto-submit to Axis Bank from server
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Redirecting to Axis Bank...</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px;
              background: #f5f5f5;
            }
            .loader {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #3498db;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 2s linear infinite;
              margin: 20px auto;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body onload="document.forms[0].submit()">
          <h2>Redirecting to Axis Bank Payment Gateway...</h2>
          <div class="loader"></div>
          <p>Please wait while we redirect you to the secure payment page.</p>
          
          <form method="POST" action="${paymentUrl}" id="paymentForm">
            <input type="hidden" name="i" value="${decryptedData}" />
          </form>
          
          <script>
            // Auto-submit after 2 seconds if onload doesn't work
            setTimeout(function() {
              document.getElementById('paymentForm').submit();
            }, 2000);
          </script>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Payment page error:', error);
    return new NextResponse('Payment initialization failed', { status: 500 });
  }
}