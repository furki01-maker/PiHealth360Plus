// PiHealth360/DemoMain/backend/approvePayment.js
export async function handler(event, context) {
  const body = JSON.parse(event.body);

  console.log("Sandbox Payment Received:", body);

  // Ödemeyi approve et
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "approved" }),
  };
}