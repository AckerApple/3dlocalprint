import{t as h,g as b,d as t,E as y,p as s,s as v,v as _,w,x as u,y as l,z as k,S,e as q,A as i,c as n,f as A,h as I,r as C,O as P}from"./version-C_UQfkTo.js";import{A as T}from"./AdminNav.tag-kSILiezC.js";import{s as z,t as $,r as U}from"./adminAppShell-QS_Abidu.js";import{M as L}from"./Modal.tag-CMCRkOrv.js";import"./adminNavItems-BfDQVnSf.js";import"./firebase-Bb7YeuhM.js";const p=[{id:"internal-order-notification",name:"Internal Order Notification",audience:"internal",trigger:"Sent to service when a checkout order is paid or manually resent from admin.",sourceFunction:"buildOrderNotificationEmail",sampleInput:{orderId:"order_test_sample_123",status:"paid",lineItems:[{productId:"dragon-keychain",variationId:"painted",quantity:2,title:"Dragon Keychain (Painted)",unitAmount:1200,currency:"usd"}],currency:"usd",amountSubtotal:2400,amountTax:168,amountShipping:0,amountTotal:2568,customerEmail:"customer@example.com",customerName:"Sample Customer",stripeMode:"sandbox",adminOrderUrl:"https://3dlocalprint.com/admin/orders/index.html?orderId=order_test_sample_123",publicOrderUrl:"https://3dlocalprint.com/order.html?order_id=order_test_sample_123&email=customer%40example.com",stripeDashboardUrl:"https://dashboard.stripe.com/test/payments/pi_sample"},variables:["adminOrderUrl","amountShipping","amountSubtotal","amountTax","amountTotal","currency","customerEmail","customerName","lineItems","orderId","publicOrderUrl","status","stripeDashboardUrl","stripeMode"],rendered:{subject:"(test) Order order_test_sample_123 created - $25.68",text:`Order: order_test_sample_123
Status: paid
Mode: sandbox
Customer: Sample Customer · customer@example.com
Subtotal: $24.00
Tax: $1.68
Shipping: $0.00
Total: $25.68
Items:
- 2x Dragon Keychain (Painted) @ $12.00 = $24.00
Review order: https://3dlocalprint.com/admin/orders/index.html?orderId=order_test_sample_123
Customer order page: https://3dlocalprint.com/order.html?order_id=order_test_sample_123&email=customer%40example.com
Stripe: https://dashboard.stripe.com/test/payments/pi_sample`,html:`
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Order created</h1>
            <div style="margin-top:10px;font-size:16px;">order_test_sample_123</div>
          </div>
          <div style="padding:24px 26px;">
            <div style="display:inline-block;background:#fff0e5;color:#ad4f20;border:1px solid #f3c1a4;border-radius:999px;padding:6px 10px;font-size:13px;font-weight:700;text-transform:capitalize;">
              paid · sandbox
            </div>
            <h2 style="margin:20px 0 8px;font-size:18px;color:#2c211b;">Customer</h2>
            <p style="margin:0 0 20px;color:#4d3a31;line-height:1.5;">Sample Customer · customer@example.com</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px;">
              <thead>
                <tr>
                  <th align="left" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Item</th>
                  <th align="center" style="padding:0 8px 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Qty</th>
                  <th align="right" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Each</th>
                  <th align="right" style="padding:0 0 8px 12px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Line</th>
                </tr>
              </thead>
              <tbody>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f1e2d8;">
          <div style="font-weight:700;color:#2c211b;">Dragon Keychain (Painted)</div>
          <div style="margin-top:3px;color:#7b6255;font-size:13px;">dragon-keychain · painted</div>
        </td>
        <td align="center" style="padding:12px 8px;border-bottom:1px solid #f1e2d8;color:#2c211b;">2</td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #f1e2d8;color:#2c211b;">$12.00</td>
        <td align="right" style="padding:12px 0 12px 12px;border-bottom:1px solid #f1e2d8;font-weight:700;color:#2c211b;">$24.00</td>
      </tr>
    </tbody>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;">
              <tr><td style="padding:14px 16px 6px;color:#7b6255;">Subtotal</td><td align="right" style="padding:14px 16px 6px;color:#2c211b;">$24.00</td></tr>
              <tr><td style="padding:6px 16px;color:#7b6255;">Tax</td><td align="right" style="padding:6px 16px;color:#2c211b;">$1.68</td></tr>
              <tr><td style="padding:6px 16px 14px;color:#7b6255;">Shipping</td><td align="right" style="padding:6px 16px 14px;color:#2c211b;">$0.00</td></tr>
              <tr><td style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:18px;font-weight:700;color:#2c211b;">Total</td><td align="right" style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:20px;font-weight:700;color:#de6a2e;">$25.68</td></tr>
            </table>
            <div style="margin-top:24px;">
              <a href="https://3dlocalprint.com/admin/orders/index.html?orderId=order_test_sample_123" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review order in admin</a>
              <a href="https://3dlocalprint.com/order.html?order_id=order_test_sample_123&amp;email=customer%40example.com" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Customer page</a>
              <a href="https://dashboard.stripe.com/test/payments/pi_sample" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Open Stripe</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}},{id:"customer-order-receipt",name:"Customer Order Receipt",audience:"customer",trigger:"Sent to the customer when a checkout order is paid or manually resent from admin.",sourceFunction:"buildCustomerOrderEmail",sampleInput:{orderId:"order_test_sample_123",status:"paid",lineItems:[{productId:"dragon-keychain",variationId:"painted",quantity:2,title:"Dragon Keychain (Painted)",unitAmount:1200,currency:"usd"}],currency:"usd",amountSubtotal:2400,amountTax:168,amountShipping:0,amountTotal:2568,customerEmail:"customer@example.com",customerName:"Sample Customer",stripeMode:"sandbox",adminOrderUrl:"https://3dlocalprint.com/admin/orders/index.html?orderId=order_test_sample_123",publicOrderUrl:"https://3dlocalprint.com/order.html?order_id=order_test_sample_123&email=customer%40example.com",stripeDashboardUrl:"https://dashboard.stripe.com/test/payments/pi_sample"},variables:["adminOrderUrl","amountShipping","amountSubtotal","amountTax","amountTotal","currency","customerEmail","customerName","lineItems","orderId","publicOrderUrl","status","stripeDashboardUrl","stripeMode"],rendered:{subject:"(test) Your 3D Local Print order order_test_sample_123",text:`Hi Sample Customer,

Thanks for your order with 3D Local Print. We received your payment and will follow up if we need anything else.

Order: order_test_sample_123
Subtotal: $24.00
Tax: $1.68
Shipping: $0.00
Total: $25.68

Items:
- 2x Dragon Keychain (Painted) @ $12.00 = $24.00

Review your order: https://3dlocalprint.com/order.html?order_id=order_test_sample_123&email=customer%40example.com

Questions? Reply to this email and we will help.`,html:`
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Thanks for your order</h1>
            <div style="margin-top:10px;font-size:16px;">order_test_sample_123</div>
          </div>
          <div style="padding:24px 26px;">
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.55;">Hi Sample Customer,</p>
            <p style="margin:0 0 22px;color:#4d3a31;line-height:1.55;">We received your payment and will follow up if we need anything else. Reply to this email with any questions.</p>
            <div style="margin:0 0 22px;"><a href="https://3dlocalprint.com/order.html?order_id=order_test_sample_123&amp;email=customer%40example.com" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review order details</a></div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 22px;">
              <thead>
                <tr>
                  <th align="left" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Item</th>
                  <th align="center" style="padding:0 8px 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Qty</th>
                  <th align="right" style="padding:0 0 8px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Each</th>
                  <th align="right" style="padding:0 0 8px 12px;color:#7b6255;font-size:12px;text-transform:uppercase;letter-spacing:.06em;">Line</th>
                </tr>
              </thead>
              <tbody>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f1e2d8;">
          <div style="font-weight:700;color:#2c211b;">Dragon Keychain (Painted)</div>
        </td>
        <td align="center" style="padding:12px 8px;border-bottom:1px solid #f1e2d8;color:#2c211b;">2</td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #f1e2d8;color:#2c211b;">$12.00</td>
        <td align="right" style="padding:12px 0 12px 12px;border-bottom:1px solid #f1e2d8;font-weight:700;color:#2c211b;">$24.00</td>
      </tr>
    </tbody>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;">
              <tr><td style="padding:14px 16px 6px;color:#7b6255;">Subtotal</td><td align="right" style="padding:14px 16px 6px;color:#2c211b;">$24.00</td></tr>
              <tr><td style="padding:6px 16px;color:#7b6255;">Tax</td><td align="right" style="padding:6px 16px;color:#2c211b;">$1.68</td></tr>
              <tr><td style="padding:6px 16px 14px;color:#7b6255;">Shipping</td><td align="right" style="padding:6px 16px 14px;color:#2c211b;">$0.00</td></tr>
              <tr><td style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:18px;font-weight:700;color:#2c211b;">Total</td><td align="right" style="padding:14px 16px;border-top:1px solid #f1e2d8;font-size:20px;font-weight:700;color:#de6a2e;">$25.68</td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `}},{id:"internal-model-link-quote-request",name:"Internal Model-Link Quote Request",audience:"internal",trigger:"Sent to service when a customer submits the Print By Link quote form.",sourceFunction:"buildModelLinkQuoteRequestEmail",sampleInput:{requestId:"quote_sample_123",customerName:"Sample Customer",customerEmail:"customer@example.com",customerPhone:"555-0100",modelItems:[{url:"https://example.com/model.stl",quantity:1}],modelLinks:["https://example.com/model.stl"],projectDetails:"Please print this sample model in black PLA.",quantity:1,pageUrl:"https://3dlocalprint.com/print-model-link.html",publicReviewUrl:"https://3dlocalprint.com/print-model-link-order.html?request_id=quote_sample_123&email=customer%40example.com",adminReviewUrl:"https://3dlocalprint.com/admin/link-orders/index.html?requestId=quote_sample_123",createdAt:"2026-06-26T12:00:00.000Z"},variables:["adminReviewUrl","createdAt","customerEmail","customerName","customerPhone","modelItems","modelLinks","pageUrl","projectDetails","publicReviewUrl","quantity","requestId"],rendered:{subject:"Model link quote request quote_sample_123 - Sample Customer",text:`Quote request: quote_sample_123
Created: 2026-06-26T12:00:00.000Z
Customer: Sample Customer · customer@example.com · 555-0100
Quantity: 1
Model links:
- 1x https://example.com/model.stl
Project details:
Please print this sample model in black PLA.
Admin review: https://3dlocalprint.com/admin/link-orders/index.html?requestId=quote_sample_123
Customer review: https://3dlocalprint.com/print-model-link-order.html?request_id=quote_sample_123&email=customer%40example.com
Submitted from: https://3dlocalprint.com/print-model-link.html`,html:`
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Model link quote request</h1>
            <div style="margin-top:10px;font-size:16px;">quote_sample_123</div>
          </div>
          <div style="padding:24px 26px;">
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Customer</h2>
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.5;">Sample Customer · customer@example.com · 555-0100</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;margin:0 0 22px;">
              <tr><td style="padding:14px 16px;color:#7b6255;">Quantity</td><td align="right" style="padding:14px 16px;color:#2c211b;font-weight:700;">1</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Created</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">2026-06-26T12:00:00.000Z</td></tr>
            </table>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Model links</h2>
            <ul style="margin:0 0 22px;padding-left:20px;">
      <li style="margin:0 0 8px;">
        <strong>1x</strong>
        <a href="https://example.com/model.stl" style="color:#ad4f20;text-decoration:none;font-weight:700;">https://example.com/model.stl</a>
      </li>
    </ul>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Project details</h2>
            <p style="white-space:pre-wrap;margin:0 0 22px;color:#4d3a31;line-height:1.55;">Please print this sample model in black PLA.</p>
            <div style="margin:0 0 22px;">
              <a href="https://3dlocalprint.com/admin/link-orders/index.html?requestId=quote_sample_123" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review link order</a>
              <a href="https://3dlocalprint.com/print-model-link-order.html?request_id=quote_sample_123&amp;email=customer%40example.com" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Customer page</a>
            </div>
            <p style="margin:0;color:#7b6255;font-size:13px;">Submitted from https://3dlocalprint.com/print-model-link.html</p>
          </div>
        </div>
      </div>
    </div>
  `}},{id:"customer-model-link-quote-acknowledgement",name:"Customer Model-Link Quote Acknowledgement",audience:"customer",trigger:"Sent to the customer after they submit the Print By Link quote form.",sourceFunction:"buildCustomerModelLinkQuoteEmail",sampleInput:{requestId:"quote_sample_123",customerName:"Sample Customer",customerEmail:"customer@example.com",customerPhone:"555-0100",modelItems:[{url:"https://example.com/model.stl",quantity:1}],modelLinks:["https://example.com/model.stl"],projectDetails:"Please print this sample model in black PLA.",quantity:1,pageUrl:"https://3dlocalprint.com/print-model-link.html",publicReviewUrl:"https://3dlocalprint.com/print-model-link-order.html?request_id=quote_sample_123&email=customer%40example.com",adminReviewUrl:"https://3dlocalprint.com/admin/link-orders/index.html?requestId=quote_sample_123",createdAt:"2026-06-26T12:00:00.000Z"},variables:["adminReviewUrl","createdAt","customerEmail","customerName","customerPhone","modelItems","modelLinks","pageUrl","projectDetails","publicReviewUrl","quantity","requestId"],rendered:{subject:"Your 3D Local Print quote request quote_sample_123",text:`Hi Sample Customer,

We received your model link quote request. We will review the model, printability, material, and timing, then reply with a quote before anything is printed.

Quote request: quote_sample_123
Quantity: 1

Model links:
- 1x https://example.com/model.stl

Project details:
Please print this sample model in black PLA.

Review your request: https://3dlocalprint.com/print-model-link-order.html?request_id=quote_sample_123&email=customer%40example.com

Questions or changes? Reply to this email.`,html:`
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Quote request received</h1>
            <div style="margin-top:10px;font-size:16px;">quote_sample_123</div>
          </div>
          <div style="padding:24px 26px;">
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.55;">Hi Sample Customer,</p>
            <p style="margin:0 0 22px;color:#4d3a31;line-height:1.55;">We received your model link quote request. We will review printability, material, and timing, then reply with a quote before anything is printed.</p>
            <div style="margin:0 0 22px;"><a href="https://3dlocalprint.com/print-model-link-order.html?request_id=quote_sample_123&amp;email=customer%40example.com" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review request details</a></div>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Model links</h2>
            <ul style="margin:0 0 22px;padding-left:20px;">
    <li style="margin:0 0 8px;">
      <strong>1x</strong>
      <a href="https://example.com/model.stl" style="color:#ad4f20;text-decoration:none;font-weight:700;">https://example.com/model.stl</a>
    </li>
  </ul>
            <h2 style="margin:0 0 8px;font-size:18px;color:#2c211b;">Quote details</h2>
            <p style="white-space:pre-wrap;margin:0;color:#4d3a31;line-height:1.55;">Total quantity: 1

Please print this sample model in black PLA.</p>
          </div>
        </div>
      </div>
    </div>
  `}},{id:"customer-agreement-sign-request",name:"Customer Agreement Sign Request",audience:"customer",trigger:"Manually sent from the agreement edit screen when an admin wants the customer to review, sign, and pay.",sourceFunction:"buildAgreementSignRequestEmail",sampleInput:{agreementId:"agreement_sample_123",clientBusiness:"Sample Agreement",clientRepresentative:"Sample Customer",customerEmail:"customer@example.com",providerName:"3D Local Print LLC",serviceStartDate:"2026-06-26",serviceEndDate:"2027-06-25",yearlyAmount:24e3,currency:"usd",publicAgreementUrl:"https://3dlocalprint.com/agreement.html?token=sample_private_token"},variables:["agreementId","clientBusiness","clientRepresentative","currency","customerEmail","providerName","publicAgreementUrl","serviceEndDate","serviceStartDate","yearlyAmount"],rendered:{subject:"Service Agreement for Sample Agreement",text:`Hi Sample Customer,

Your 3D Local Print service agreement is ready for review, signature, and payment.

Agreement: agreement_sample_123
Business: Sample Agreement
Provider: 3D Local Print LLC
Service period: 2026-06-26 through 2027-06-25
Yearly amount: $240.00

Review and sign: https://3dlocalprint.com/agreement.html?token=sample_private_token

Questions or changes? Reply to this email before signing.`,html:`
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Service agreement ready</h1>
            <div style="margin-top:10px;font-size:16px;">Sample Agreement</div>
          </div>
          <div style="padding:24px 26px;">
            <p style="margin:0 0 18px;color:#4d3a31;line-height:1.55;">Hi Sample Customer,</p>
            <p style="margin:0 0 22px;color:#4d3a31;line-height:1.55;">Your service agreement is ready for review, signature, and payment. Please open the private agreement link below when you are ready.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;margin:0 0 22px;">
              <tr><td style="padding:14px 16px;color:#7b6255;">Agreement</td><td align="right" style="padding:14px 16px;color:#2c211b;font-weight:700;">agreement_sample_123</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Business</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">Sample Agreement</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Service period</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">2026-06-26 through 2027-06-25</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Yearly amount</td><td align="right" style="padding:0 16px 14px;color:#de6a2e;font-size:18px;font-weight:700;">$240.00</td></tr>
            </table>
            <div style="margin:0 0 22px;">
              <a href="https://3dlocalprint.com/agreement.html?token=sample_private_token" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">Review and sign agreement</a>
            </div>
            <p style="margin:0;color:#7b6255;font-size:13px;line-height:1.5;">Questions or changes? Reply to this email before signing.</p>
          </div>
        </div>
      </div>
    </div>
  `}},{id:"internal-agreement-payment-notification",name:"Internal Agreement Payment Notification",audience:"internal",trigger:"Sent to service when a linked service agreement payment is completed.",sourceFunction:"buildAgreementPaymentNotificationEmail",sampleInput:{agreementId:"agreement_sample_123",clientBusiness:"Sample Agreement",customerEmail:"customer@example.com",customerName:"Sample Customer",acceptedSignerName:"Sample Customer",paidAt:"2026-06-26T12:30:00.000Z",amountTotal:24e3,currency:"usd",orderId:"order_test_sample_123",stripeMode:"sandbox",adminAgreementUrl:"https://3dlocalprint.com/admin/agreements/index.html?agreementId=agreement_sample_123",adminOrderUrl:"https://3dlocalprint.com/admin/orders/index.html?orderId=order_test_sample_123",publicAgreementUrl:"https://3dlocalprint.com/agreement.html?token=sample_private_token",stripeDashboardUrl:"https://dashboard.stripe.com/test/payments/pi_sample"},variables:["acceptedSignerName","adminAgreementUrl","adminOrderUrl","agreementId","amountTotal","clientBusiness","currency","customerEmail","customerName","orderId","paidAt","publicAgreementUrl","stripeDashboardUrl","stripeMode"],rendered:{subject:"(test) Agreement paid - Sample Agreement - $240.00",text:`Agreement paid: agreement_sample_123
Business: Sample Agreement
Signer: Sample Customer
Customer: Sample Customer · customer@example.com
Paid: 2026-06-26T12:30:00.000Z
Amount: $240.00
Order: order_test_sample_123
Mode: sandbox
View agreement: https://3dlocalprint.com/admin/agreements/index.html?agreementId=agreement_sample_123
View order: https://3dlocalprint.com/admin/orders/index.html?orderId=order_test_sample_123
Public agreement: https://3dlocalprint.com/agreement.html?token=sample_private_token
Stripe: https://dashboard.stripe.com/test/payments/pi_sample`,html:`
    <div style="margin:0;background:#fff7f1;font-family:Arial,Helvetica,sans-serif;color:#2c211b;">
      <div style="max-width:680px;margin:0 auto;padding:28px 18px;">
        <div style="background:#ffffff;border:1px solid #f1d8c9;border-radius:14px;overflow:hidden;">
          <div style="background:#de6a2e;padding:24px 26px;color:#ffffff;">
            <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">3D Local Print</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Agreement paid</h1>
            <div style="margin-top:10px;font-size:16px;">Sample Agreement</div>
          </div>
          <div style="padding:24px 26px;">
            <div style="display:inline-block;background:#fff0e5;color:#ad4f20;border:1px solid #f3c1a4;border-radius:999px;padding:6px 10px;font-size:13px;font-weight:700;text-transform:capitalize;">
              $240.00 · sandbox
            </div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffaf6;border:1px solid #f1e2d8;border-radius:10px;margin:22px 0;">
              <tr><td style="padding:14px 16px;color:#7b6255;">Agreement</td><td align="right" style="padding:14px 16px;color:#2c211b;font-weight:700;">agreement_sample_123</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Business</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">Sample Agreement</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Customer</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">Sample Customer · customer@example.com</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Signer</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">Sample Customer</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Paid</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">2026-06-26T12:30:00.000Z</td></tr>
              <tr><td style="padding:0 16px 14px;color:#7b6255;">Order</td><td align="right" style="padding:0 16px 14px;color:#2c211b;">order_test_sample_123</td></tr>
            </table>
            <div style="margin-top:24px;">
              <a href="https://3dlocalprint.com/admin/agreements/index.html?agreementId=agreement_sample_123" style="display:inline-block;background:#de6a2e;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 16px;font-weight:700;">View agreement</a>
              <a href="https://3dlocalprint.com/admin/orders/index.html?orderId=order_test_sample_123" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">View order</a>
              <a href="https://dashboard.stripe.com/test/payments/pi_sample" style="display:inline-block;margin-left:10px;color:#ad4f20;text-decoration:none;font-weight:700;">Open Stripe</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}}];let c=document.getElementById("alertTemplatesApp");const a={current:c},o=new S(0,e=>{e.next(0)});let m=!1,x=null,f=()=>Promise.resolve(),g="";const D=e=>JSON.stringify(e,null,2),R=()=>p.find(e=>e.id===g)||null,M=e=>{g=e,o.next((Number(o.value)||0)+1)},O=()=>{g="",o.next((Number(o.value)||0)+1)},d=(e,r="")=>t.class`alert-template-source-block`(C(e),P.class`alert-template-code`(r||"No source output.")),N=e=>t.class`alert-template-detail`(t.class`alert-template-detail-header`(t(I.class`orders-detail-section-title`(e.name),s.class`orders-meta`(`${e.sourceFunction} · ${e.audience}`)),n.class(r=>`pill alert-template-audience alert-template-audience-${e.audience}`)(e.audience)),s.class`alert-template-trigger`(e.trigger),t.class`alert-template-variable-list`(e.variables.map(r=>n.class`product-category-pill`(r).key(`${e.id}-${r}`))),d("Subject",e.rendered.subject),d("Text Body",e.rendered.text),d("HTML Source",e.rendered.html),d("Sample Input",D(e.sampleInput))),E=()=>v(o,()=>{const e=R();return L({modalOpen:!!e,title:e?e.name:"Alert Template",className:"ledger-modal alert-template-modal",cardClassName:"ledger-modal-card alert-template-modal-card",bodyClassName:"alert-template-modal-body",onClose:O,content:()=>e?N(e):null})}),Q=e=>u.class`ledger-row`(i(n.class`ledger-title-cell`(e.name)),i(n.class(r=>`pill alert-template-audience alert-template-audience-${e.audience}`)(e.audience)),i(n.class`orders-meta`(e.sourceFunction)),i(t.class`ledger-actions`(A.type`button`.class`ghost-button alert-template-view-button`.onClick(()=>M(e.id))("View")))).key(`row-${e.id}`),j=()=>t.class`ledger-table-block`(t.class`ledger-table-wrap`(_.class`ledger-table alert-templates-table`(w(u(l("Template"),l("Audience"),l("Source"),l("Actions"))),k(p.map(e=>Q(e))))),s.class`ledger-table-hint`(`showing ${p.length} static alert templates`)),B=h(()=>[T(f,x),b.class`panel ledger-panel alert-templates-panel`(t.class`ledger-header`(t.class`ledger-heading`(y("Alert Templates"),s("Static catalog generated from local notification code. Templates are not editable from admin."))),j(),E())]),H=()=>{if(!a.current||m)return;const e=U(a);e&&(e.replaceChildren(),q(B,e),m=!0,c=a.current)},F=z({rootRef:a,toast:$,setAppMounted:e=>{m=e},setCurrentUser:e=>{x=e},onAfterSsoMount:()=>{c=a.current},onAuthorized:()=>{H()}});f=F.handleSignOut;
