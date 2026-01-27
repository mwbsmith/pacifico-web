// Generic script to fetch data from Google Sheets
// Can be used for various data sources like events, student info, etc.

class GoogleSheetsAPI {
  constructor(apiKey, sheetId) {
    this.apiKey = apiKey
    this.sheetId = sheetId
    this.baseUrl = "https://sheets.googleapis.com/v4/spreadsheets"
  }

  async fetchRange(range) {
    try {
      const url = `${this.baseUrl}/${this.sheetId}/values/${range}?key=${this.apiKey}`

      console.log(`Fetching data from range: ${range}`)

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.values || []
    } catch (error) {
      console.error(`Error fetching range ${range}:`, error)
      return []
    }
  }

  async fetchMultipleRanges(ranges) {
    try {
      const rangeParams = ranges.map((range) => `ranges=${encodeURIComponent(range)}`).join("&")
      const url = `${this.baseUrl}/${this.sheetId}/values:batchGet?${rangeParams}&key=${this.apiKey}`

      console.log("Fetching multiple ranges:", ranges)

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.valueRanges || []
    } catch (error) {
      console.error("Error fetching multiple ranges:", error)
      return []
    }
  }

  processRowsToObjects(rows, headerRow = 0) {
    if (!rows || rows.length <= headerRow) {
      return []
    }

    const headers = rows[headerRow]
    const dataRows = rows.slice(headerRow + 1)

    return dataRows.map((row) => {
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = row[index] || ""
      })
      return obj
    })
  }
}

// Example usage for school data
async function fetchSchoolData() {
  // Replace with actual API key and sheet ID
  const API_KEY = process.env.GOOGLE_SHEETS_API_KEY || "your-api-key"
  const SHEET_ID = process.env.GOOGLE_SHEET_ID || "your-sheet-id"

  const sheetsAPI = new GoogleSheetsAPI(API_KEY, SHEET_ID)

  try {
    // Fetch different types of school data
    const ranges = [
      "Students!A1:Z100", // Student information
      "Events!A1:F50", // School events
      "Tuition!A1:D20", // Tuition information
      "Staff!A1:E30", // Staff directory
    ]

    const results = await sheetsAPI.fetchMultipleRanges(ranges)

    const schoolData = {
      students: [],
      events: [],
      tuition: [],
      staff: [],
    }

    if (results.length >= 1 && results[0].values) {
      schoolData.students = sheetsAPI.processRowsToObjects(results[0].values)
      console.log(`Processed ${schoolData.students.length} student records`)
    }

    if (results.length >= 2 && results[1].values) {
      schoolData.events = sheetsAPI.processRowsToObjects(results[1].values)
      console.log(`Processed ${schoolData.events.length} events`)
    }

    if (results.length >= 3 && results[2].values) {
      schoolData.tuition = sheetsAPI.processRowsToObjects(results[2].values)
      console.log(`Processed ${schoolData.tuition.length} tuition entries`)
    }

    if (results.length >= 4 && results[3].values) {
      schoolData.staff = sheetsAPI.processRowsToObjects(results[3].values)
      console.log(`Processed ${schoolData.staff.length} staff members`)
    }

    return schoolData
  } catch (error) {
    console.error("Error fetching school data:", error)
    return null
  }
}

// Execute the function
fetchSchoolData().then((data) => {
  if (data) {
    console.log("Successfully fetched school data:", Object.keys(data))

    // Example: Log first few events
    if (data.events.length > 0) {
      console.log("Sample events:", data.events.slice(0, 3))
    }
  }
})

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { GoogleSheetsAPI, fetchSchoolData }
}
