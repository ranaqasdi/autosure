"use client"
import { useState } from "react";

export default function Home() {
  const [policynumber, setPolicyNumber] = useState("");
  const [issueddate, setIssuedDate] = useState("");
  const [agentname, setAgentName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [effectivetime, setEffectiveTime] = useState("");
  const [expirytime, setExpiryTime] = useState("");
  const [carmake, setCarMake] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGeneratePDF = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          policynumber,
          issueddate,
          agentname,
          firstname,
          lastname,
          effectivetime,
          expirytime,
          carmake
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate PDF: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const rawHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HTML Table</title>
<style>
    body {
        font-family: poppins, sans-serif;
        font-size: 12px;
    }
    table {
        border:1px solid black;
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    td {
        padding: 4px 8px;
        text-align: left;

        border:1px solid black;
        height: 24px;
    }
    th {
        font-size: 14px;
        padding: 8px 16px;
        text-align: left;
        vertical-align: top;
        border:1px solid black;
        min-height: 100px;
    }
    .container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }
    ol {
    padding-left: 30px; /* Add padding to the left of the list */
    }
    ol li {
    padding-left: 20px; /* Add padding between the number and list text */
    }
</style>
</head>
<body>
    <div class="container">
        <img style="margin-top: 20px;" src="images\top logo.PNG" alt="top-logo">
        <table style="padding-bottom: 0; margin-bottom: 0;">
            <tr>
                <th colspan="2" style="width: 60%;">SHORT TERM INSURANCE</th>
                <th colspan="2" style="width: 40%;">NEW BUSINESS SCHEDULE</th>
            </tr>
        </table>
        <table style="padding-bottom: 0; margin-bottom: 0; margin-top: -1px;">
            <tr>
                <td style="width: 30%;"><strong>Policy Number:</strong><br> TCV-MOT-{Policy no:91}</td>
                <td style="width: 20%;"><strong>Date Issued:</strong><br> {Start Date:131}</td>
                <td style="width: 49%; border-right: none;"><strong>Agent:</strong><br> AUTOSURE UK</td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;"><strong>Insured:</strong> {Name (First):88.3} {Name (Last):88.6}</td>
                <td colspan="2" style="width: 50%;"><strong>Effective Time/Date:</strong> 00:00 {Start Date:131}</td>
            </tr>
            <tr>
                <td colspan="2" rowspan="3" style="width: 50%; vertical-align: top;">{Address (Street Address):400.1}<br>{Address (City):400.3}<br>{Address (County / State):400.4}<br>{Address (ZIP / Postal Code):400.5}</td>
                <td colspan="2" style="width: 50%;"><strong>Expiry Time/Date:</strong> 00:00 {End Date:132}</td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;"><strong>Reason for Issue:</strong> Temporary Insurance</td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;"><strong>Driving License Validation Check:</strong> Yes</td>
            </tr>
        </table>
        <table style="border-top: none; margin-bottom: 0; margin-top: -1px;">
            <tr>
                <td colspan="1" style="width: 25%; border-right: none;"><strong style="text-decoration: underline;">Insured Vehicle:</strong></td>
                <td colspan="1" style="width: 35%; border-left: none;"><strong>Registration Number: </strong>{Registration Plate:118}</td>
                <td colspan="2" style="width: 40%;"><strong>Cover:</strong> FULLY COMPREHENSIVE</td>
            </tr>
            <tr>
                <td colspan="4" style="padding-left: 30px;"><strong>Make and Model of Vehicle:</strong><br>{Car Make:117} {Car Model:119}</td>
            </tr>
        </table>
        
        <hr style="height: 4px; background-color: black; margin: 20px 0;">
        
        <div style="border: 1px solid black; padding: 2px 8px 0;">
            <p style="font-size: 14px; margin-top: 4px;">
                <strong>
                    <u>EXCESS APPLICABLE</u>
                </strong><br>
                
            </p>
            <table style="width: 50%; border: none;">
                <tr>
                    <td style="border: none; border-bottom: 1px solid black; padding: 0 0 8px 0;">Compulsory Excess Amount<br>Voluntary Excess Amount</td>
                    <td style="text-align: right; border: none; border-bottom: 1px solid black; padding: 0 0 8px 0;">£2550.00<br>£0.00</td>
                </tr>
                <tr>
                    <td style="border: none; padding: 16px 0 0 0;"><strong>Total Excess Amount</strong></td>
                    <td style="text-align: right; border: none; padding: 16px 0 0 0;"><strong>£2550.00</strong></td>
                </tr>
            </table>
        </div>
        
        <hr style="height: 4px; background-color: black; margin: 20px 0;">

        <div style="border: 1px solid black; padding: 2px 8px 0;">
            <p><strong style="text-decoration: underline;"><u>ENDORSEMENTS APPLICABLE</u></strong><br><br>
                <span style="font-size: 9px;"><strong>P01 - ACCIDENTAL DAMAGE FIRE AND THEFT EXCESS</strong><br> We shall not be responsible to pay the first amount as shown below of any claims or series of claims arising out of one event in respect of
which indemnity is provided by the Accidental Damage Section and/or Fire and Theft Section of your policy.<br><br><br></span>
            </p>
           
        </div>

        


        <table style="border: none; margin-top:-100px">
            <tr>
                <td style="width: 30%; border: none;"></td>
                <td style="width: 40%; border: none;"><img style="width: 300px;" src="images\bottom logo.PNG" alt="bottom-logo"></td>
                <td style="width: 30%; border: none;"></td>
            </tr>
        </table>

        <table style="border: none; margin-top:-140px;">
            <tr>
                <td style="width: 33%; border: none;"></td>
                <td style="width: 33%; border: none;">
                    <p>
                <span style="font-size: 7px; padding-left: 20px;"><strong> AUTOSURE TEMPCOVER is a trading style of AUTOSURE UK</span>
            </p></td>
                <td style="width: 33%; border: none;"></td>
            </tr>
        </table>
    </div>
</body>
</html>`

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <div className="flex-1 p-6 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Edit Legal Document</h2>
          
          <div className="space-y-4">
            <input
              type="text"
              value={policynumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              placeholder="Enter Policy Number"
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              value={issueddate}
              onChange={(e) => setIssuedDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={agentname}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Enter Agent Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="datetime-local"
              value={effectivetime}
              onChange={(e) => setEffectiveTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="datetime-local"
              value={expirytime}
              onChange={(e) => setExpiryTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={carmake}
              onChange={(e) => setCarMake(e.target.value)}
              placeholder="Enter Car Make"
              className="w-full p-2 border rounded"
            />
            
            <button
              onClick={handleGeneratePDF}
              disabled={isLoading}
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isLoading ? 'Generating PDF...' : 'Generate PDF'}
            </button>

            {error && (
              <div className="text-red-500 mt-2">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex-1 p-6 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Preview</h2>
          {pdfUrl && (
            <div className="space-y-4">
              <iframe
                src={pdfUrl}
                className="w-full h-[600px] border rounded"
                title="PDF Preview"
              />
              <a
                href={pdfUrl}
                download="legal-document.pdf"
                className="block w-full text-center bg-green-500 text-white p-3 rounded hover:bg-green-600"
              >
                Download PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}