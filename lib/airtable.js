/**
 * Airtable REST helper for form submissions.
 * Skips silently when credentials are not configured.
 */

function getConfig() {
  const token = process.env.AIRTABLE_API_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  return { token, baseId, configured: Boolean(token && baseId) };
}

function tableName(kind) {
  if (kind === 'contact') {
    return process.env.AIRTABLE_CONTACT_TABLE || 'Contact';
  }
  return process.env.AIRTABLE_GET_INVOLVED_TABLE || 'Get Involved';
}

/**
 * @param {'contact' | 'get-involved'} kind
 * @param {Record<string, string | boolean | number | null | undefined>} fields
 */
export async function createAirtableRecord(kind, fields) {
  const { token, baseId, configured } = getConfig();
  if (!configured) {
    console.warn('[airtable] Skipped — AIRTABLE_API_TOKEN / AIRTABLE_BASE_ID not set');
    return { skipped: true };
  }

  const table = encodeURIComponent(tableName(kind));
  const url = `https://api.airtable.com/v0/${baseId}/${table}`;

  const cleaned = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value === '') continue;
    cleaned[key] = value;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: cleaned, typecast: true }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Airtable ${res.status}: ${body.slice(0, 400)}`);
  }

  return res.json();
}

export function contactToAirtableFields(data) {
  return {
    Name: data.name,
    Email: data.email,
    Phone: data.phone || '',
    Suburb: data.suburb || '',
    Type: data.type,
    Message: data.message,
    Updates: Boolean(data.updates),
    Source: 'Website — Contact',
    'Submitted At': new Date().toISOString(),
  };
}

export function getInvolvedToAirtableFields(data) {
  return {
    'First Name': data.firstName,
    'Last Name': data.lastName,
    Email: data.email,
    Mobile: data.mobile || '',
    Postcode: data.postcode,
    Help: data.help,
    Languages: data.languages || '',
    Updates: Boolean(data.updates),
    Source: 'Website — Get Involved',
    'Submitted At': new Date().toISOString(),
  };
}
