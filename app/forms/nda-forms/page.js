"use client";

import { useState } from "react";
import { generatePDF } from "../../actions/nda-forms/one/generate-pdf";

export default function Home() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [agentName, setAgentName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [effectiveTime, setEffectiveTime] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [carMake, setCarMake] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleGeneratePDF = async () => {
    const url = await generatePDF(
      policyNumber,
      issuedDate,
      agentName,
      firstName,
      lastName,
      effectiveTime,
      expiryTime,
      carMake
    );
    if (url) {
      setPdfUrl(url);
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
          <img style="margin-top: 20px; display:none" src="images\top logo.PNG" alt="top-logo">
          <table style="padding-bottom: 0; margin-bottom: 0;">
              <tr>
                  <th colspan="2" style="width: 60%;">SHORT TERM INSURANCE</th>
                  <th colspan="2" style="width: 40%;">NEW BUSINESS SCHEDULE</th>
              </tr>
          </table>
          <table style="padding-bottom: 0; margin-bottom: 0; margin-top: -1px;">
              <tr>
                  <td style="width: 30%;"><strong>Policy Number:</strong><br> ${policyNumber}</td>
                  <td style="width: 20%;"><strong>Date Issued:</strong><br>  ${issuedDate}</td>
                  <td style="width: 49%; border-right: none;"><strong>Agent:</strong><br>  ${agentName}</td>
              </tr>
              <tr>
                  <td colspan="2" style="width: 50%;"><strong>Insured:</strong>  ${firstName}  ${lastName}</td>
                  <td colspan="2" style="width: 50%;"><strong>Effective Time/Date:</strong> 00:00  ${effectiveTime}</td>
              </tr>
              <tr>
                  <td colspan="2" rowspan="3" style="width: 50%; vertical-align: top;">{Address (Street Address):400.1}<br>{Address (City):400.3}<br>{Address (County / State):400.4}<br>{Address (ZIP / Postal Code):400.5}</td>
                  <td colspan="2" style="width: 50%;"><strong>Expiry Time/Date:</strong> 00:00  ${expiryTime}</td>
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
                  <td colspan="4" style="padding-left: 30px;"><strong>Make and Model of Vehicle:</strong><br> ${carMake} {Car Model:119}</td>
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
                  <td style="width: 40%; border: none;"></td>
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
    <>
      <div className="flex p-20">
        {/* Editing Section */}
        <div className=" p-20 flex gap-y-5 flex-col w-full bg-slate-200  ">
          <h2 className="text-2xl font-bold">Edit Legal Document</h2>
          <input
            type="text"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            placeholder="Enter Policy Number"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            value={issuedDate}
            onChange={(e) => setIssuedDate(e.target.value)}
            placeholder="Enter Issued Date"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Enter Agent Name"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            value={effectiveTime}
            onChange={(e) => setEffectiveTime(e.target.value)}
            placeholder="Enter Effective Time"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            value={expiryTime}
            onChange={(e) => setExpiryTime(e.target.value)}
            placeholder="Enter Expiry Time"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            value={carMake}
            onChange={(e) => setCarMake(e.target.value)}
            placeholder="Enter Car Make"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <button
            onClick={handleGeneratePDF}
            className="py-4 bg-green-600 text-white placeholder:text-white px-4 rounded shadow-md"
          >
            Generate PDF
          </button>
          {pdfUrl && (
        <a href={pdfUrl} download="legal-document.pdf">
          <button
            className=" w-full  py-4 bg-green-600 text-white placeholder:text-white px-4 rounded shadow-md"
          >
            Download PDF
          </button>
        </a>
      )}
        </div>

        {/* Preview Section */}
        <div className="p-20 overflow-y-auto flex gap-y-5 flex-col w-full bg-green-300">
          <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
        </div>
      </div>

     
    </>
  );
}
