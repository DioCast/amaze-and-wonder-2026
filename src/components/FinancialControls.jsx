import React from 'react';

export default function FinancialControls({
  quotedPrice, setQuotedPrice,
  agreedPrice, setAgreedPrice,
  depositRequired, setDepositRequired,
  isDepositSatisfiedChecked, setIsDepositSatisfied,
  paidBalance, setPaidBalance
}) {

  const remainingBalance = (parseFloat(agreedPrice) || 0) - (parseFloat(paidBalance) || 0);

  return (
    <div className="p-4 mb-6 bg-[#262626] border border-[#333] rounded-md shadow-sm">
      <h3 className="mb-4 text-xs font-bold text-white uppercase tracking-wider border-b border-[#444] pb-2">
        Financial Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Quoted Price */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Quoted Price</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 font-medium">$</span>
            <input
              type="number"
              value={quotedPrice}
              onChange={(e) => setQuotedPrice(e.target.value)}
              className="w-full py-2 pr-3 pl-7 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Agreed Price */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Agreed Price</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 font-medium">$</span>
            <input
              type="number"
              value={agreedPrice}
              onChange={(e) => setAgreedPrice(e.target.value)}
              className="w-full py-2 pr-3 pl-7 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Deposit Required Moved Up */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Deposit Required</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 font-medium">$</span>
            <input
              type="number"
              value={depositRequired}
              onChange={(e) => setDepositRequired(e.target.value)}
              className="w-full py-2 pr-3 pl-7 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Deposit Cleared Toggle Moved Up */}
        <div className="flex flex-col justify-center mt-4">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={isDepositSatisfiedChecked}
              onChange={(e) => setIsDepositSatisfied(e.target.checked)}
              className="w-5 h-5 text-[#EAB308] bg-[#1a1a1a] border-[#444] rounded focus:ring-[#EAB308] focus:ring-offset-[#262626]"
            />
            <span className="ml-2 text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
              Deposit Satisfied
            </span>
          </label>
        </div>

        {/* Paid Balance Moved Down */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Paid Balance</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 font-medium">$</span>
            <input
              type="number"
              value={paidBalance}
              onChange={(e) => setPaidBalance(e.target.value)}
              className="w-full py-2 pr-3 pl-7 text-sm border border-[#444] bg-[#1a1a1a] text-white rounded outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Remaining Balance Moved Down */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Remaining Balance</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-medium">$</span>
            <div className="w-full py-2 pr-3 pl-7 text-sm border border-[#444] bg-[#222] text-gray-400 rounded cursor-not-allowed flex items-center h-[38px]">
              {remainingBalance.toFixed(2)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}