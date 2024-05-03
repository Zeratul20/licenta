import { PDFDocument } from "pdf-lib";
import { getDocument } from "pdfjs-dist";
import { juicefy } from "../../../src/services/template-renderer-source/helpers/juicefy";
// import { templateFactory } from "../../services/template-renderer-source/page1/template/activityLogFactory";
// import { templateStyle } from "../../services/template-renderer-source/page1/template/PdfTemplateStyles";

export const readFileArrayBuffer = (file: File): Promise<ArrayBuffer> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  });

declare var html2pdf: any;

const getPDFBuffer = (templateHtml: string) => {
  const div = document.createElement("div");
  div.innerHTML = templateHtml;
  document.body.appendChild(div);

  const opts = {
    margin: [5, 13, 0, 0],
    filename: "Försäkringsskada",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      backgroundColor: "#fff",
      scale: 2,
      y: 0,
      x: 0,
      scrollY: 0,
      scrollX: 0,
      windowWidth: 600,
    },
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      html2pdf()
        .from(div)
        .set(opts)
        .outputPdf("blob")
        .then((fileBlob: any) => {
          div.remove();
          resolve(
            new File([fileBlob], "Försäkringsskada.pdf", {
              type: "application/pdf",
            })
          );
        });
    }, 100);
  });
};

export const generatePDF = async (
  data: any,
  type: string,
  generalData: any
) => {
  let formatedTemplate = ``;

  const {
    templateFactory,
  } = require(`../../services/template-renderer-source/schedule/template/factory`);
  const {
    templateStyle,
  } = require(`../../services/template-renderer-source/schedule/template/PdfTemplateStyles`);
  const template = templateFactory();
  let activityTemplate = template.body({
    data,
    type,
    generalData,
  });

  if (activityTemplate) {
    formatedTemplate = await juicefy(activityTemplate, templateStyle);
  }

  const pdfFile = await getPDFBuffer(formatedTemplate).then(
    (pdfData: any) => pdfData
  );

  let pdfData = await readFileArrayBuffer(pdfFile);
  // Delete the first page of the pdf
  const pdfDoc = await PDFDocument.load(pdfData);
  // pdfDoc.removePage(0);
  pdfData = await pdfDoc.save();
  return pdfData;
};

export const isPasswordProtected = async (file: File) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const result = fr.result as string;
      if (result.includes("Encrypt")) resolve(true);
      else resolve(false);
    };
    fr.readAsText(file);
  });
};

export const isEditable = async (file: File) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const result = fr.result as string;
      getDocument({ data: result }).promise.then(async (uploadedPdf: any) => {
        const pdfBlob = new Blob([result], { type: "application/pdf" });
        const pdfTextContent = await pdfBlob.text();
        if (pdfTextContent.includes("Encrypt")) return resolve(true);
        return uploadedPdf.getMetadata().then((metadata: any) => {
          if (metadata.info?.IsAcroFormPresent) {
            return resolve(true);
          }
          return resolve(false);
        });
      });
    };
    fr.readAsArrayBuffer(file);
  });
};
