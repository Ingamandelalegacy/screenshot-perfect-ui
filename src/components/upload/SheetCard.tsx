import { Download, Table, Rows3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SheetCardProps {
  sheetName: string;
  rowCount: number;
  columnCount: number;
  preview: string[][];
  onDownload: () => void;
  index: number;
}

export const SheetCard = ({
  sheetName,
  rowCount,
  columnCount,
  preview,
  onDownload,
  index,
}: SheetCardProps) => {
  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent">
              <Table className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {sheetName}
              </h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                <span className="flex items-center gap-1">
                  <Rows3 className="w-3.5 h-3.5" />
                  {rowCount} rows
                </span>
                <span>•</span>
                <span>{columnCount} columns</span>
              </div>
            </div>
          </div>
          <Button
            onClick={onDownload}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CSV
          </Button>
        </div>
      </div>

      <div className="p-4 bg-secondary/30">
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
          Preview
        </p>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                {preview[0]?.map((header, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-left font-medium text-foreground whitespace-nowrap border-b border-border"
                  >
                    {header || `Column ${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.slice(1, 4).map((row, i) => (
                <tr key={i} className="hover:bg-accent/30 transition-colors">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-3 py-2 text-muted-foreground whitespace-nowrap border-b border-border last:border-b-0"
                    >
                      {cell || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
