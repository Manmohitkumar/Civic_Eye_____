
import React from 'react';

const CriticalWarnings = () => {
  return (
    <div className="space-y-4">
      <div className="bg-red-50 p-3 rounded border border-red-200 mb-4">
        <p className="font-medium text-red-800">⚠️ CRITICAL URL FORMAT:</p>
        <p className="text-red-700 text-xs mt-1">
          You <strong>MUST</strong> use a URL that ends with <code className="bg-white px-1">/formResponse</code>, NOT <code className="bg-white px-1">/previewResponse</code> or <code className="bg-white px-1">/viewform</code>. 
          The form will not receive submissions with the wrong URL type.
        </p>
      </div>
      
      <div className="bg-red-50 p-3 rounded border border-red-200 mb-4">
        <p className="font-medium text-red-800">⚠️ FIELD IDs ARE REQUIRED:</p>
        <p className="text-red-700 text-xs mt-1">
          You <strong>MUST</strong> identify and include the correct form field IDs for name, phone number, and city in your form URL or your submissions will appear blank in Google Sheets.
        </p>
      </div>
      
      <div className="bg-blue-50 p-3 rounded border border-blue-200 mb-4">
        <p className="font-medium text-blue-800">✅ SEAMLESS SUBMISSION:</p>
        <p className="text-blue-700 text-xs mt-1">
          The submission process happens entirely in the background. Your users won't see any Google Forms interfaces or redirects.
        </p>
      </div>
    </div>
  );
};

export default CriticalWarnings;
