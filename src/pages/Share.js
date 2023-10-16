import React, { useState } from 'react'
import { getFirestore , addDoc , serverTimestamp , collection , query , orderBy , limit , getDocs} from "firebase/firestore"
import { app } from "../firebase"

const firestore = getFirestore(app);

const Share = () => {
  const [message, setMessage] = useState("")

const writeData = async () => {
  const  result = await addDoc(collection(firestore,"user"),{
    code: code,
    message: message,
    timestamp: serverTimestamp(),
});
console.log("result",result);

}

const getDocumentByQuery = async () => {
  const collectionRef = collection(firestore , "user");
  const q = query( collectionRef , orderBy('timestamp','desc'), limit(1) );
  const getSnapshot = await getDocs( q );
  getSnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Last document data:', data);
      console.log(data.message);
      
      if (encode === data.code) {
          setText(`${data.message}`)
          
      } else {
          console.log("wrong");
      }
      console.log(data.code)
      
      
  });
  
  
};



  return (
    <div>
          <label>enter text here</label>
          <input type="text" placeholder='text here' onChange={(e)=>setMessage(e.target.value)} value={message} />
          <button onClick={writeData} >add data</button>
          <br />
          <label>enter code here</label>
            <input type="text" placeholder='text here' onChange={(e)=>setCode(e.target.value)} value={code} />
            <br />
            <label>enter en code here</label>
            <input type="text" placeholder='text here' onChange={(e)=>setEncode(e.target.value)} value={encode} />
        <button onClick={getDocumentByQuery}>read</button>
        <h1>Text</h1>
        <p>{text}</p>
    </div>
  )

}

export default Share