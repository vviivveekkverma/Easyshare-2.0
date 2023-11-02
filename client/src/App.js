import { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { uploadFile } from './services/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const logoSrc = 'https://www.techrepublic.com/wp-content/uploads/2022/08/file-sharing-overload.jpeg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='container'>
      <img src={logoSrc} alt="banner" />
      <div className='wrapper'>
        <h1>Easy Share</h1>
        <h3>Upload your file and share the downloadable link.</h3>

        <button onClick={() => onUploadClick()}>Upload here</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Adjusted the link to trigger download */}
        {result && (
          <a href={result} download>Download File</a>
        )}
      </div>
    </div>
  );
}

export default App;
