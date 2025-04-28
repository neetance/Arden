import React, { useState } from 'react';
import './Claim.css';
const ClaimPage = () => {
  const [claimId, setClaimId] = useState('');
  const [textInput, setTextInput] = useState('');
  const [fileInputs, setFileInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Enter Claim ID, 2: Evidence, 3: Review

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFileInputs([...fileInputs, ...newFiles]);
  };

  const removeFile = (index) => {
    const updatedFiles = [...fileInputs];
    updatedFiles.splice(index, 1);
    setFileInputs(updatedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Handle submission logic here
    console.log({
      claimId,
      textInput,
      fileInputs
    });
    
    setLoading(false);
    alert('Claim submitted successfully');
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Sentinel Insurance Claim</h1>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className={`font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Identify Claim</span>
            <span className={`font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Submit Evidence</span>
            <span className={`font-medium ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>Review & Submit</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 1: Identify Your Claim</h2>
              <div className="mb-4">
                <label htmlFor="claimId" className="block text-gray-700 font-medium mb-2">
                  Claim ID
                </label>
                <input
                  type="text"
                  id="claimId"
                  value={claimId}
                  onChange={(e) => setClaimId(e.target.value)}
                  placeholder="Enter your claim ID (e.g., SEN-2025-042801)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your unique claim identifier from the Sentinel protocol
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!claimId}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 2: Provide Evidence</h2>
              
              <div className="mb-4">
                <label htmlFor="textInput" className="block text-gray-700 font-medium mb-2">
                  Claim Description
                </label>
                <textarea
                  id="textInput"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Describe what happened and how it relates to your insurance policy..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Evidence
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                    multiple
                  />
                  <label
                    htmlFor="fileInput"
                    className="block cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <span className="text-lg">Click to upload files</span>
                      <span className="text-sm text-gray-500 mt-1">
                        Upload transaction hashes, screenshots, or any relevant evidence
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {fileInputs.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-medium mb-2">Uploaded Files:</h3>
                  <ul className="space-y-2">
                    {fileInputs.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="truncate max-w-xs">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!textInput}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 3: Review and Submit</h2>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="text-lg font-medium mb-2">Claim Summary</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Claim ID:</span> {claimId}
                  </div>
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="mt-1 text-gray-600">{textInput}</p>
                  </div>
                  <div>
                    <span className="font-medium">Evidence Files:</span>
                    {fileInputs.length > 0 ? (
                      <ul className="list-disc list-inside mt-1 text-gray-600">
                        {fileInputs.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-gray-600">No files uploaded</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Your claim will be reviewed by EigenLayer restakers acting as validators in the Sentinel DAO. Processing times may vary based on claim complexity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Claim'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ClaimPage;