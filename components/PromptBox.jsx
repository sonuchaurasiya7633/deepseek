import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PromptBox = ({ setIsLoading, isLoading, expand }) => {
  const [prompt, setPrompt] = useState('');

  return (
    <form
      className={`w-full ${expand ? "max-w-3xl" : "max-w-2xl"} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
      onSubmit={(e) => {
        e.preventDefault();
        if (prompt) {
          setIsLoading(true);
          console.log("Prompt submitted:", prompt);
        }
      }}
    >
      <textarea
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
        rows={2}
        placeholder="Message DeepSeek"
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={assets.deepthink_icon} alt="DeepThink Icon" />
            DeepThink (R1)
          </p>
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={assets.search_icon} alt="Search Icon" />
            Search
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image className="w-4 cursor-pointer" src={assets.pin_icon} alt="Pin Icon" />
          <button
            type="submit"
            className={`${prompt ? "bg-primary" : "bg-[#71717a]"} rounded-full p-2 cursor-pointer`}
          >
            <Image
              className="w-3.5 aspect-square"
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt={prompt ? "Send Icon" : "Disabled Send Icon"}
            />
          </button>
        </div>
      </div>
    </form>
  );
};

PromptBox.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  expand: PropTypes.bool, 
};

export default PromptBox;
 