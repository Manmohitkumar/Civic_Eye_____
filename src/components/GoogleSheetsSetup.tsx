
import React from 'react';
import CriticalWarnings from './sheets/CriticalWarnings';
import SetupInstructions from './sheets/SetupInstructions';
import UrlExamples from './sheets/UrlExamples';
import AlternativeMethod from './sheets/AlternativeMethod';

const GoogleSheetsSetup = () => {
  return (
    <div className="space-y-4 text-sm text-gray-600">
      <h3 className="font-semibold text-gray-700">How to set up Google Forms integration:</h3>
      
      <CriticalWarnings />
      <SetupInstructions />
      <UrlExamples />
      <AlternativeMethod />
    </div>
  );
};

export default GoogleSheetsSetup;
