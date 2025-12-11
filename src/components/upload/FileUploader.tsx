import { useCallback } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const FileUploader = ({ onFileSelect, isLoading }: FileUploaderProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="relative border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-12 transition-all duration-300 bg-card hover:bg-accent/30 cursor-pointer group"
    >
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isLoading}
      />
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-4 rounded-full bg-accent group-hover:bg-primary/10 transition-colors duration-300">
          {isLoading ? (
            <FileSpreadsheet className="w-10 h-10 text-primary animate-pulse" />
          ) : (
            <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">
            {isLoading ? "Processing..." : "Drop your Excel file here"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to browse (.xlsx, .xls)
          </p>
        </div>
      </div>
    </div>
  );
};
