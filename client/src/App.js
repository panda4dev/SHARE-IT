import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();
  
/*https://postimg.cc/LqGh7w9v
https://postimg.cc/XBkJrvwD
https://postimg.cc/2q1V0rDV
https://postimg.cc/4YLYvnjD
https://postimg.cc/9wh0X9q7

*/

 const url1 = 'https://pbs.twimg.com/profile_images/1765372642700529664/fLFOaoeW_400x400.jpg'
  const url = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
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
       
      <div className='wrapper'>
        <h1>SHARE IT </h1>
        <p><mark>Upload  File and share the download link.</mark></p>
        
        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target='_blank'>{result}</a> 
      </div>
    </div>
  );
}

export default App;