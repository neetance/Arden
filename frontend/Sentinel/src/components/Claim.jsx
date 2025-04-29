import React, { useState } from 'react';
import './Claim.css';

const InsuranceClaimForm = () => {
  const [insuranceClaimNumber, setInsuranceClaimNumber] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentFormStep, setCurrentFormStep] = useState(1); // 1: Enter Claim ID, 2: Evidence, 3: Review

  const handleEvidenceFileSelection = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setEvidenceFiles([...evidenceFiles, ...selectedFiles]);
  };

  const deleteEvidenceFile = (index) => {
    const updatedEvidenceFiles = [...evidenceFiles];
    updatedEvidenceFiles.splice(index, 1);
    setEvidenceFiles(updatedEvidenceFiles);
  };

  const submitInsuranceClaim = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Handle submission logic here
    console.log({
      insuranceClaimNumber,
      claimDescription,
      evidenceFiles
    });
    
    setIsSubmitting(false);
    alert('Claim submitted successfully');
  };

  const proceedToNextStep = () => {
    setCurrentFormStep(currentFormStep + 1);
  };

  const returnToPreviousStep = () => {
    setCurrentFormStep(currentFormStep - 1);
  };

  return (
    <div className="insurance-claim-container">
      <div className="insurance-claim-card">
        <h1 className="insurance-claim-title">Sentinel Insurance Claim</h1>
        
        {/* Progress bar */}
        <div className="progress-bar-container">
          <div className="progress-step-labels">
            <span className={`progress-step-label ${currentFormStep >= 1 ? 'progress-step-active' : 'progress-step-inactive'}`}>Identify Claim</span>
            <span className={`progress-step-label ${currentFormStep >= 2 ? 'progress-step-active' : 'progress-step-inactive'}`}>Submit Evidence</span>
            <span className={`progress-step-label ${currentFormStep >= 3 ? 'progress-step-active' : 'progress-step-inactive'}`}>Review & Submit</span>
          </div>
          <div className="progress-bar-background">
            <div 
              className="progress-bar-indicator" 
              style={{ width: `${(currentFormStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={submitInsuranceClaim}>
          {currentFormStep === 1 && (
            <div className="form-step-container">
              <h2 className="form-step-title">Step 1: Identify Your Claim</h2>
              <div className="form-field-container">
                <label htmlFor="insurance-claim-number" className="form-field-label">
                  Claim ID
                </label>
                <input
                  type="text"
                  id="insurance-claim-number"
                  value={insuranceClaimNumber}
                  onChange={(e) => setInsuranceClaimNumber(e.target.value)}
                  placeholder="Enter your claim ID (e.g., SEN-2025-042801)"
                  className="form-text-input"
                  required
                />
                <p className="form-field-helper-text">
                  Your unique claim identifier from the Sentinel protocol
                </p>
              </div>
              <div className="form-button-container">
                <button
                  type="button"
                  onClick={proceedToNextStep}
                  disabled={!insuranceClaimNumber}
                  className="primary-button"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentFormStep === 2 && (
            <div className="form-step-container">
              <h2 className="form-step-title">Step 2: Provide Evidence</h2>
              
              <div className="form-field-container">
                <label htmlFor="claim-description" className="form-field-label">
                  Claim Description
                </label>
                <textarea
                  id="claim-description"
                  value={claimDescription}
                  onChange={(e) => setClaimDescription(e.target.value)}
                  placeholder="Describe what happened and how it relates to your insurance policy..."
                  className="form-textarea-input"
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="form-field-container">
                <label className="form-field-label">
                  Upload Evidence
                </label>
                <div className="file-upload-dropzone">
                  <input
                    type="file"
                    onChange={handleEvidenceFileSelection}
                    className="hidden-file-input"
                    id="evidence-file-input"
                    multiple
                  />
                  <label
                    htmlFor="evidence-file-input"
                    className="file-upload-label"
                  >
                    <div className="file-upload-content">
                      <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <span className="upload-primary-text">Click to upload files</span>
                      <span className="upload-secondary-text">
                        Upload transaction hashes, screenshots, or any relevant evidence
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {evidenceFiles.length > 0 && (
                <div className="uploaded-files-container">
                  <h3 className="uploaded-files-title">Uploaded Files:</h3>
                  <ul className="uploaded-files-list">
                    {evidenceFiles.map((file, index) => (
                      <li key={index} className="uploaded-file-item">
                        <span className="uploaded-file-name">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => deleteEvidenceFile(index)}
                          className="delete-file-button"
                        >
                          <svg className="delete-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="form-navigation-buttons">
                <button
                  type="button"
                  onClick={returnToPreviousStep}
                  className="secondary-button"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={proceedToNextStep}
                  disabled={!claimDescription}
                  className="primary-button"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentFormStep === 3 && (
            <div className="form-step-container">
              <h2 className="form-step-title">Step 3: Review and Submit</h2>
              
              <div className="claim-summary-container">
                <h3 className="claim-summary-title">Claim Summary</h3>
                <div className="claim-summary-details">
                  <div className="claim-summary-item">
                    <span className="claim-summary-label">Claim ID:</span> {insuranceClaimNumber}
                  </div>
                  <div className="claim-summary-item">
                    <span className="claim-summary-label">Description:</span>
                    <p className="claim-description-text">{claimDescription}</p>
                  </div>
                  <div className="claim-summary-item">
                    <span className="claim-summary-label">Evidence Files:</span>
                    {evidenceFiles.length > 0 ? (
                      <ul className="evidence-files-list">
                        {evidenceFiles.map((file, index) => (
                          <li key={index} className="evidence-file-item">{file.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-files-message">No files uploaded</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="info-notification">
                <div className="info-notification-content">
                  <div className="info-icon-container">
                    <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="info-message-container">
                    <p className="info-message-text">
                      Your claim will be reviewed by EigenLayer restakers acting as validators in the Sentinel DAO. Processing times may vary based on claim complexity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-navigation-buttons">
                <button
                  type="button"
                  onClick={returnToPreviousStep}
                  className="secondary-button"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

export default InsuranceClaimForm;