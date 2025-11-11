// Quote Requests → Google Sheets Web App
// 1) Set token + sheet ID below
// 2) Deploy as Web App: Execute as Me, Anyone with link

function doPost(e) {
  try {
    // Parse JSON body safely
    var raw = '';
    if (e && e.postData && typeof e.postData.contents === 'string') {
      raw = e.postData.contents;
    }
    var body = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch (parseErr) {
      return _json({ ok: false, error: 'invalid_json', raw: raw });
    }

    // Token check
    var TOKEN = '123123123'; // must match PHP payload
    if (body.token !== TOKEN) {
      return _json({ ok: false, error: 'unauthorized' });
    }

    // Open target spreadsheet and sheet
    var SPREADSHEET_ID = 'REPLACE_WITH_YOUR_SHEET_ID';
    var SHEET_NAME = 'Leads';
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Ensure header row (append if empty)
    if (sh.getLastRow() === 0) {
      sh.appendRow([
        'Timestamp', 'Product', 'Length', 'Width', 'Thickness', 'Company', 'Name', 'Email', 'Phone',
        'Datasheet', 'Notes', 'Custom Details', 'SKU', 'User Agent', 'IP'
      ]);
    }

    // Prepare values
    var values = [
      new Date(),
      body.product || '',
      body.length || '',
      body.width || '',
      body.thickness || '',
      body.company || '',
      body.name || '',
      body.email || '',
      body.phone || '',
      body.datasheet || '',
      body.notes || '',
      body.customDetails || '',
      body.sku || '',
      body.ua || '',
      body.ip || ''
    ];

    sh.appendRow(values);

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err), stack: err && err.stack ? String(err.stack) : null });
  }
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

