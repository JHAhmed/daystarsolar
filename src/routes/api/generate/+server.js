// src/routes/api/generate-pdf/+server.ts
import puppeteer from 'puppeteer';
import { json } from '@sveltejs/kit';

import { logo } from '$lib';

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  
  const suffix = day % 10 === 1 && day !== 11 ? 'st' :
                day % 10 === 2 && day !== 12 ? 'nd' :
                day % 10 === 3 && day !== 13 ? 'rd' : 'th';

  return `${day}${suffix} ${month} ${year}`;
}

export async function GET({ url }) {
	const name = url.searchParams.get('name') || 'User';
	const savings = url.searchParams.get('savings') || '2,500';
	const roiMonths = url.searchParams.get('roiMonths') || '24';

	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	console.log('Generating PDF...');
	console.log('Name:', name);
	console.log('Savings:', savings);
	// Load a page with a chart and dynamic data
	await page.setContent(`
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          /* Ensure the PDF renders full width */
          body { width: 100%; }
        </style>
      </head>
      <body class="p-8 text-gray-800 flex flex-col">


        <img src=${logo} alt="logo" class="h-20 my-12 mx-auto" />

        <p class="ml-auto my-8">${formatDate(new Date())}</p>

        <h1 class="text-2xl font-bold">Hey ${name},</h1>
        <p class="mt-4">
          Based on our analysis, you could have saved
          <strong class="text-orange-400">₹${savings}</strong> every month if you had switched to solar
          energy.
        </p>
        <p class="mt-2">
          By switching to solar now, you can begin seeing a Return On Investment in
          <strong class="">${roiMonths} months</strong>.
        </p>
        <p class="mt-4">Electricity usage chart below:</p>
        <canvas id="chart" class="mt-4"></canvas>

        <p class="mt-24 italic text-sm">
          <strong>Standard Disclaimer:</strong> This is a computer generated report. No warranty or responsibility is expressed or
          implied by way of Daystar Solar or its representatives. This information is property of Daystar solar and not to
          be used for commercial purposes. This is a guidline calculation, contact our representatives for an exact and
          best estimate on your power requirements.
        </p>


        <script>
          const ctx = document.getElementById("chart").getContext("2d");
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr"],
              datasets: [{
                label: "Electricity Usage (kWh)",
                data: [400, 380, 420, 390],
                backgroundColor: "rgba(75, 192, 192, 0.5)"
              }]
            }
          });
        </script>
      </body>
    </html>
  `);

	// Wait for the chart to render
	await page.waitForSelector('#chart');

	// Convert page to PDF
	const pdfBuffer = await page.pdf({ format: 'A4' });

	await browser.close();
	return new Response(pdfBuffer, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment; filename=report.pdf'
		}
	});
}


export async function POST({ request }) {
  const formData = await request.formData();

  const name = formData.get('name') || 'User';
  const savings = formData.get('savings') || '2,500';
  const roiMonths = formData.get('roiMonths') || '24';

  const logoFile = formData.get('logo');

  const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	console.log('Generating PDF...');
	console.log('Name:', name);
	console.log('Savings:', savings);

  await page.setContent(`
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          /* Ensure the PDF renders full width */
          body { width: 100%; }
        </style>
      </head>
      <body class="p-8 text-gray-800 flex flex-col">


        <img src="${logo}" alt="logo" class="h-20 my-12 mx-auto" />

        <p class="ml-auto my-8">${formatDate(new Date())}</p>

        <h1 class="text-2xl font-bold">Hey ${name},</h1>
        <p class="mt-4">
          Based on our analysis, you could have saved
          <strong class="text-orange-400">₹${savings}</strong> every month if you had switched to solar
          energy.
        </p>
        <p class="mt-2">
          By switching to solar now, you can begin seeing a Return On Investment in
          <strong class="">${roiMonths} months</strong>.
        </p>
        <p class="mt-4">Electricity usage chart below:</p>
        <canvas id="chart" class="mt-4"></canvas>

        <p class="mt-24 italic text-sm">
          <strong>Standard Disclaimer:</strong> This is a computer generated report. No warranty or responsibility is expressed or
          implied by way of Daystar Solar or its representatives. This information is property of Daystar solar and not to
          be used for commercial purposes. This is a guidline calculation, contact our representatives for an exact and
          best estimate on your power requirements.
        </p>


        <script>
          const ctx = document.getElementById("chart").getContext("2d");
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr"],
              datasets: [{
                label: "Electricity Usage (kWh)",
                data: [400, 380, 420, 390],
                backgroundColor: "rgba(75, 192, 192, 0.5)"
              }]
            }
          });
        </script>
      </body>
    </html>
  `);

	// Wait for the chart to render
	await page.waitForSelector('#chart');

	// Convert page to PDF
	const pdfBuffer = await page.pdf({ format: 'A4' });

	await browser.close();
	return new Response(pdfBuffer, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment; filename=report.pdf'
		}
	});
}