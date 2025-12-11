import * as XLSX from "xlsx";

export interface ParsedSheet {
  name: string;
  data: string[][];
  rowCount: number;
  columnCount: number;
}

export const parseExcelFile = async (file: File): Promise<ParsedSheet[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheets: ParsedSheet[] = workbook.SheetNames.map((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
            header: 1,
            defval: "",
          });

          // Filter out completely empty rows
          const filteredData = jsonData.filter((row) =>
            row.some((cell) => cell !== "")
          );

          const maxColumns = Math.max(
            ...filteredData.map((row) => row.length),
            0
          );

          // Normalize row lengths
          const normalizedData = filteredData.map((row) => {
            const newRow = [...row];
            while (newRow.length < maxColumns) {
              newRow.push("");
            }
            return newRow.map((cell) => String(cell));
          });

          return {
            name: sheetName,
            data: normalizedData,
            rowCount: normalizedData.length - 1, // Exclude header
            columnCount: maxColumns,
          };
        });

        resolve(sheets);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};

export const convertToCSV = (data: string[][]): string => {
  return data
    .map((row) =>
      row
        .map((cell) => {
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join(",")
    )
    .join("\n");
};

export const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
