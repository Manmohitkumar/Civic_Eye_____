
import React from 'react';

const SetupInstructions = () => {
  return (
    <ol className="list-decimal list-inside space-y-3">
      <li>
        <p className="font-medium">Create a new Google Form</p>
        <p className="ml-5 text-xs">
          Create a form with these fields:
          <ul className="list-disc list-inside ml-2 mt-1">
            <li>Name (Text type)</li>
            <li>Phone Number (Text or Phone type)</li>
            <li>City (Text type)</li>
          </ul>
        </p>
      </li>
      
      <li>
        <p className="font-medium">Connect to a Google Sheet</p>
        <p className="ml-5 text-xs">
          <ul className="list-disc list-inside ml-2 mt-1">
            <li>In the form editor, click the "Responses" tab</li>
            <li>Click the Google Sheets icon (looks like a green spreadsheet)</li>
            <li>Select "Create a new spreadsheet" or choose an existing one</li>
            <li>This sheet will automatically collect all form submissions</li>
          </ul>
        </p>
      </li>
      
      <li>
        <p className="font-medium">Get the form's submission URL</p>
        <p className="ml-5 text-xs">
          For background form submission to work properly, you need the direct submission URL:
          <ul className="list-disc list-inside ml-2 mt-1">
            <li>In the form editor, click "Send" (paper airplane icon at top right)</li>
            <li>Click the link icon (🔗) to get the form link</li>
            <li>Copy the link, it will look like:<br />
              <code className="bg-gray-100 px-1 text-xs">https://docs.google.com/forms/d/e/[FORM-ID]/viewform</code></li>
            <li><strong className="text-red-600">IMPORTANT:</strong> Replace <code className="bg-gray-100 px-1 text-xs">viewform</code> with <code className="bg-gray-100 px-1 text-xs">formResponse</code> in the URL</li>
            <li>The final URL should look like:<br />
              <code className="bg-gray-100 px-1 text-xs">https://docs.google.com/forms/d/e/[FORM-ID]/formResponse</code></li>
            <li>This is the URL you need to paste in the admin settings</li>
          </ul>
        </p>
      </li>
      
      <li>
        <p className="font-medium">Find your form field IDs (CRITICAL)</p>
        <p className="ml-5 text-xs">
          <strong className="text-red-600">THIS STEP IS ABSOLUTELY REQUIRED!</strong> Without correct field IDs, your form will submit blank data:
          <ol className="list-decimal list-inside ml-2 mt-1 space-y-2">
            <li>
              <strong className="text-red-600">Method 1 (Recommended):</strong> Open the Live Form to Find Field IDs
              <ul className="list-disc list-inside ml-3 mt-1">
                <li>Go to your form's public URL (the /viewform link)</li>
                <li>Right-click and select "View Page Source" or press Ctrl+U</li>
                <li>Press Ctrl+F and search for: <code className="bg-gray-100 px-1">name="entry.</code></li>
                <li>You'll see entries like <code className="bg-gray-100 px-1">name="entry.123456789"</code></li>
                <li>The numbers after "entry." are your field IDs</li>
                <li>Note down the ID for each field: name, phone, and city</li>
              </ul>
            </li>
            <li>
              <strong className="text-red-600">Method 2:</strong> Fill out the form and get a prefilled link
              <ul className="list-disc list-inside ml-3 mt-1">
                <li>Go to your form in view mode</li>
                <li>Fill out all form fields with sample values (like "John Doe")</li>
                <li>Click the three dots menu (⋮) in the top right</li>
                <li>Select "Get pre-filled link"</li>
                <li>Click "Get link"</li>
                <li>In the URL that opens, you'll see parameters like <code className="bg-gray-100 px-1">entry.123456789=John%20Doe</code></li>
                <li>The numbers after "entry." are your field IDs (e.g., <code className="bg-gray-100 px-1">entry.123456789</code> for name)</li>
                <li>Note down each field ID for name, phone, and city</li>
              </ul>
            </li>
          </ol>
        </p>
      </li>
      
      <li>
        <p className="font-medium">Add field IDs to this application</p>
        <p className="ml-5 text-xs">
          <ul className="list-disc list-inside ml-2 mt-1">
            <li><strong className="text-red-600">DO NOT PASTE THE IDs INTO THE FORM FIELDS THEMSELVES</strong></li>
            <li>In admin settings, enable DEBUG_MODE by setting it to true</li>
            <li>In the form URL input, add a question mark (?) at the end, followed by your field IDs in this exact format:<br />
              <code className="bg-gray-100 px-1 text-xs break-all font-bold">https://docs.google.com/forms/d/e/[FORM-ID]/formResponse?nameField=entry.123456789&phoneField=entry.987654321&cityField=entry.456789123</code></li>
            <li>Replace the entry numbers with the ones you found for your form</li>
            <li>Click "Save" to store the URL with field IDs</li>
          </ul>
        </p>
      </li>
    </ol>
  );
};

export default SetupInstructions;
