// // // src/features/calculator/components/MuftiVerificationModal.jsx
// // import React, { useState } from 'react';
// // import toast from 'react-hot-toast';

// // const MuftiVerificationModal = ({
// //   isOpen,
// //   onClose,
// //   results,         // { shares, tax_results, disputes, sect, debts, funeral, wasiyyat, minor }
// //   totalEstate,
// //   distributable,
// //   generateCertificateBlob   // returns Promise<Blob>
// // }) => {
// //   const [muftiEmail, setMuftiEmail] = useState('local.mufti@example.com');
// //   const [dryRun, setDryRun] = useState(false);   // <-- Default to SEND real email (false)
// //   const [applicantName, setApplicantName] = useState('');
// //   const [propertyDescription, setPropertyDescription] = useState('Inherited Property');
// //   const [legalNoticeIssued, setLegalNoticeIssued] = useState(false);
// //   const [firIssued, setFirIssued] = useState(false);
// //   const [legalActionNotes, setLegalActionNotes] = useState('');
// //   const [sending, setSending] = useState(false);
// //   const [previewData, setPreviewData] = useState(null);

// //   if (!isOpen) return null;

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSending(true);
// //     setPreviewData(null);

// //     try {
// //       // Generate PDF certificate if shares exist
// //       let certificateBase64 = null;
// //       if (results?.shares && Object.keys(results.shares).length > 0) {
// //         const blob = await generateCertificateBlob();
// //         if (blob) {
// //           const reader = new FileReader();
// //           const base64Promise = new Promise((resolve, reject) => {
// //             reader.onloadend = () => resolve(reader.result.split(',')[1]);
// //             reader.onerror = reject;
// //             reader.readAsDataURL(blob);
// //           });
// //           certificateBase64 = await base64Promise;
// //         }
// //       }

// //       const payload = {
// //         results: {
// //           shares: results.shares,
// //           tax_results: results.tax_results || {},
// //           disputes: results.disputes || {},
// //           sect: results.sect,
// //           total_estate: totalEstate,
// //           distributable: distributable,
// //           debts: results.debts || 0,
// //           funeral: results.funeral || 0,
// //           wasiyyat: results.wasiyyat || 0,
// //           minor: results.minor || false,
// //         },
// //         case_details: {
// //           deceased_name: 'Late Person',
// //           deceased_father: '[Father]',
// //           death_date: new Date().toISOString().split('T')[0],
// //           applicant_name: applicantName || 'Not provided',
// //           property_description: propertyDescription,
// //           legal_notice_issued: legalNoticeIssued,
// //           fir_issued: firIssued,
// //           legal_action_notes: legalActionNotes,
// //         },
// //         recipient_email: muftiEmail,
// //         dry_run: dryRun,
// //         certificate_base64: certificateBase64,
// //         source: 'react_frontend',
// //       };

// //       const response = await fetch('http://localhost:8000/api/v1/verify/mufti', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await response.json();
// //       if (data.status === 'success') {
// //         if (dryRun) {
// //           setPreviewData(data.data);
// //           toast.success('Verification preview generated. Scroll down to see email content.');
// //         } else {
// //           toast.success(`✅ Verification email sent to ${muftiEmail}`);
// //           onClose();
// //         }
// //       } else {
// //         toast.error(data.detail || 'Verification failed');
// //       }
// //     } catch (err) {
// //       toast.error(err.message);
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //         <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
// //           <h2 className="text-xl font-bold text-gray-800">🕌 Local Mufti Verification</h2>
// //           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-6 space-y-5">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Mufti Email</label>
// //             <input
// //               type="email"
// //               value={muftiEmail}
// //               onChange={(e) => setMuftiEmail(e.target.value)}
// //               required
// //               className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           {/* DRY RUN TOGGLE – CLEAR AND OBVIOUS */}
// //           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //             <input
// //               type="checkbox"
// //               id="dryRun"
// //               checked={dryRun}
// //               onChange={(e) => setDryRun(e.target.checked)}
// //               className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
// //             />
// //             <label htmlFor="dryRun" className="text-sm font-medium text-gray-700">
// //               Preview only (dry run) – do not send real email
// //             </label>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Name (optional)</label>
// //             <input
// //               type="text"
// //               value={applicantName}
// //               onChange={(e) => setApplicantName(e.target.value)}
// //               className="w-full border border-gray-200 rounded-xl p-2.5"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Property / Assets Description</label>
// //             <input
// //               type="text"
// //               value={propertyDescription}
// //               onChange={(e) => setPropertyDescription(e.target.value)}
// //               className="w-full border border-gray-200 rounded-xl p-2.5"
// //             />
// //           </div>

