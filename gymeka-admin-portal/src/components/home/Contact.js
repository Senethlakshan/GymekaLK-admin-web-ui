import React from 'react';


function Contact() {
  return (
    <div className='bg-gray-300 min-h-screen'>
     
      {/* Contact Details */}
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-4'>Contact Details</h2>
        <p className='text-lg'>
          If you have any questions or inquiries, feel free to reach out to us using the contact
          details provided below:
        </p>
        <ul className='mt-4'>
          <li className='flex items-center mb-2'>
            <svg
              className='w-6 h-6 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
              />
            </svg>
            <span>123 Main Street, City, Country</span>
          </li>
          <li className='flex items-center mb-2'>
            <svg
              className='w-6 h-6 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
              />
            </svg>
            <span>+1 234 567 890</span>
          </li>
          <li className='flex items-center mb-2'>
            <svg
              className='w-6 h-6 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
              />
            </svg>
            <span>info@gymekalk.com</span>
          </li>
        </ul>
      </div>
      {/* CHATBOT COMPONENTS */}
      <div>
      
      </div>

      
    
     
    </div>
  );
}

export default Contact;
