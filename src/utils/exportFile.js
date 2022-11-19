import XLSX from 'xlsx';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


export const exportExcel = (tableEl, sheetName, fileName) => {
  const table = tableEl.cloneNode(true);
  table.deleteRow(1);
  const wb = XLSX.utils.table_to_book(table, { sheet: sheetName });
  XLSX.writeFile(wb, `${fileName}.xlsx`,
    {
      cellStyles: true,
      skipEmptyLines: true,
      skipEmptyCols: true,
      trim: true,
    }
  );
}



export const exportPdf = async (table, fileName = "products") => {
  const canvas = await html2canvas(table, { scale: 1 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "JPEG", 0, 0);
  // pdf.output('dataurlnewwindow');
  pdf.save(`${fileName}_export_${new Date().getTime()}.pdf`);
}