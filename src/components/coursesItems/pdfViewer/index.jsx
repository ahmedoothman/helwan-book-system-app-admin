// react
import React, { Fragment, useEffect, useState } from 'react';
// styles
import styles from './index.module.scss';
// libs
import pdfjs from 'pdfjs-dist/build/pdf';
//convert pdf to images
async function convertPdfToImages(pdfUrl) {
  const loadingTask = pdfjs.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;
  const images = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 }); // Adjust scale as needed
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport,
    };

    await page.render(renderContext).promise;

    images.push(canvas.toDataURL());
  }

  return images;
}
/***************************************************************************/
/* Name : PDFViewer React Component */
/***************************************************************************/
const PDFViewer = React.memo(({ url }) => {
  const [images, setImages] = useState([]);
  /******************************************************************/
  /* useEffect */
  /******************************************************************/
  useEffect(() => {
    (async () => {
      const pdfUrl = url; // Replace with your PDF URL or path

      const loadPdf = async () => {
        try {
          const imagesData = await convertPdfToImages(pdfUrl);
          setImages(imagesData);
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };

      loadPdf();
    })();
  }, []);

  /******************************************************************/
  /* functions */
  /******************************************************************/
  return (
    <Fragment>
      <div>
        {images.map((imageData, index) => (
          <img key={index} src={imageData} alt={`Page ${index + 1}`} />
        ))}
      </div>
    </Fragment>
  );
});

export { PDFViewer };