// //           <div className="flex gap-4">
// //             <label className="flex items-center gap-2">
// //               <input type="checkbox" checked={legalNoticeIssued} onChange={(e) => setLegalNoticeIssued(e.target.checked)} className="rounded" />
// //               <span className="text-sm">Legal notice already issued</span>
// //             </label>
// //             <label className="flex items-center gap-2">
// //               <input type="checkbox" checked={firIssued} onChange={(e) => setFirIssued(e.target.checked)} className="rounded" />
// //               <span className="text-sm">FIR already issued</span>
// //             </label>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
// //             <textarea
// //               rows={3}
// //               value={legalActionNotes}
// //               onChange={(e) => setLegalActionNotes(e.target.value)}
// //               className="w-full border border-gray-200 rounded-xl p-2.5"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={sending}
// //             className="w-full bg-gradient-to-r from-purple-700 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-purple-800 hover:to-purple-700 transition-all disabled:opacity-50"
// //           >
// //             {sending ? 'Sending...' : (dryRun ? '🔍 Generate Preview' : '📧 Send Verification Request')}
// //           </button>
// //         </form>

// //         {previewData && (
// //           <div className="border-t border-gray-100 p-6 bg-gray-50 rounded-b-2xl">
// //             <h3 className="font-bold text-gray-800 mb-2">📧 Email Preview (dry run)</h3>
// //             <p className="text-sm text-gray-600">To: {previewData.recipient}</p>
// //             <p className="text-sm text-gray-600 mb-2">Subject: {previewData.subject}</p>
// //             <pre className="bg-white p-3 rounded-lg text-xs whitespace-pre-wrap border border-gray-200 max-h-96 overflow-auto">
// //               {previewData.body}
// //             </pre>
// //             {previewData.attachments?.length > 0 && (
// //               <p className="text-sm text-gray-600 mt-2">Attachments: {previewData.attachments.join(', ')}</p>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MuftiVerificationModal;





















// // src/features/calculator/components/MuftiVerificationModal.jsx
// import React, { useState } from 'react';
// import toast from 'react-hot-toast';

// // Use the same API base URL logic as the main page
// const API_BASE_URL = import.meta.env.PROD 
//   ? 'https://warisnamaai-production.up.railway.app/api/v1'
//   : 'http://localhost:8000/api/v1'

// const MuftiVerificationModal = ({
//   isOpen,
//   onClose,
//   results,         // { shares, tax_results, disputes, sect, debts, funeral, wasiyyat, minor }
//   totalEstate,
//   distributable,
//   generateCertificateBlob   // returns Promise<Blob>
// }) => {
//   const [muftiEmail, setMuftiEmail] = useState('local.mufti@example.com');
//   const [dryRun, setDryRun] = useState(false);   // <-- Default to SEND real email (false)
//   const [applicantName, setApplicantName] = useState('');
//   const [propertyDescription, setPropertyDescription] = useState('Inherited Property');
//   const [legalNoticeIssued, setLegalNoticeIssued] = useState(false);
//   const [firIssued, setFirIssued] = useState(false);
//   const [legalActionNotes, setLegalActionNotes] = useState('');
//   const [sending, setSending] = useState(false);
//   const [previewData, setPreviewData] = useState(null);

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSending(true);
//     setPreviewData(null);

//     try {
//       // Generate PDF certificate if shares exist
//       let certificateBase64 = null;
//       if (results?.shares && Object.keys(results.shares).length > 0) {
//         const blob = await generateCertificateBlob();
//         if (blob) {
//           const reader = new FileReader();
//           const base64Promise = new Promise((resolve, reject) => {
//             reader.onloadend = () => resolve(reader.result.split(',')[1]);
//             reader.onerror = reject;
//             reader.readAsDataURL(blob);
//           });
//           certificateBase64 = await base64Promise;
//         }
//       }

//       const payload = {
//         results: {
//           shares: results.shares,
//           tax_results: results.tax_results || {},
//           disputes: results.disputes || {},
//           sect: results.sect,
//           total_estate: totalEstate,
//           distributable: distributable,
//           debts: results.debts || 0,
//           funeral: results.funeral || 0,
//           wasiyyat: results.wasiyyat || 0,
//           minor: results.minor || false,
//         },
//         case_details: {
//           deceased_name: 'Late Person',
//           deceased_father: '[Father]',
//           death_date: new Date().toISOString().split('T')[0],
//           applicant_name: applicantName || 'Not provided',
//           property_description: propertyDescription,
//           legal_notice_issued: legalNoticeIssued,
//           fir_issued: firIssued,
//           legal_action_notes: legalActionNotes,
//         },
//         recipient_email: muftiEmail,
//         dry_run: dryRun,
//         certificate_base64: certificateBase64,
//         source: 'react_frontend',
//       };

