"use client";
import { useEffect, useState } from 'react';

export default function DayOrderBar() {
  const [dayText, setDayText] = useState("...");
  const [dateStr, setDateStr] = useState("Loading Date...");

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
    
    // Format Date string: DD/MM/YYYY - DayName
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + " - " + today.toLocaleDateString('en-US', { weekday: 'long' });
    
    setDateStr(formattedDate);

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setDayText("Holiday");
    } else {
      // Calculate day order based on working days from a fixed start date.
      // July 27, 2026 is a Monday. We'll set this date as Day Order 6 to match your screenshot.
      const startDate = new Date('2026-07-27T00:00:00'); 
      const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      const msPerDay = 1000 * 60 * 60 * 24;
      const daysDiff = Math.floor((todayZero.getTime() - startDate.getTime()) / msPerDay);
      
      let workingDays = 5; // Starting offset (5 means the next working day, 27/07, becomes day order 6)
      
      if (daysDiff >= 0) {
        for (let i = 0; i <= daysDiff; i++) {
          const d = new Date(startDate.getTime() + i * msPerDay);
          if (d.getDay() !== 0 && d.getDay() !== 6) {
            workingDays++;
          }
        }
      } else {
        // Fallback for days before the start date (not strictly needed but good for safety)
        workingDays = 6; 
      }
      
      const dayOrder = ((workingDays - 1) % 6) + 1;
      setDayText(dayOrder.toString());
    }
  }, []);

  return (
    <div className="bg-[#f5f3ef] py-3 border-t border-b border-gray-200 mt-auto w-full">
      <div className="max-w-[1400px] mx-auto px-4 flex flex-wrap justify-start items-center gap-3 md:gap-4 text-sm md:text-base font-bold text-[#1a2b54] tracking-wide">
        <span>Today's Day Order</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a2b54]">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span className="text-lg text-blue-700">{dayText}</span>
        <span className="text-gray-400 font-light text-lg mx-1">|</span>
        <span>{dateStr}</span>
      </div>
    </div>
  );
}
