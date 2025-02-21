import chromium from "@sparticuz/chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export async function GET() {
    let browser;
    try {
        // Launch Puppeteer optimized for Vercel
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath || "/usr/bin/chromium",
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.setContent("<h1>Hello, PDF!</h1>", { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

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

export async function POST(request) {
    let browser;
    try {
        const formData = await request.json();
        
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath || "/usr/bin/chromium",
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        
        // Replace placeholders in the HTML template with form data
        const htmlContent = rawHtml
            .replace('{Policy no:91}', formData.policynumber)
            .replace('{Start Date:131}', formData.issueddate)
            .replace('AUTOSURE UK', formData.agentname)
            .replace('{Name (First):88.3}', formData.firstname)
            .replace('{Name (Last):88.6}', formData.lastname)
            .replace('{Car Make:117}', formData.carmake);
            // Add other replacements as needed

        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

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
