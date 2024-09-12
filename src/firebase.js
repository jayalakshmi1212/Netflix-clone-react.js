
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyCkA81hkDz7yrXAhEUvGpl6Gv9TixUrOzQ",
  authDomain: "netflix-clone-490bd.firebaseapp.com",
  projectId: "netflix-clone-490bd",
  storageBucket: "netflix-clone-490bd.appspot.com",
  messagingSenderId: "245363065773",
  appId: "1:245363065773:web:7f249d7f48ecc894795724"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
   try{
      const res=await createUserWithEmailAndPassword(auth,email,password)
      const user= res.user;
      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,

      })
   }catch(error){
     console.log(error)
     toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}


const login =async(email,password)=>{
     try{
       await signInWithEmailAndPassword(auth,email,password);
     }catch(error){
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}