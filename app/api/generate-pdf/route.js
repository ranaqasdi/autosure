import chromium from "@sparticuz/chrome-aws-lambda";
import puppeteer from "puppeteer-core";

// Define the HTML template directly in the route file
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
    </style>
</head>
<body>
    <div class="container">
        <table>
            <tr>
                <th colspan="2" style="width: 60%;">SHORT TERM INSURANCE</th>
                <th colspan="2" style="width: 40%;">NEW BUSINESS SCHEDULE</th>
            </tr>
        </table>
        <table>
            <tr>
                <td style="width: 30%;"><strong>Policy Number:</strong><br> TCV-MOT-{Policy no:91}</td>
                <td style="width: 20%;"><strong>Date Issued:</strong><br> {Start Date:131}</td>
                <td style="width: 49%;"><strong>Agent:</strong><br> {agentname}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Insured:</strong> {Name (First):88.3} {Name (Last):88.6}</td>
                <td><strong>Effective Time/Date:</strong> {effectivetime}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Expiry Time/Date:</strong> {End Date:132}</td>
                <td><strong>Car Make:</strong> {Car Make:117}</td>
            </tr>
        </table>
    </div>
</body>
</html>`;

export async function POST(request) {
    let browser;
    try {
        const formData = await request.json();
        
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: true,
        });

        const page = await browser.newPage();
        
        const htmlContent = rawHtml
            .replace('{Policy no:91}', formData.policynumber)
            .replace('{Start Date:131}', formData.issueddate)
            .replace('{agentname}', formData.agentname)
            .replace('{Name (First):88.3}', formData.firstname)
            .replace('{Name (Last):88.6}', formData.lastname)
            .replace('{Car Make:117}', formData.carmake)
            .replace('{effectivetime}', formData.effectivetime)
            .replace('{End Date:132}', formData.expirytime);

        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" }
        });

        return new Response(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=download.pdf",
            },
        });
    } catch (error) {
        console.error("PDF Generation Error:", error);
        return new Response("Failed to generate PDF", { status: 500 });
    } finally {
        if (browser) await browser.close();
    }
}