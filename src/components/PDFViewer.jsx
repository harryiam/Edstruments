import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleRemove = () => {
    setPdfFile(null);
    setPreviewURL(null);
    setNumPages(null);
  };

  return (
    <div className="bg-white border border-dashed border-gray-400 rounded-xl p-6 flex flex-col items-center justify-center w-full min-h-[400px]">
      {!previewURL ? (
        <>
          <img
            src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
            alt="Upload"
            className="w-24 h-24 mb-4 opacity-80"
          />
          <h3 className="text-lg font-semibold mb-2 text-center">Upload Your Invoice</h3>
          <p className="text-gray-500 text-sm mb-4 text-center">
            To auto-populate fields and save time
          </p>
          <label className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-md text-sm">
            Upload File
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="mt-2 text-sm text-gray-400">Click to upload or drag and drop</p>
        </>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full border rounded-md overflow-auto">
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => console.error('PDF Load Error:', error)}
            >
              <Page pageNumber={1} />
            </Document>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-md text-sm"
              onClick={handleRemove}
            >
              Remove File
            </button>
            {numPages > 1 && (
              <span className="text-sm text-gray-500">
                Showing page 1 of {numPages}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
