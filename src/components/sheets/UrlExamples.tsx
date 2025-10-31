
import React from 'react';

const UrlExamples = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="font-bold text-red-800 mb-2">Example of CORRECT field IDs in URL:</p>
        <code className="block text-xs bg-white p-2 rounded overflow-x-auto">
          https://docs.google.com/forms/d/e/1AbC...XyZ/formResponse?<span className="text-green-600 font-bold">nameField=entry.123456789&phoneField=entry.987654321&cityField=entry.456789123</span>
        </code>
        <p className="mt-2 text-xs text-red-800 font-semibold">If your entries show blank in Google Sheets but you see a timestamp, this means you have incorrect field IDs.</p>
      </div>
      
      <div className="bg-yellow-50 p-3 rounded border border-yellow-200 mb-4">
        <p className="font-medium text-yellow-800">🔑 Common Mistakes:</p>
        <ul className="list-disc list-inside ml-2 mt-1 text-yellow-700 text-xs">
          <li>Forgetting to change "/viewform" to "/formResponse"</li>
          <li>Not adding the field IDs as URL parameters (after the ? symbol)</li>
          <li>Using wrong field IDs (needs to match EXACTLY the form field IDs)</li>
          <li>Copying IDs with extra characters or spaces</li>
          <li>Forgetting to include all three required field IDs</li>
          <li>Using an incomplete URL (missing the e/ part)</li>
        </ul>
      </div>
      
      <div className="bg-blue-50 p-3 rounded border border-blue-200">
        <p className="font-medium text-blue-800">Test Submission Tips:</p>
        <ul className="list-disc list-inside ml-2 mt-1 text-blue-700 text-xs">
          <li>Enable Debug Mode and submit a test form</li>
          <li>Watch the browser console for submission details</li>
          <li>Check your Google Sheet immediately after submitting</li>
          <li>If only timestamp appears but no data, your field IDs are incorrect</li>
          <li>Submissions now happen silently in the background</li>
          <li>Google Forms submissions may take a minute to appear in your Google Sheet</li>
        </ul>
      </div>
    </div>
  );
};

export default UrlExamples;
