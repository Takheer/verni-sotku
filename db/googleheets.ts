const sheetRange = process.env.DATA_SHEET_NAME + "!A1:D200";

type SheetRow = {
  who: string
  whom: string
  sum: number
  comment: string
}

type TableData = {
  range: string,
  majorDimension: string,
  values: string[][]
}

const DATA_SHEET_ID = process.env.DATA_SHEET_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BACKEND_URL = process.env.BACKEND_URL

export async function allRows(): Promise<TableData> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${DATA_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_API_KEY}`
  const res = await fetch(url)
  return await res.json()
}

export async function addRow(row: SheetRow) {
  const res = await fetch(`${BACKEND_URL}/add-spending`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      spending: {
        who: row.who,
        whom: row.whom,
        sum: row.sum,
        comment: row.comment
      }
    }),
  })

  return await res.json()
}
