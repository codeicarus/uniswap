import { notification } from "antd";
import React from 'react';
import { useState, useEffect } from "react";
import getParams from "./components/Getparams";

const App = () => {
  // call getPrams function
  const params = getParams();

  // initial set of token amount 
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');

  // initial set of name in inputToken and outputToken
  const [inputToken, setInputToken] = useState(() => {
    return params.token1;
  });
  const [outputToken, setOutputToken] = useState(() => {
    return params.token2;
  });

  // Exchange rate calculation between tokens
  const exchangeRates = {
    Ox_Protocol: { inch: 2, Aave: 3, AdEx: 4, AIOZ_Network: 5, Aleph_im: 6, ETH: 7, DAI: 8, USDC: 9, WBTC: 10 },
    inch: { Ox_Protocol: 0.5, Aave: 1.5, AdEx: 2, AIOZ_Network: 2.5, Aleph_im: 3, ETH: 3.5, DAI: 4, USDC: 4.5, WBTC: 5 },
    Aave: { Ox_Protocol: 1 / 3, inch: 2 / 3, AdEx: 4 / 3, AIOZ_Network: 5 / 3, Aleph_im: 2, ETH: 7 / 3, DAI: 8 / 3, USDC: 3, WBTC: 10 / 3 },
    AdEx: { Ox_Protocol: 0.25, inch: 0.5, Aave: 0.75, AIOZ_Network: 1.25, Aleph_im: 1.5, ETH: 1.75, DAI: 2, USDC: 2.25, WBTC: 2.5 },
    AIOZ_Network: { Ox_Protocol: 0.2, inch: 0.4, Aave: 0.6, AdEx: 0.8, Aleph_im: 1.2, ETH: 1.4, DAI: 1.6, USDC: 1.8, WBTC: 2 },
    Aleph_im: { Ox_Protocol: 1 / 6, inch: 1 / 3, Aave: 0.5, AdEx: 2 / 3, AIOZ_Network: 5 / 6, ETH: 7 / 6, DAI: 4 / 3, USDC: 1.5, WBTC: 5 / 3 },
    ETH: { Ox_Protocol: 1 / 7, inch: 2 / 7, Aave: 3 / 7, AdEx: 4 / 7, AIOZ_Network: 5 / 7, Aleph_im: 6 / 7, DAI: 8 / 7, USDC: 9 / 7, WBTC: 10 / 7 },
    DAI: { Ox_Protocol: 0.125, inch: 0.25, Aave: 0.375, AdEx: 0.5, AIOZ_Network: 0.625, Aleph_im: 0.75, ETH: 0.875, USDC: 1.125, WBTC: 1.25 },
    USDC: { Ox_Protocol: 1 / 9, inch: 2 / 9, Aave: 1 / 3, AdEx: 4 / 9, AIOZ_Network: 5 / 9, Aleph_im: 2 / 3, ETH: 7 / 9, DAI: 8 / 9, WBTC: 10 / 9 },
    WBTC: { Ox_Protocol: 0.1, inch: 0.2, Aave: 0.3, AdEx: 0.4, AIOZ_Network: 0.5, Aleph_im: 0.6, ETH: 0.7, DAI: 0.8, USDC: 0.9 }
  };

  // when only change inputToken and outputToken change token name in url
  useEffect(() => { window.history.replaceState({}, "", `/query?token1=${inputToken}&token2=${outputToken}`); }, [inputToken, outputToken]);

  // calculation of value of Exchange between inputtoken amount and outputtoken amount
  const handleInputChange = (event) => {
    const amount = event.target.value;
    setInputAmount(amount);
    const output = parseFloat(amount) * exchangeRates[inputToken][outputToken];
    setOutputAmount(output.toFixed(2));
  };

  // when select inputtoken, change url and calculation value between inputtoken and outputtoken 
  const handleInputTokenChange = (event) => {
    const token = event.target.value;
    window.history.replaceState({}, "", `/query?token1=${inputToken}&token2=${outputToken}`);
    setInputToken(token);
    const output = parseFloat(inputAmount) * exchangeRates[token][outputToken];
    setOutputAmount(output.toFixed(2));
  };

  // when select outputtoken, change url and calculation value between inputtoken and outputtoken 
  const handleOutputTokenChange = (event) => {
    const token = event.target.value;
    window.history.replaceState({}, "", `/query?token1=${inputToken}&token2=${outputToken}`);
    setOutputToken(token);
    const output = parseFloat(inputAmount) * exchangeRates[inputToken][token];
    setOutputAmount(output.toFixed(2));
  };

  const handleSwap = () => {
    notification.open({
      message: 'Swap Success',
      description: 'The swap was successful',
    });
    setInputAmount('');
    setOutputAmount('');
  };

  const convert = () => {
    setInputToken(outputToken);
    setOutputToken(inputToken);
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
  }

  return (
    <div className="px-80 mx-auto mt-60">
      <h1 className="text-4xl font-semibold mb-16 text-center">Swap anything, anywhere</h1>
      <div className="flex mb-4">
        <input
          type="number"
          className="border border-gray-300 p-3 mr-2 w-1/2 rounded"
          placeholder="You pay"
          value={inputAmount}
          onChange={handleInputChange}
        />
        <select
          className="border border-gray-300 p-3 w-1/2 rounded"
          value={inputToken}
          onChange={
            handleInputTokenChange
          }
        >
          <option value="Ox_Protocol">Ox Protocol</option>
          <option value="inch">1inch</option>
          <option value="Aave">Aave</option>
          <option value="AdEx">AdEx</option>
          <option value="AIOZ_Network">AIOZ Network</option>
          <option value="Aleph_im">Aleph.im</option>
          <option value="ETH">ETH</option>
          <option value="DAI">DAI</option>
          <option value="USDC">USDC</option>
          <option value="WBTC">WBTC</option>
        </select>
      </div>
      <div className="flex mb-4">
        <input
          type="number"
          className="border border-gray-300 p-3 mr-2 w-1/2 rounded"
          placeholder="You recieve"
          value={outputAmount}
          readOnly
        />
        <select
          className="border border-gray-300 p-3 w-1/2 rounded"
          value={outputToken}
          onChange={handleOutputTokenChange}
        >
          <option value="Ox_Protocol">Ox Protocol</option>
          <option value="inch">1inch</option>
          <option value="Aave">Aave</option>
          <option value="AdEx">AdEx</option>
          <option value="AIOZ_Network">AIOZ Network</option>
          <option value="Aleph_im">Aleph.im</option>
          <option value="ETH">ETH</option>
          <option value="DAI">DAI</option>
          <option value="USDC">USDC</option>
          <option value="WBTC">WBTC</option>
        </select>
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleSwap}
      >
        Swap
      </button>
      <button
        className='mt-4 ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
        onClick={convert}
      >
        Switch
      </button>
    </div>
  );
};

export default App;