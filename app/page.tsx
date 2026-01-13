'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
   const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  }
  

  return (
    <div className='bg-green-500 w-screen h-screen'>
        <div className='flex justify-center text-2xl font-semibold font-sans pt-12'>Welcome to the Clase Vibra Picker</div>
        <div className='flex pt-6'>
          <label className='mx-auto grid object-center'>
            <span className='mx-auto'> Class Type and Energy Level: </span>
            <select value={selectedValue} onChange={handleChange} className='p-2 rounded-md'>
              <option value="" disabled>Select an option</option>
              <optgroup label="Yoga">
                <option value="yoga-suave">Suave</option>
                <option value="yoga-grounded">Grounded</option>
              </optgroup>
              <optgroup label="Pilates">
                <option value="pilates-grounded">Grounded</option>
                <option value="pilates-empowered">Empowered</option>
              </optgroup>
              <optgroup label="Strength">
                <option value="strength-empowered">Empowered</option>
                <option value="strength-full-fuego">Full Fuego</option>
              </optgroup>
              <optgroup label="Dance Cardio">
                <option value="dance-cardio-perreo-light">Perreo Light</option>
                <option value="dance-cardio-full-fuego">Full Fuego</option>
              </optgroup>
              <optgroup label="Stretching">
                <option value="stretching-suave">Suave</option>
                <option value="stretching-grounded">Grounded</option>
              </optgroup>
            </select>
          </label>
          <label className='mx-auto grid object-center'>
            <span className='mx-auto'> Duration: </span>
            <select value={selectedValue} onChange={handleChange} className='p-2 rounded-md'>
              <option value="" disabled>Select an option</option>
              <option value="vibra1">30 minutes</option>
              <option value="vibra2">45 minutes</option>
              <option value="vibra3">60 minutes</option>
            </select>
          </label>
        </div>
        <div>
          <button className='bg-black text-white px-4 py-2 rounded-full mt-8 mx-auto block transition-colors font-semibold hover:bg-gray-800'>Generate Playlist</button>
        </div>
    </div>
  )
};
