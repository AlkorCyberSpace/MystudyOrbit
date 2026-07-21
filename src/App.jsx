import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import logo from './assets/logo.jpeg';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
         access_key:"9cdcec0e-4637-4e1d-8973-97d0f8448ad4",
        email: email,
        subject: "New Subscription from MyStudyOrbit!",
      };
      console.log("Sending payload:", payload);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-300/40 blur-[120px] rounded-full mix-blend-multiply animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-[-1%] right-[-10%] w-[40%] h-[40%] bg-blue-300/30 blur-[120px] rounded-full mix-blend-multiply animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      
      <div className="z-10 w-full max-w-3xl px-6 pt-2 flex flex-col items-center text-center">
        
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-0 md:-mb-2"
        >
          <div className="w-40 md:w-60 mx-auto relative group">
            <img 
              src={logo} 
              alt="MyStudyOrbit Logo" 
              className="w-full h-auto object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-xl md:text-6xl font-bold tracking-tight mb-4">
            We're Launching <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">Soon!</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto mb-20 md:mb-10 leading-relaxed ">
           A global online tuition platform dedicated to helping students achieve academic success through personalized one-to-one learning.
          </p>
        </motion.div>

        {/* Subscription Form (Glassmorphism) */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-green-50 text-green-700 border border-green-200 rounded-full p-4 flex items-center justify-center gap-2 shadow-lg shadow-green-100"
          >
            <CheckCircle2 size={24} className="text-green-500" />
            <p className="font-medium">Thank you! We'll notify you when we launch.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-md relative flex items-center bg-white/80 border border-slate-200 rounded-full p-2 backdrop-blur-md shadow-xl shadow-slate-200/50"
            onSubmit={handleSubmit}
          >
            <div className="pl-4 pr-3 text-slate-400">
              <Mail size={20} />
            </div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 py-3"
              required
              disabled={isSubmitting}
            />
            <motion.button 
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className={`bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/30 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Notify Me'} {!isSubmitting && <ArrowRight size={18} />}
            </motion.button>
          </motion.form>
        )}

        {/* Social Links */}
        {/* <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 flex gap-6 text-slate-400"
        >
          <a href="#" className="hover:text-purple-500 transition-colors duration-300 hover:scale-110 transform"><FaTwitter size={24} /></a>
          <a href="#" className="hover:text-pink-500 transition-colors duration-300 hover:scale-110 transform"><FaInstagram size={24} /></a>
          <a href="#" className="hover:text-blue-500 transition-colors duration-300 hover:scale-110 transform"><FaLinkedin size={24} /></a>
        </motion.div> */}
        
      </div>
    </div>
  );
}

export default App;
