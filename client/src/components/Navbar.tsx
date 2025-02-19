import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';


const Navbar = () => {
 const [loginCheck, setLoginCheck] = useState(false);


 const checkLogin = () => {
   if (auth.loggedIn()) {
     setLoginCheck(true); 
   }
 };


 useEffect(() => {
   checkLogin(); 
 }, [loginCheck]); 


 return (
   <div className="display-flex justify-space-between align-center py-2 px-5 mint-green">
     <h1>
       PantryPal
     </h1>
     <div>
       <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/search">Search Recipes</Link></li> {/* Added Search Recipes link */}
       </ul>


       {
         !loginCheck ? (
           <>
             <button className="btn" type='button'>
               <Link to='/signup'>Sign Up</Link>
             </button>
             {' '}
             <button className="btn" type='button'>
               <Link to='/login'>Login</Link>
             </button>
           </>
         ) : (
           // Render logout button if user is logged in
           <button className="btn" type='button' onClick={() => {
             auth.logout(); 
           }}>Logout</button>
         )
       }
     </div>
   </div>
 )
}


export default Navbar;
