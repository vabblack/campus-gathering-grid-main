import React from 'react';

const HomePage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-600"> 
      <script>
        tailwind.config = {
          theme: {
            extend: {
              keyframes: {
                quacke: {
                  '0%, 100%': { transform: 'rotate(-3deg)' },
                  '50%': { transform: 'rotate(3deg)' }
                }
              },
              animation: {
                quacke: 'quacke .3s ease-in-out infinite',
              }
            }
          }
        }
      </script>
      <div className="relative max-w-12 focus-within:max-w-full transition-[max-width] ease-in-out duration-300">
        <input className="block w-full border-none outline-none rounded-full p-[12px] px-4 text-base placeholder:text-transparent focus:placeholder:text-gray-500" placeholder="Search..."/>
        <i className="fa fa-search absolute top-1/2 right-6 -translate-y-1/2 translate-x-1/2 pointer-events-none"></i>
      </div>
    </div>
  );
};

export default HomePage; 