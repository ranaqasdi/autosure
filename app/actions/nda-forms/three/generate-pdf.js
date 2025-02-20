"use server";

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export async function generatePDF(title, description) {
    const htmlContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #333; }
                p { font-size: 14px; line-height: 1.6; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <p>${description}</p>
        </body>
        </html>
    `;

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfPath = path.join(process.cwd(), "public", "legal-document.pdf");
        await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

        await browser.close();

        return `/legal-document.pdf`; // Return the URL for download
    } catch (error) {
        console.error("Error generating PDF:", error);
        return null;
    }
}
