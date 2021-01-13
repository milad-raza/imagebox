import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import {auth} from '../firebase/config'
const UploadForm = () => {
auth.onAuthStateChanged(function (user) {
    if (user) {
      var uid = user.uid;
      setUser(uid)
    }
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const check = () => {
    if (user === null) {
      alert("You Must Login First");
    }
  }

  const handleChange = (e) => {
    for(var i = 0; i < e.target.files.length; ++i){
      let selected = e.target.files[i];
    

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file.');
    }
  }
  };

  return (
    //onClick={() => user ? "" : }
    <form>
      <label>
        {" "}
        <input type="file" onChange={handleChange} onClick={()=>{check()}} /> Upload
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} user={user} />}
      </div>
    </form>
  );
}

export default UploadForm;