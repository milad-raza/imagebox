import React from "react";
// import useFirestore from '../hooks/useFirestore';
import { database, auth } from "../firebase/config";

import { motion } from "framer-motion";

const ImageGrid = ({ setSelectedImg }) => {
  // const { docs } = useFirestore('images');
  const [username, setUsername] = React.useState(null);
  const [docs, setDocs] = React.useState([]);
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var uid = user.uid;
      setUsername(uid);
    }
  });

  

  React.useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
         const datab = database.ref("users/" + username);
         datab.on("value", function (snapshot) {
           setDocs([]);
           snapshot.forEach(function (childSnapshot) {
             let data = childSnapshot.val();
             setDocs((docs) => [...docs, data]);
           });
         });
      }
    });
   
  }, [username]);


  return (
    <div className="img-grid">
      {docs.map((doc, index) => (
        <motion.div
          key={index}
          className="img-wrap"
          layout
          whileHover={{ opacity: 1 }}
          s
          onClick={() => setSelectedImg(doc.url)}
        >
          <motion.img
            src={doc.url}
            alt="Image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
