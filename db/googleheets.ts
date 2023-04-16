const sheetRange = "Выписка!A1:D200";

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

const getVars = () => {
  const DATA_SHEET_ID = process.env.DATA_SHEET_ID;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  return { DATA_SHEET_ID, GOOGLE_API_KEY }
}

export async function allRows(): Promise<TableData> {
  const { DATA_SHEET_ID, GOOGLE_API_KEY } = getVars();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${DATA_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_API_KEY}`
  const res = await fetch(url)
  return await res.json()
}

export async function addRow(row: SheetRow) {
  return await new Promise<SheetRow>(resolve => resolve(row));
}
