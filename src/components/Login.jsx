import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../Auth/client';
import { signInWithEmail, signOutUser, signUpNewuser } from '../Auth/auth';
function Login() {

//   const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     supabase.auth.getSession()
//     .then(({ data : {session}}) => {
//       setSession(session);
//       setLoading(false)
//     })

//     const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
//       setSession(session);
//       setLoading(false)
//     })

//     return () => subscription.unsubscribe();
//   },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("")
    setLoading(true)
    if(isSignUp){
      const res = await signUpNewuser(email, password);
      setEmail("")
      setPassword("")
      if(!res.success) setMessage(res.error)
    } else {
      const res = await signInWithEmail(email, password)
      setEmail("")
      setPassword("")
      if(!res.success) setMessage(res.error)
    }
    setLoading(false)
  }

//     if(session){
//     return(
//       <>
//         <div className='p-8 max-w-md mx-auto text-center'> 
//           <h2 className='text-xl font-bold mb-4'>Welcome, {session.user.email} </h2>
//           <button
//           onClick={signOutUser}
//           className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
//           > 
//           {loading ? (
//               <>
//                 <svg
//                 className='animate-spin h-5 w-5 text-white border-2 border-white/30 border-t-white rounded-full'
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 >
//                   <circle
//                   className='opacity-25'
//                   cx={12}
//                   cy={12}
//                   r={10}
//                   stroke='currentColor'
//                   strokeWidth={4}
//                   ></circle>
//                   <path
//                   className='opacity-75'
//                   fill='currentColor'
//                   path='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
//                   ></path>
//                 </svg>
//                 <span>Processing ... </span>
//               </>
//             ) : "Sign Out"}
//           </button>
//         </div>
//       </>
//     )
//   }

  return (
    <>
      <div className='p-8 max-w-md mx-auto border-lg shadow-lg mt-10'>

        <h2 className='text-2xl font-bold mb-6 text-center'>
          {isSignUp ? "Create an Account" : "Log In" }
        </h2>

        {message && <p className='text-sm text-red-500 mb-4'> {message} </p>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input 
          type="text" 
          placeholder='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='p-2 border rounded'
          />

          <input 
          type="password"   
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='p-2 border rounded'
          />

          <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 py-2 text-white rounded font-semibold flex flex-col items-center justify-center disabled:opacity-60 cursor-pointer '>
            {loading ? (
              <>
                <svg
                className='animate-spin h-5 w-5 text-white border-2 border-white/30 border-t-white rounded-full'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                >
                  <circle
                  className='opacity-25'
                  cx={12}
                  cy={12}
                  r={10}
                  stroke='currentColor'
                  strokeWidth={4}
                  ></circle>
                  <path
                  className='opacity-75'
                  fill='currentColor'
                  path='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                <span>Processing ... </span>
              </>
            ) : isSignUp  ? ( "Sign Up" ) : ( "Sign In" )}
          </button>
        </form>

        <p className='mt-4 text-sm text-center'>
          {isSignUp ? "Already have an Account " : "Don't have an Account "}
          <button
          onClick={() => {
            setIsSignUp(!isSignUp)
            setEmail('')
            setPassword('')
          }}
          className='text-blue-400 underline font-medium hover:text-blue-700'
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </>
  )
}

export default Login