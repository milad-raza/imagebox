import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp, database} from '../firebase/config';
// import { auth } from "../firebase/config";

const useStorage = (file, user) => {
  
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(user + file.name);
    const collectionRef = projectFirestore.collection('images');
    
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      await collectionRef.add({ url, createdAt });
        setUrl(url);
        
      if (url !== null && user !== null) {
        console.log(url);
        function writeUserData() {
          database
            .ref("users/" + user)
            .push({
              url : url
            });
        }
        writeUserData();
      }
    });
  }, [file]);

  return { progress, url, user, error };
}

export default useStorage;