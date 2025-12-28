'use client';

import { useState, useEffect } from 'react';
import { vehicleData } from '@/config/vehicleData';
import { calculateQuotation, QuotationInput } from '@/lib/quotation';
import { generateReferenceNumber } from '@/lib/referenceGenerator';
import { createLead, sendEmailNotification, sendEmailToCustomer, sendWhatsAppNotification, LeadData } from '@/lib/notifications';
import { coverageInfo, addOnInfo } from '@/lib/coverageInfo';
import styles from '@/styles/QuotationForm.module.css';

interface FormData {
  // Step 1: Vehicle Details
  vehicleType: string;
  make: string;
  model: string;
  modelYear: number;
  city: string;
  sumInsured: number;
  
  // Step 2: Customer Information
  fullName: string;
  mobile: string;
  email: string;
  
  // Step 3: Coverage Selection
  coverageType: 'Comprehensive' | '3T' | '2T' | '';
  
  // Step 4: Add-Ons
  personalAccident: {
    selected: boolean;
    sumInsured: string;
    age: number;
    gender: string;
  };
  tracker: {
    selected: boolean;
  };
}

export default function QuotationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    vehicleType: 'Car',
    make: '',
    model: '',
    modelYear: new Date().getFullYear(),
    city: '',
    sumInsured: 0,
    fullName: '',
    mobile: '',
    email: '',
    coverageType: '',
    personalAccident: {
      selected: false,
      sumInsured: '',
      age: 0,
      gender: '',
    },
    tracker: {
      selected: false,
    },
  });
  
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [quotation, setQuotation] = useState<any>(null);
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCoverage, setHoveredCoverage] = useState<string | null>(null);
  const [hoveredAddOn, setHoveredAddOn] = useState<string | null>(null);

  // Update available models when make changes
  useEffect(() => {
    if (formData.make && vehicleData.models[formData.make]) {
      setAvailableModels(vehicleData.models[formData.make]);
      setFormData(prev => ({ ...prev, model: '' })); // Reset model when make changes
    } else {
      setAvailableModels([]);
    }
  }, [formData.make]);

  // Calculate quotation when reaching step 5
  useEffect(() => {
    if (currentStep === 5 && formData.coverageType) {
      const input: QuotationInput = {
        sumInsured: formData.sumInsured,
        coverageType: formData.coverageType as 'Comprehensive' | '3T' | '2T',
        modelYear: formData.modelYear,
        personalAccident: formData.personalAccident.selected ? {
          selected: true,
          sumInsured: parseInt(formData.personalAccident.sumInsured.replace(/,/g, '')),
          age: formData.personalAccident.age,
          gender: formData.personalAccident.gender,
        } : undefined,
        tracker: formData.tracker.selected ? { selected: true } : undefined,
      };
      
      const result = calculateQuotation(input);
      setQuotation(result);
    }
  }, [currentStep, formData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (parent: 'personalAccident' | 'tracker', field: string, value: any) => {
    setFormData(prev => {
      if (parent === 'personalAccident') {
        return {
          ...prev,
          personalAccident: {
            ...prev.personalAccident,
            [field]: value,
          },
        };
      } else if (parent === 'tracker') {
        return {
          ...prev,
          tracker: {
            ...prev.tracker,
            [field]: value,
          },
        };
      }
      return prev;
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.make && formData.model && formData.modelYear && formData.city && formData.sumInsured > 0);
      case 2:
        return !!(formData.fullName && formData.mobile);
      case 3:
        return !!formData.coverageType;
      case 4:
        // Add-ons are optional, but if Personal Accident is selected, validate its fields
        if (formData.personalAccident.selected) {
          return !!(formData.personalAccident.sumInsured && formData.personalAccident.age && formData.personalAccident.gender);
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Generate reference number
    const refNumber = generateReferenceNumber();
    setReferenceNumber(refNumber);
    
    // Create lead object
    const leadData: Omit<LeadData, 'status' | 'assignedTo' | 'timestamp'> = {
      referenceNumber: refNumber,
      vehicleDetails: {
        make: formData.make,
        model: formData.model,
        modelYear: formData.modelYear,
        city: formData.city,
        sumInsured: formData.sumInsured,
      },
      customerDetails: {
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email || undefined,
      },
      coverageType: formData.coverageType,
      addOns: {
        ...(formData.personalAccident.selected && {
          personalAccident: {
            sumInsured: parseInt(formData.personalAccident.sumInsured.replace(/,/g, '')),
            age: formData.personalAccident.age,
            gender: formData.personalAccident.gender,
          },
        }),
        ...(formData.tracker.selected && { tracker: true }),
      },
      quotation: {
        totalPremium: quotation.totalPremium,
        deductible: quotation.deductible,
      },
    };
    
    const lead = createLead(leadData);
    
    // Send notifications
    // Send to internal team
    await sendEmailNotification(lead);
    // Send to customer (if email provided)
    await sendEmailToCustomer(lead);
    // Send WhatsApp notification (optional)
    await sendWhatsAppNotification(lead);
    
    setIsSubmitting(false);
    setCurrentStep(6); // Move to confirmation screen
  };

  const renderStep1 = () => (
    <div className={styles.stepContent}>
      <h2>Vehicle Details</h2>
      
      <div className={styles.formGroup}>
        <label>Vehicle Type *</label>
        <select value={formData.vehicleType} disabled>
          <option>Car</option>
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label>Make *</label>
        <select
          value={formData.make}
          onChange={(e) => handleInputChange('make', e.target.value)}
          required
        >
          <option value="">Select Make</option>
          {vehicleData.makes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label>Model *</label>
        <select
          value={formData.model}
          onChange={(e) => handleInputChange('model', e.target.value)}
          disabled={!formData.make}
          required
        >
          <option value="">Select Model</option>
          {availableModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label>Model Year *</label>
        <select
          value={formData.modelYear}
          onChange={(e) => handleInputChange('modelYear', parseInt(e.target.value))}
          required
        >
          {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label>City *</label>
        <select
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          required
        >
          <option value="">Select City</option>
          {vehicleData.cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label>Sum Insured (PKR) *</label>
        <input
          type="number"
          value={formData.sumInsured || ''}
          onChange={(e) => handleInputChange('sumInsured', parseInt(e.target.value) || 0)}
          placeholder="Enter amount"
          min="0"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.stepContent}>
      <h2>Customer Information</h2>
      
      <div className={styles.formGroup}>
        <label>Full Name *</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Mobile Number *</label>
        <input
          type="tel"
          value={formData.mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          placeholder="03XX-XXXXXXX"
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Email (Optional)</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="your.email@example.com"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className={styles.stepContent}>
      <h2>Coverage Selection</h2>
      <p className={styles.stepDescription}>Select one coverage option for your vehicle</p>
      
      <div className={styles.coverageOptions}>
        {(['Comprehensive', '3T', '2T'] as const).map(coverage => {
          const info = coverageInfo[coverage];
          const isSelected = formData.coverageType === coverage;
          
          return (
            <div
              key={coverage}
              className={`${styles.coverageCard} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleInputChange('coverageType', coverage)}
              onMouseEnter={() => setHoveredCoverage(coverage)}
              onMouseLeave={() => setHoveredCoverage(null)}
            >
              <div className={styles.coverageHeader}>
                <input
                  type="radio"
                  name="coverageType"
                  value={coverage}
                  checked={isSelected}
                  onChange={() => handleInputChange('coverageType', coverage)}
                />
                <h3>{info.name}</h3>
              </div>
              <p className={styles.coverageDescription}>{info.description}</p>
              
              {hoveredCoverage === coverage && (
                <div className={styles.tooltip}>
                  <div className={styles.tooltipContent}>
                    <h4>What's Covered:</h4>
                    <ul>
                      {info.covered.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <h4>Exclusions:</h4>
                    <ul>
                      {info.excluded.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className={styles.stepContent}>
      <h2>Optional Add-Ons</h2>
      <p className={styles.stepDescription}>Enhance your coverage with optional add-ons</p>
      
      <div className={styles.addOnsContainer}>
        {/* Personal Accident */}
        <div
          className={`${styles.addOnCard} ${formData.personalAccident.selected ? styles.selected : ''}`}
          onMouseEnter={() => setHoveredAddOn('Personal Accident')}
          onMouseLeave={() => setHoveredAddOn(null)}
        >
          <div className={styles.addOnHeader}>
            <input
              type="checkbox"
              checked={formData.personalAccident.selected}
              onChange={(e) => handleNestedInputChange('personalAccident', 'selected', e.target.checked)}
            />
            <h3>Personal Accident</h3>
          </div>
          
          {hoveredAddOn === 'Personal Accident' && (
            <div className={styles.tooltip}>
              <div className={styles.tooltipContent}>
                <h4>Benefits:</h4>
                <ul>
                  {addOnInfo['Personal Accident'].benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {formData.personalAccident.selected && (
            <div className={styles.conditionalFields}>
              <div className={styles.formGroup}>
                <label>Sum Insured *</label>
                <select
                  value={formData.personalAccident.sumInsured}
                  onChange={(e) => handleNestedInputChange('personalAccident', 'sumInsured', e.target.value)}
                  required
                >
                  <option value="">Select Sum Insured</option>
                  {vehicleData.personalAccidentSlabs.map(slab => (
                    <option key={slab} value={slab}>{slab}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Age *</label>
                <input
                  type="number"
                  value={formData.personalAccident.age || ''}
                  onChange={(e) => handleNestedInputChange('personalAccident', 'age', parseInt(e.target.value) || 0)}
                  placeholder="Enter age"
                  min="18"
                  max="70"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Gender *</label>
                <select
                  value={formData.personalAccident.gender}
                  onChange={(e) => handleNestedInputChange('personalAccident', 'gender', e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Tracker */}
        <div
          className={`${styles.addOnCard} ${formData.tracker.selected ? styles.selected : ''}`}
          onMouseEnter={() => setHoveredAddOn('Tracker')}
          onMouseLeave={() => setHoveredAddOn(null)}
        >
          <div className={styles.addOnHeader}>
            <input
              type="checkbox"
              checked={formData.tracker.selected}
              onChange={(e) => handleNestedInputChange('tracker', 'selected', e.target.checked)}
            />
            <h3>Tracker</h3>
          </div>
          
          {hoveredAddOn === 'Tracker' && (
            <div className={styles.tooltip}>
              <div className={styles.tooltipContent}>
                <h4>Benefits:</h4>
                <ul>
                  {addOnInfo['Tracker'].benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className={styles.stepContent}>
      <h2>Quotation Summary</h2>
      
      {quotation && (
        <div className={styles.quotationSummary}>
          <div className={styles.quotationCard}>
            <h3>Estimated Annual Premium</h3>
            <div className={styles.premiumAmount}>
              PKR {quotation.totalPremium.toLocaleString()}
            </div>
            
            <div className={styles.quotationDetails}>
              <div className={styles.detailRow}>
                <span>Base Premium:</span>
                <span>PKR {quotation.basePremium.toLocaleString()}</span>
              </div>
              
              {quotation.personalAccidentPremium > 0 && (
                <div className={styles.detailRow}>
                  <span>Personal Accident:</span>
                  <span>PKR {quotation.personalAccidentPremium.toLocaleString()}</span>
                </div>
              )}
              
              {quotation.trackerPremium > 0 && (
                <div className={styles.detailRow}>
                  <span>Tracker:</span>
                  <span>PKR {quotation.trackerPremium.toLocaleString()}</span>
                </div>
              )}
              
              <div className={styles.detailRow}>
                <span>Deductible:</span>
                <span>PKR {quotation.deductible.toLocaleString()}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span>Coverage Type:</span>
                <span>{quotation.coverageType}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.disclaimer}>
            <strong>⚠️ Important Disclaimer:</strong>
            <p>
              Final premium, terms, and policy issuance are subject to vehicle inspection 
              and underwriting approval. This is an estimated quotation only.
            </p>
          </div>
          
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : '👉 Request Call / Arrange Inspection'}
          </button>
        </div>
      )}
    </div>
  );

  const renderStep6 = () => (
    <div className={styles.stepContent}>
      <div className={styles.confirmationScreen}>
        <div className={styles.successIcon}>✓</div>
        <h2>Quotation Request Submitted Successfully!</h2>
        
        <div className={styles.referenceNumberBox}>
          <p className={styles.referenceLabel}>Your Reference Number:</p>
          <p className={styles.referenceNumber}>{referenceNumber}</p>
          <p className={styles.referenceNote}>
            Please save this reference number for future correspondence.
          </p>
        </div>
        
        <div className={styles.nextSteps}>
          <h3>What Happens Next?</h3>
          <ul>
            <li>Our Motor Team will contact you within 24 hours</li>
            <li>We'll arrange a convenient time for vehicle inspection</li>
            <li>After inspection, final premium and terms will be confirmed</li>
            <li>You'll receive updates via SMS and email</li>
          </ul>
        </div>
        
        <div className={styles.contactInfo}>
          <p>For any queries, please contact us:</p>
          <p>📞 Phone: 0800-12345</p>
          <p>📧 Email: support@insurancecompany.com</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.progressBar}>
          {[1, 2, 3, 4, 5].map(step => (
            <div
              key={step}
              className={`${styles.progressStep} ${currentStep >= step ? styles.active : ''} ${currentStep > step ? styles.completed : ''}`}
            >
              <div className={styles.stepNumber}>{step}</div>
              <div className={styles.stepLabel}>
                {step === 1 && 'Vehicle'}
                {step === 2 && 'Customer'}
                {step === 3 && 'Coverage'}
                {step === 4 && 'Add-Ons'}
                {step === 5 && 'Quotation'}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.formContent}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </div>
        
        {currentStep < 6 && (
          <div className={styles.formActions}>
            {currentStep > 1 && (
              <button className={styles.backButton} onClick={handleBack}>
                Back
              </button>
            )}
            {currentStep < 5 && (
              <button
                className={styles.nextButton}
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

