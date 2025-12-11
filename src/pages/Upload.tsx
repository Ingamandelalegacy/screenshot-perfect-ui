import { useState } from "react";
import { FileUploader } from "@/components/upload/FileUploader";
import { SheetCard } from "@/components/upload/SheetCard";
import { parseExcelFile, convertToCSV, downloadCSV, ParsedSheet } from "@/lib/excelUtils";
import { useToast } from "@/hooks/use-toast";
import { FileSpreadsheet } from "lucide-react";

const Upload = () => {
  const [sheets, setSheets] = useState<ParsedSheet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setFileName(file.name);

    try {
      const parsedSheets = await parseExcelFile(file);
      setSheets(parsedSheets);
      toast({
        title: "File processed successfully",
        description: `Found ${parsedSheets.length} sheet(s) in ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "Please make sure you uploaded a valid Excel file.",
        variant: "destructive",
      });
      setSheets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (sheet: ParsedSheet) => {
    const csv = convertToCSV(sheet.data);
    downloadCSV(csv, sheet.name);
    toast({
      title: "Download started",
      description: `${sheet.name}.csv is being downloaded.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Excel Files</h1>
        <p className="text-muted-foreground mt-1">
          Upload your Excel files to share data with the application
        </p>
      </div>

      {/* File Uploader */}
      <FileUploader onFileSelect={handleFileSelect} isLoading={isLoading} />

      {/* Results */}
      {sheets.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              {fileName}
            </h2>
            <span className="text-sm text-muted-foreground">
              ({sheets.length} sheet{sheets.length > 1 ? "s" : ""})
            </span>
          </div>

          <div className="grid gap-6">
            {sheets.map((sheet, index) => (
              <SheetCard
                key={sheet.name}
                sheetName={sheet.name}
                rowCount={sheet.rowCount}
                columnCount={sheet.columnCount}
                preview={sheet.data.slice(0, 4)}
                onDownload={() => handleDownload(sheet)}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