//       // FIXED: Use API_BASE_URL instead of hardcoded localhost
//       const response = await fetch(`${API_BASE_URL}/verify/mufti`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (data.status === 'success') {
//         if (dryRun) {
//           setPreviewData(data.data);
//           toast.success('Verification preview generated. Scroll down to see email content.');
//         } else {
//           toast.success(`✅ Verification email sent to ${muftiEmail}`);
//           onClose();
//         }
//       } else {
//         toast.error(data.detail || 'Verification failed');
//       }
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-800">🕌 Local Mufti Verification</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Mufti Email</label>
//             <input
//               type="email"
//               value={muftiEmail}
//               onChange={(e) => setMuftiEmail(e.target.value)}
//               required
//               className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* DRY RUN TOGGLE – CLEAR AND OBVIOUS */}
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//             <input
//               type="checkbox"
//               id="dryRun"
//               checked={dryRun}
//               onChange={(e) => setDryRun(e.target.checked)}
//               className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
//             />
//             <label htmlFor="dryRun" className="text-sm font-medium text-gray-700">
//               Preview only (dry run) – do not send real email
//             </label>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Name (optional)</label>
//             <input
//               type="text"
//               value={applicantName}
//               onChange={(e) => setApplicantName(e.target.value)}
//               className="w-full border border-gray-200 rounded-xl p-2.5"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Property / Assets Description</label>
//             <input
//               type="text"
//               value={propertyDescription}
//               onChange={(e) => setPropertyDescription(e.target.value)}
//               className="w-full border border-gray-200 rounded-xl p-2.5"
//             />
//           </div>

//           <div className="flex gap-4">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" checked={legalNoticeIssued} onChange={(e) => setLegalNoticeIssued(e.target.checked)} className="rounded" />
//               <span className="text-sm">Legal notice already issued</span>
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" checked={firIssued} onChange={(e) => setFirIssued(e.target.checked)} className="rounded" />
//               <span className="text-sm">FIR already issued</span>
//             </label>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
//             <textarea
//               rows={3}
//               value={legalActionNotes}
//               onChange={(e) => setLegalActionNotes(e.target.value)}
//               className="w-full border border-gray-200 rounded-xl p-2.5"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={sending}
//             className="w-full bg-gradient-to-r from-purple-700 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-purple-800 hover:to-purple-700 transition-all disabled:opacity-50"
//           >
//             {sending ? 'Sending...' : (dryRun ? '🔍 Generate Preview' : '📧 Send Verification Request')}
//           </button>
//         </form>

//         {previewData && (
//           <div className="border-t border-gray-100 p-6 bg-gray-50 rounded-b-2xl">
//             <h3 className="font-bold text-gray-800 mb-2">📧 Email Preview (dry run)</h3>
//             <p className="text-sm text-gray-600">To: {previewData.recipient}</p>
//             <p className="text-sm text-gray-600 mb-2">Subject: {previewData.subject}</p>
//             <pre className="bg-white p-3 rounded-lg text-xs whitespace-pre-wrap border border-gray-200 max-h-96 overflow-auto">
//               {previewData.body}
//             </pre>
//             {previewData.attachments?.length > 0 && (
//               <p className="text-sm text-gray-600 mt-2">Attachments: {previewData.attachments.join(', ')}</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MuftiVerificationModal;






// src/features/calculator/components/MuftiVerificationModal.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://warisnamaai-production.up.railway.app/api/v1'
  : 'http://localhost:8000/api/v1'

