import { pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.entry";
import { readFileArrayBuffer } from ".";

export const processPDF = async (file: File): Promise<object> =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    const fileName = file.name;
    fr.onload = async () => {
      const result = fr.result as string;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      getDocument({ data: result })
        .promise.then(async (uploadedPdf: any) => {
          const pdfBlob = new Blob([result], { type: "application/pdf" });
          const pdfTextContent = await pdfBlob.text();
          if (pdfTextContent.includes("Encrypt"))
            return resolve({ message: "encrypted", valid: false });
          return await uploadedPdf.getMetadata().then((metadata: any) => {
            if (metadata.info?.IsAcroFormPresent) {
              return resolve({ message: "editable", valid: false });
            }

            return uploadedPdf
              .getAttachments()
              .then(async (attachment: any) => {
                if (attachment && Object.keys(attachment).length != 0)
                  return resolve({
                    title: metadata.info?.Title,
                    hasAttachement: true,
                    valid: false,
                  });

                for (let index = 1; index <= uploadedPdf.numPages; index++) {
                  let data = await uploadedPdf.getPage(index);
                  let annotations = await data.getAnnotations();
                  if (
                    annotations.filter(
                      (anno: any) => anno.subtype === "FileAttachment"
                    ).length
                  )
                    return resolve({
                      title: metadata.info?.Title,
                      hasAttachement: true,
                      valid: false,
                    });
                }
                try {
                  const pdfBuffer = await readFileArrayBuffer(file);
                  await PDFDocument.load(pdfBuffer);
                } catch (e) {
                  console.log("error", e);
                  throw new Error("password");
                }
                return resolve({
                  title: metadata.info?.Title,
                  hasAttachement: false,
                  valid: true,
                });
              });
          });
        })
        .catch((e: any) => {
          console.log("erorr", e);
          // if (e?.name === "PasswordException") {
          //   window.alert(
          //     `${fileName} file is password encrypted! Please upload an unencrypted PDF file.`
          //   );
          //   return resolve({ inValid: false });
          // }

          if (e.message.includes("password"))
            return resolve({ message: "encrypted", valid: false });

          return resolve({ valid: false });
        });
    };

    fr.readAsArrayBuffer(file);
  });
