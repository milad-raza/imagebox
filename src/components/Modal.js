import React from 'react';
import { motion } from 'framer-motion';
import { IconButton } from "@chakra-ui/react"
import { GrFormClose } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import {projectStorage,database,auth} from '../firebase/config'


const Modal = ({ setSelectedImg, selectedImg }) => {

  const [user, setUser] = React.useState(null);
  auth.onAuthStateChanged(function (user) {
    if (user) {
      var uid = user.uid;
      setUser(uid);
    }
  });

  const handleClick = (e) => {
      setSelectedImg(null);
  }
  const handleClickDel = (e) => {
    const dbr = database.ref(`users/${user}`)
    dbr.orderByChild('url').equalTo(selectedImg)
      .once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let nodekey = childSnapshot.key;
        dbr.child(nodekey).remove();
      });
    });
      
    let imageRef = projectStorage.refFromURL(selectedImg);
    imageRef.delete().then(() => {
    console.log("Deleted")
    }).catch(err => console.log(err))
      setSelectedImg(null);

  }

  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <IconButton
        onClick={handleClick}
        aria-label="Exit"
        icon={<GrFormClose />}
        isRound="true"
        size="large"
      />
      <IconButton
        onClick={handleClickDel}
        aria-label="Exit"
        icon={<AiOutlineDelete />}
        isRound="true"
        size="large"
      />

      <motion.img
        src={selectedImg}
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  );
}

export default Modal;