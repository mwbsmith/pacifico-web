// Script to fetch and process tuition data from Google Sheets
// This script demonstrates how to connect to external data sources

async function fetchTuitionData() {
  try {
    // Example Google Sheets API endpoint (replace with actual sheet ID and API key)
    const SHEET_ID = "your-google-sheet-id"
    const API_KEY = "your-google-api-key"
    const RANGE = "Tuition!A1:D20"

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`

    console.log("Fetching tuition data from Google Sheets...")

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    console.log("Raw data from Google Sheets:", data)

    // Process the data
    const rows = data.values
    if (!rows || rows.length === 0) {
      console.log("No data found in the sheet")
      return
    }

    // Assuming first row contains headers
    const headers = rows[0]
    console.log("Headers:", headers)

    // Process each row of tuition data
    const tuitionData = []
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      if (row.length >= 4) {
        tuitionData.push({
          program: row[0],
          schedule: row[1],
          annualTuition: row[2],
          monthly: row[3],
        })
      }
    }

    console.log("Processed tuition data:", tuitionData)

    // You could save this data to a JSON file or use it directly
    return tuitionData
  } catch (error) {
    console.error("Error fetching tuition data:", error)

    // Return fallback data if API fails
    return [
      {
        program: "Kindergarten (3 days/week)",
        schedule: "Any 3 of 5",
        annualTuition: "$5,200",
        monthly: "$520",
      },
      {
        program: "Kindergarten (5 days/week)",
        schedule: "Monday - Friday",
        annualTuition: "$6,950",
        monthly: "$695",
      },
      {
        program: "Grades 1-8",
        schedule: "Monday - Friday",
        annualTuition: "$6,950",
        monthly: "$695",
      },
    ]
  }
}

// Execute the function
fetchTuitionData().then((data) => {
  console.log("Final tuition data:", data)
})
