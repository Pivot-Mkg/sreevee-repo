// Quote Requests Router → Writes to separate sheets by family (aluminum vs compostable)
// How to use:
// 1) Set TOKEN and SPREADSHEET_ID below.
// 2) Deploy as Web App: Execute as Me, Anyone with the link.
// 3) In PHP, send JSON with fields including: token,family,code,product,length,width,thickness,material,shape,caseQuantity,company,name,email,phone,datasheet,notes,customDetails,sku,ua,ip

const TOKEN = "123123123";
const SPREADSHEET_ID = "162049AIn5-KokaahdNytqpq5Ir4_CXSWRR5wXOSFsis";
const SHEET_AL = "Leads - Aluminum";
const SHEET_CP = "Leads - Compostable";

function doPost(e) {
  try {
    var raw =
      e && e.postData && typeof e.postData.contents === "string"
        ? e.postData.contents
        : "";
    var body = raw ? JSON.parse(raw) : {};
    if (body.token !== TOKEN)
      return _json({ ok: false, error: "unauthorized" });

    var family = (body.family || "").toString().toLowerCase();
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var name = family === "compostable" ? SHEET_CP : SHEET_AL;
    var sh = ss.getSheetByName(name) || ss.insertSheet(name);

    // Family-specific headers and rows to avoid field overlap
    if (family === "compostable") {
      var headerCP = [
        "Timestamp","Family","Code","Product",
        "Material","Shape","Case Quantity",
        "Company","Name","Email","Phone",
        "Datasheet","Notes","Custom Details","SKU","User Agent","IP",
      ];
      if (sh.getLastRow() === 0) sh.appendRow(headerCP);

      var rowCP = [
        new Date(),
        body.family || "",
        body.code || "",
        body.product || "",
        body.material || "",
        body.shape || "",
        body.caseQuantity || "",
        body.company || "",
        body.name || "",
        body.email || "",
        body.phone || "",
        body.datasheet || "",
        body.notes || "",
        body.customDetails || "",
        body.sku || "",
        body.ua || "",
        body.ip || "",
      ];
      sh.appendRow(rowCP);
    } else {
      var headerAL = [
        "Timestamp","Family","Code","Product",
        "Length","Width","Thickness (µm)",
        "Company","Name","Email","Phone",
        "Datasheet","Notes","Custom Details","SKU","User Agent","IP",
      ];
      if (sh.getLastRow() === 0) sh.appendRow(headerAL);

      var rowAL = [
        new Date(),
        body.family || "",
        body.code || "",
        body.product || "",
        body.length || "",
        body.width || "",
        body.thickness || "",
        body.company || "",
        body.name || "",
        body.email || "",
        body.phone || "",
        body.datasheet || "",
        body.notes || "",
        body.customDetails || "",
        body.sku || "",
        body.ua || "",
        body.ip || "",
      ];
      sh.appendRow(rowAL);
    }

    return _json({ ok: true });
  } catch (err) {
    return _json({
      ok: false,
      error: String(err),
      stack: err && err.stack ? String(err.stack) : null,
    });
  }
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
