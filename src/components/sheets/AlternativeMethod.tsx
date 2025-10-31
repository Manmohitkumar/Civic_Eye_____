
import React from 'react';

const AlternativeMethod = () => {
  return (
    <div className="mt-6 pt-4 border-t border-dashed">
      <details>
        <summary className="font-medium text-gray-700 cursor-pointer">Alternative: Original Apps Script Method (Not Recommended)</summary>
        <div className="mt-2 text-xs text-gray-500">
          <p className="mb-2 italic">This method requires broad permissions to all your Google Sheets as shown in your screenshot.</p>
          
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <p className="font-medium">Create a Google Apps Script</p>
              <p className="ml-5">From your sheet, go to Extensions → Apps Script</p>
            </li>
            
            <li>
              <p className="font-medium">Replace code with the following:</p>
              <div className="ml-5 p-2 bg-gray-100 rounded font-mono overflow-auto">
                <pre>{`function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp,
    data.email,
    data.address,
    data.additionalDetails
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}`}</pre>
              </div>
            </li>
            
            <li>
              <p className="font-medium">Deploy as web app</p>
              <p className="ml-5">
                Deploy → New deployment → Select type: Web app → 
                Execute as: Me → Who has access: Anyone →
                Deploy
              </p>
            </li>
            
            <li>
              <p className="font-medium">Authorize access</p>
              <div className="ml-5">
                <p>After clicking Deploy, you'll need to authorize access with broad Google Sheets permissions:</p>
                <img 
                  src="/lovable-uploads/e75f1edd-af3a-412c-8818-382345a12e51.png" 
                  alt="Google broad permissions request" 
                  className="my-2 border rounded max-w-xs"
                />
                <p className="mt-1 text-red-600">Warning: This grants access to all your Google Sheets</p>
              </div>
            </li>
          </ol>
        </div>
      </details>
    </div>
  );
};

export default AlternativeMethod;
