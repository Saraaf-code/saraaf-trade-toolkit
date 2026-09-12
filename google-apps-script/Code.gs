/* Saraaf Trade Toolkit data backend.
   Deploy as an Apps Script Web App. It creates one Google Sheet and one
   Drive folder automatically when data first arrives. */
const SHEET_NAME = 'Toolkit Usage';
const PDF_FOLDER_NAME = 'Saraaf Trade Toolkit PDFs';
const HEADERS = ['Timestamp','Suite','Event','Tool ID','Tool','Fields','Results','Rating','Comment','PDF File ID'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const sheet = getUsageSheet_();
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    let pdfId = '';
    if (data.pdfBase64) pdfId = savePdf_(data.pdfBase64, data.suite || 'global', data.toolId || 'tool', data.at);
    sheet.appendRow([
      new Date(data.at || Date.now()), data.suite || 'global', data.eventType || '', data.toolId || '',
      data.toolTitle || '', data.fields || '', data.results || '', data.rating || '', data.comment || '', pdfId
    ]);
    return json_({ok:true,pdfFileId:pdfId});
  } catch (err) {
    return json_({ok:false,error:String(err)});
  }
}

function doGet() { return json_({ok:true,message:'Saraaf Trade Toolkit data endpoint is running.'}); }

function getUsageSheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id).getSheetByName(SHEET_NAME);
  const ss = SpreadsheetApp.create('Saraaf Trade Toolkit Usage');
  const sheet = ss.getSheets()[0]; sheet.setName(SHEET_NAME); sheet.appendRow(HEADERS);
  props.setProperty('SHEET_ID',ss.getId());
  return sheet;
}

function savePdf_(base64, suite, toolId, stamp) {
  const clean = String(base64).replace(/^data:application\/pdf;base64,/,'');
  const bytes = Utilities.base64Decode(clean);
  const blob = Utilities.newBlob(bytes,'application/pdf',`${suite}-${toolId}-${stamp || Date.now()}.pdf`);
  return getPdfFolder_().createFile(blob).getId();
}

function getPdfFolder_() {
  const props=PropertiesService.getScriptProperties();
  const id=props.getProperty('PDF_FOLDER_ID');
  if (id) return DriveApp.getFolderById(id);
  const folder=DriveApp.createFolder(PDF_FOLDER_NAME); props.setProperty('PDF_FOLDER_ID',folder.getId()); return folder;
}

function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
