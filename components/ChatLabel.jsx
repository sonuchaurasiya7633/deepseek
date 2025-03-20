import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const ChatLabel = ({ openMenu, setOpenMenu }) => {
  return (
    <div className="group relative flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg cursor-pointer">
      <p className="truncate">Chat Name Here</p>
      
      {/* Three Dots - Hidden by Default, Show on Hover */}
      <div
        className="relative flex items-center justify-center h-6 w-6 aspect-square rounded-lg"
        onClick={() => {
          setOpenMenu((prev) => ({ ...prev, open: !prev.open }));
        }}
      >
        <Image
          src={assets.three_dots}
          alt="Options"
          className="w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />

        {/* Dropdown Menu */}
        <div
          className={`absolute ${openMenu.open ? 'block' : 'hidden'} 
          -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}
        >
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <Image src={assets.pencil_icon} alt="Rename Icon" className="w-4" />
            <p>Rename</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <Image src={assets.delete_icon} alt="Delete Icon" className="w-4" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
