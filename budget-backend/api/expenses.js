
// This is a Vercel Serverless Function which acts as our backend.

// The main function that runs when a request comes in.
module.exports = async (req, res) => {
  // Set headers to allow our frontend to call this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle pre-flight requests for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // --- Step 1: Get the Lark Access Token ---
    const tokenResponse = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        app_id: process.env.LARK_APP_ID,
        app_secret: process.env.LARK_APP_SECRET,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.code !== 0) {
      throw new Error(`Lark Auth Error: ${tokenData.msg}`);
    }
    const accessToken = tokenData.tenant_access_token;

    // --- Step 2: Fetch Records from the Bitable ---
    const appToken = process.env.LARK_APP_TOKEN;
    const tableId = process.env.LARK_TABLE_ID;
    
    const recordsResponse = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const recordsData = await recordsResponse.json();
    if (recordsData.code !== 0) {
      throw new Error(`Lark Bitable Error: ${recordsData.msg}`);
    }

    // --- Step 3: Transform the Data ---
    // Lark returns a complex object; we simplify it for our frontend.
    // IMPORTANT: This assumes your columns are named 'Name', 'BU', 'PIC', 'Budget', 'Actual'.
    const transformedExpenses = recordsData.data.items.map(item => ({
      id: item.record_id,
      name: item.fields.Name,
      bu: item.fields.BU,
      pic: item.fields.PIC,
      budget: item.fields.Budget || 0,
      actual: item.fields.Actual || 0,
    }));

    // --- Step 4: Send the data back to the frontend ---
    res.status(200).json(transformedExpenses);

  } catch (error) {
    // If anything goes wrong, send an error message.
    res.status(500).json({ error: error.message });
  }
};