const MuftiVerificationModal = ({
  isOpen,
  onClose,
  results,
  totalEstate,
  distributable,
  generateCertificateBlob
}) => {
  const [muftiEmail, setMuftiEmail] = useState('');
  const [dryRun, setDryRun] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantContact, setApplicantContact] = useState('');
  const [applicantCNIC, setApplicantCNIC] = useState('');
  const [deceasedName, setDeceasedName] = useState('');
  const [deceasedFather, setDeceasedFather] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [legalNoticeIssued, setLegalNoticeIssued] = useState(false);
  const [firIssued, setFirIssued] = useState(false);
  const [legalActionNotes, setLegalActionNotes] = useState('');
  const [sending, setSending] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setPreviewData(null);

    try {
      // Generate PDF certificate if shares exist
      let certificateBase64 = null;
      if (results?.shares && Object.keys(results.shares).length > 0) {
        const blob = await generateCertificateBlob();
        if (blob) {
          const reader = new FileReader();
          const base64Promise = new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          certificateBase64 = await base64Promise;
        }
      }

      const payload = {
        results: {
          shares: results.shares,
          tax_results: results.tax_results || {},
          disputes: results.disputes || {},
          sect: results.sect,
          total_estate: totalEstate,
          distributable: distributable,
          debts: results.debts || 0,
          funeral: results.funeral || 0,
          wasiyyat: results.wasiyyat || 0,
          minor: results.minor || false,
        },
        case_details: {
          deceased_name: deceasedName || 'Not provided',
          deceased_father: deceasedFather || 'Not provided',
          death_date: deathDate || new Date().toISOString().split('T')[0],
          applicant_name: applicantName || 'Not provided',
          applicant_cnic: applicantCNIC || 'Not provided',
          applicant_contact: applicantContact || 'Not provided',
          property_description: propertyDescription || 'Inherited Property',
          legal_notice_issued: legalNoticeIssued,
          fir_issued: firIssued,
          legal_action_notes: legalActionNotes,
        },
        recipient_email: muftiEmail,
        dry_run: dryRun,
        certificate_base64: certificateBase64,
        source: 'react_frontend',
      };

      const response = await fetch(`${API_BASE_URL}/verify/mufti`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.status === 'success') {
        if (dryRun) {
          setPreviewData(data.data);
          toast.success('Verification preview generated');
        } else {
          toast.success(`✅ Verification sent to ${muftiEmail}`);
          onClose();
        }
      } else {
        toast.error(data.detail || 'Verification failed');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-700 to-purple-600 text-white px-6 py-5 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🕌 Mufti Verification Request</h2>
              <p className="text-purple-100 text-sm mt-1">Request independent scholarly verification of inheritance calculation</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white text-3xl leading-none transition-colors"
            >
              &times;
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Verification Settings */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xl">📧</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mufti Email Address</label>
                  <input
                    type="email"
                    value={muftiEmail}
                    onChange={(e) => setMuftiEmail(e.target.value)}
                    placeholder="local.mufti@example.com"
                    required
                    className="mt-1 w-80 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dryRun}
                  onChange={(e) => setDryRun(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-600">🔍 Preview only (dry run)</span>
              </label>
            </div>
          </div>

          {/* Deceased Information */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>⚰️</span> Deceased Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deceased Name</label>
                <input
                  type="text"
                  value={deceasedName}
                  onChange={(e) => setDeceasedName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's/Husband's Name</label>
                <input
                  type="text"
                  value={deceasedFather}
                  onChange={(e) => setDeceasedFather(e.target.value)}
                  placeholder="Enter father/husband name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Death</label>
                <input
                  type="date"
                  value={deathDate}
                  onChange={(e) => setDeathDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property/Assets Description</label>
                <input
                  type="text"
                  value={propertyDescription}
                  onChange={(e) => setPropertyDescription(e.target.value)}
                  placeholder="Describe the inherited property"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Applicant Information */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>👤</span> Applicant Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CNIC Number</label>
                <input
                  type="text"
                  value={applicantCNIC}
                  onChange={(e) => setApplicantCNIC(e.target.value)}
                  placeholder="XXXXX-XXXXXXX-X"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  value={applicantContact}
                  onChange={(e) => setApplicantContact(e.target.value)}
                  placeholder="Mobile/Phone number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Legal Status */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>⚖️</span> Legal Status
            </h3>
            <div className="flex gap-6 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={legalNoticeIssued}
                  onChange={(e) => setLegalNoticeIssued(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600"
                />
                <span className="text-sm text-gray-700">Legal notice already issued</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={firIssued}
                  onChange={(e) => setFirIssued(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600"
                />
                <span className="text-sm text-gray-700">FIR already issued</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                rows={3}
                value={legalActionNotes}
                onChange={(e) => setLegalActionNotes(e.target.value)}
                placeholder="Any additional information for the mufti..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Calculation Summary Preview */}
          {results?.shares && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span>📊</span> Calculation Summary
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white rounded-lg p-2">
                  <p className="text-xs text-gray-500">Total Estate</p>
                  <p className="text-sm font-bold text-gray-800">PKR {totalEstate?.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <p className="text-xs text-gray-500">Distributable</p>
                  <p className="text-sm font-bold text-gray-800">PKR {distributable?.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <p className="text-xs text-gray-500">Heirs</p>
                  <p className="text-sm font-bold text-gray-800">{Object.keys(results.shares).length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-gradient-to-r from-purple-700 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-purple-800 hover:to-purple-700 transition-all disabled:opacity-50 shadow-lg"
          >
            {sending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              dryRun ? '🔍 Generate Preview' : '📧 Send Verification Request'
            )}
          </button>
        </form>

        {/* Preview Section */}
        {previewData && (
          <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📧</span> Email Preview
            </h3>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1"><strong>To:</strong> {previewData.recipient}</p>
              <p className="text-sm text-gray-600 mb-3"><strong>Subject:</strong> {previewData.subject}</p>
              <div className="bg-gray-50 rounded-lg p-3 max-h-96 overflow-auto">
                <pre className="text-xs whitespace-pre-wrap font-mono">{previewData.body}</pre>
              </div>
              {previewData.attachments?.length > 0 && (
                <p className="text-sm text-gray-600 mt-3">
                  <strong>📎 Attachments:</strong> {previewData.attachments.join(', ')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuftiVerificationModal;