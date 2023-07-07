import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';import webbanner from '../../assests/aboutBanner.jpeg';
import p1 from '../../assests/page-1.jpeg';
import p2 from '../../assests/page-2.jpeg';
import p3 from '../../assests/page-3.jpeg';
import p4 from '../../assests/page-4.jpeg';


function About() {

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 ">
        <div className="text-center">
          <SyncLoader size={10} color="#00ff9f" />
          <p className='text-green-400 text-md mt-2'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 min-h-screen'>
      <div className='flex flex-wrap'>
        {/* Left Side */}
        <div className='w-full lg:w-1/2 p-8'>
          <h1 className='text-4xl font-bold mb-4 text-white'>About Us</h1>
          <p className='text-lg mb-4 text-white'>
            GymekaLk Fitness Hub is a leading fitness center dedicated to providing high-quality
            fitness training and a wide range of exercise options for individuals of all fitness
            levels. We are committed to helping our members achieve their fitness goals and lead a
            healthy lifestyle.
          </p>
          <p className='text-lg text-white'>
            Our state-of-the-art facilities, experienced trainers, and supportive community make
            GymekaLk Fitness Hub the perfect place to embark on your fitness journey. Whether you
            are a beginner or a seasoned athlete, we offer personalized training programs,
            group fitness classes, nutritional guidance, and much more to help you reach your
            full potential.
          </p>
        </div>

        {/* Right Side */}
        <div className='w-full lg:w-1/2 p-8 bg-black rounded-lg mt-4'>
          <img
            src={webbanner} 
            alt='GymekaLk Fitness Hub'
            className='w-full h-auto'
          />
        </div>
      </div>

      {/* Gym Management */}
      <div className='bg-gray-900  p-8 mt-8 mr-5 rounded-xl ml-5 '>
        <h2 className='text-3xl font-bold mb-4 text-green-400'>Gym Management</h2>
        <div className='flex flex-wrap'>
          {/* Team Member 1 */}
          <div className='w-full md:w-1/2 lg:w-1/4 p-4'>
            <img
             src={p1} 
              alt='Team Member 1'
              className='w-full h-auto mb-4 bg-fuchsia-900'
            />
            <h3 className='text-lg font-semibold text-green-600'>John Doe</h3>
            <p className='text-green-500'>Role: Manager</p>
          </div>

          {/* Team Member 2 */}
          <div className='w-full md:w-1/2 lg:w-1/4 p-4'>
            <img
              src={p2} 
              alt='Team Member 2'
              className='w-full h-auto mb-4'
            />
            <h3 className='text-lg font-semibold text-green-600'>Jane Smith</h3>
            <p className='text-green-500'>Role: Personal Trainer</p>
          </div>

          {/* Team Member 3 */}
          <div className='w-full md:w-1/2 lg:w-1/4 p-4'>
            <img
             src={p3} 
              alt='Team Member 3'
              className='w-full h-auto mb-4'
            />
            <h3 className='text-lg font-semibold text-green-600'>Alex Johnson</h3>
            <p className='text-green-500'>Role: Nutritionist</p>
          </div>

          {/* Team Member 4 */}
          <div className='w-full md:w-1/2 lg:w-1/4 p-4'>
            <img
              src={p4} 
              alt='Team Member 4'
              className='w-full h-auto mb-4'
            />
            <h3 className='text-lg font-semibold text-green-600'>Emily Wilson</h3>
            <p className='text-green-500'>Role: Yoga Instructor</p>
          </div>
        </div>
      </div>

      {/* Vision and Branches */}
      <div className='p-8 mt-8 bg-black'>
        <h2 className='text-3xl font-bold mb-4 text-white'>Vision and Branches</h2>
        <p className='text-lg mb-4 text-white'>
          Our vision at GymekaLk Fitness Hub is to inspire and empower individuals to prioritize
          their health and well-being through regular exercise and a balanced lifestyle. With our
          dedication to excellence, we aim to be the leading fitness provider in the region,
          offering multiple branches conveniently located in various cities.
        </p>
        <p className='text-lg text-white'>
          Currently, we have branches in Colombo, Kandy, and Galle, and we are continuously
          expanding to new locations to better serve our members' fitness needs.
        </p>
      </div>
    </div>
  );
}

export default About;
