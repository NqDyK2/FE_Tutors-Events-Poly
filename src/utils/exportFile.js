import XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';


export const exportExcel = (el, sheetName, fileName) => {
  const table = el.cloneNode(true);
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
  const pdfPrint = html2pdf();
  const options = {
    filename: `${fileName}.pdf`,
    image: {
      type: "jpeg", quality: 1,
    },
    jsPDF: {
      unit: "in", format: "a4", orientation: "portrait",
    },
    html2canvas: {
      scale: 4, letterRendering: true,
    },
  };
  pdfPrint.from(table).set(options).save();


}