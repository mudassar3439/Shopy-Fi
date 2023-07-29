import React,{ createContext,useContext,useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth";
import {getFirestore ,collection,addDoc,getDocs,doc,getDoc,query,where,deleteDoc } from 'firebase/firestore';
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyCQVXQ10DkH_zkeG5vJ_vJhVrD6PnsTrfs",
    authDomain: "shopyfiy.firebaseapp.com",
    projectId: "shopyfiy",
    storageBucket: "shopyfiy.appspot.com",
    messagingSenderId: "1008269944523",
    appId: "1:1008269944523:web:e54830233cedaf7d969d4e"
  };
  export const App = initializeApp(firebaseConfig);
  const context=createContext(null);
  

//   instance
const Auth=getAuth(App);
const GoogleProvider =new GoogleAuthProvider(App);
const firestore=getFirestore(App);
const storage =getStorage(App);

// useContext Hook
export const useFirebase=()=>useContext(context)


// Provider  

export const Provider=(props)=>{

       // state Hook 
       const [user, setuser] = useState();

       // For checking if the user is logged in
       useEffect(() => {
         const storedUser = localStorage.getItem('user');
         if (storedUser) {
           setuser(JSON.parse(storedUser));
         } else {
           setuser(null);
         }
         onAuthStateChanged(Auth, (user) => {
           if (user) {
             setuser(user);
             localStorage.setItem('user', JSON.stringify(user));
           } else {
             setuser(null);
             localStorage.removeItem('user');
           }
         });
       }, []);
       
       // Variable
       const logedin = user ? true : false;
      const notloged = user ? false : true;
       


// Signup With Email And Password
 const Signup=(email,password)=>{
    createUserWithEmailAndPassword(Auth,email,password)
    .then((value)=>alert('Sign-up Successfully'))
    .catch((error)=>alert('Sign-up Failed. try again!'))
 }
    // Signin With Email And Password
 const Signin=(email,password)=>{
    signInWithEmailAndPassword(Auth,email,password)
    .then((value)=>alert('Sign-in Successfully'))
    .catch((error)=>alert('Error - Sign-in Failed. try again!')) 
 }
    // Sign-In With Google
   const google =()=>{
    signInWithPopup(Auth,GoogleProvider)
    .then((value)=>alert("Log-in Successfully"));
   }
   //Function For Add product at Firetore 
   const Add = async (productName, isbn, price, pic, detail,username,phone) => {
    const imgRef = ref(storage, `uploads/images/${Date.now()}${pic.name}`);
    const result = await uploadBytes(imgRef, pic);
  
    return addDoc(collection(firestore, 'products'), {
      username,
      productName,
      isbn,
      price,
      imageURL: result.ref.fullPath,
      detail,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName || "", // Check if displayName exists, otherwise set it as an empty string
      photoURL: user.photoURL,
      phone
    })
    
      .then(() => alert("Product added successfully"))
      .catch((error) =>alert(error));
  };
    // Function For Getting All Product From Firestore
    const allProducts=()=>{
      return getDocs(collection(firestore,'products'))
    }
    //Function For Getting Images Path from Firebase Storage 
    const getimgURL=(path)=>{
      return getDownloadURL(ref(storage,path))
    }

    // Function For Detail Page getting Data from firestore 
    const Sproduct = async (id) => {
      const docRef = doc(firestore, 'products', id);
      const result = await getDoc(docRef);
      return result;
    };

    // Function for place order
    const order = async (productId, name, phone, email, state, city, address) => {
      const collectionRef = collection(
        firestore,
        'products',
        productId,
        'orders'
      );
      const result = await addDoc(collectionRef, {
        name,
        phone,
        email,
        state,
        city,
        address
      });
      return result;
    };
    
// Function for FetchProducts For Orders page
  const Fetchproduct=async(userId)=>{
    
    const collectionRef=collection(firestore,'products');
    const q=query(collectionRef,where('userId','==',userId))
    const result=await getDocs(q);
    return result;
  }
// Function for getting orders from firestore for show orders
  const fetchOrders = async (productId) => {
    try {
      const collectionRef = collection(firestore, 'products', productId, 'orders');
      const querySnapshot = await getDocs(collectionRef);
    
      const orders = querySnapshot.docs.map((doc) => doc.data());
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };
  // For the Deletion of a Product
  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(firestore, 'products', productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  
  

   return(
    <>
        <context.Provider value={{
          Signup,
          Signin,
          google,
          logedin,
          notloged,
          Add,
          allProducts,
          Sproduct,
          getimgURL,
          order,
          Fetchproduct,
          user,
          fetchOrders,
          deleteProduct}}>
            {props.children}
        </context.Provider>
    </>
   )
  }