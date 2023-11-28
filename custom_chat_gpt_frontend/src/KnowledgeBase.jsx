import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as pdfjs from 'pdfjs-dist';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Use Axios for API requests
import Airtable from 'airtable';

const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');

const KnowledgeBase = ( {handleLogout} ) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate
  
  const navigateToHome = () => {
    handleLogout();
    navigate('/');
  };
  
  const handleFileSelect = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFileChange(); // Initiate file reading process
  };
  
  const addEmbedding = (text, embedding) => {
    var base = new Airtable({apiKey: '<CUD_API_KEY_GOES_HERE>'}).base('<BASE_ID_GOES_HERE>');
    base('Likhit Gatagat Embeddings').create([
      {
        "fields": {
          "Text": text,
          "Embedding": embedding
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });
  }

  const handleFileChange = () => {
    setIsLoading(true);
    selectedFiles.forEach((file) => {
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const typedArray = new Uint8Array(event.target.result);
          pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
          const pdf = await pdfjs.getDocument({ data: typedArray }).promise;

          const numPages = pdf.numPages;
          let fullText = '';

          for (let j = 1; j <= numPages; j++) {
            const page = await pdf.getPage(j);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((s) => s.str).join(' ');
            fullText += pageText + '\n';
          }

          try {
            const response = await axios.post('https://api.openai.com/v1/embeddings', {
              input: fullText,
              model: "text-embedding-ada-002"
            }, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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', // Replace with your API key
              },
            });
            const generatedEmbeddings = response.data.data[0].embedding;
            addEmbedding(fullText, '[' + generatedEmbeddings.join(', ') + ']');
            console.log('Embeddings:', generatedEmbeddings);
          } catch (error) {
            console.error('Error fetching embeddings:', error);
          }
          console.log(`Text extracted from ${file.name}:`);
          console.log(fullText);
        };

        reader.readAsArrayBuffer(file);
      } else {
        console.error(`File ${file.name} is not a PDF.`);
      }
    });
    setIsLoading(false);
    toast.success('Embedding Processing completed!');
  };

  return (
    <div>
      <h2>Upload Data to the Knowledge Base</h2>
      <form onSubmit={handleSubmit}>
        <input style={{ background: 'lightgreen', padding: '10px', fontSize: '24px', marginRight: '10px' }} type="file" accept="application/pdf" multiple onChange={handleFileSelect} />
        <button style={buttonStyle} type="submit">Submit</button>
        <button onClick={navigateToHome} style={buttonStyle}>Log out</button>
      </form>
      {isLoading && <div>Loading...</div>}
      <ToastContainer />
    </div>
  );
};

const buttonStyle = {
  padding: '12px 20px',
  fontSize: '24px',
  textDecoration: 'none',
  color: 'white',
  background: 'green',
  borderRadius: '8px',
  margin: '0 10px',
};

export default KnowledgeBase;