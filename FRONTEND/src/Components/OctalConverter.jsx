import React, { useState } from 'react';
import { Calculator, ArrowRight, Hash, BookOpen } from 'lucide-react';
import octalImage from "/public/octal2.jpg";
import { useNavigate } from 'react-router-dom';
import { FaCaretLeft } from "react-icons/fa";

function OctalConverter() {
  const [octal, setOctal] = useState('');
  const [targetSystem, setTargetSystem] = useState('decimal');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState([]);
  const [integerResult, setIntegerResult] = useState('');
  const [fractionResult, setFractionResult] = useState('');

  const hexDigits = '0123456789ABCDEF';

  const navigate=useNavigate();

  const convertNumber = () => {
    setError('');
    setResult('');
    setSteps([]);

    if (!octal || octal.trim() === '') {
      setError('Please enter an octal number');
      return;
    }

    // Validate octal input (only 0-7 and optional decimal point)
    if (!/^[0-7]+(\.[0-7]+)?$/.test(octal)) {
      setError('Invalid octal number. Only digits 0-7 and one decimal point are allowed');
      return;
    }

    // Split integer and fractional parts
    const parts = octal.split('.');
    const integerPart = parts[0];
    const fractionalPart = parts[1] || '';

    let converted = '';
    let conversionSteps = [];

    // Convert integer part from octal to decimal
    const decimalInteger = parseInt(integerPart, 8);
    
    // Convert fractional part from octal to decimal
    let decimalFraction = 0;
    if (fractionalPart) {
      for (let i = 0; i < fractionalPart.length; i++) {
        decimalFraction += parseInt(fractionalPart[i]) * Math.pow(8, -(i + 1));
      }
    }
    
    const decimalValue = decimalInteger + decimalFraction;

    switch (targetSystem) {
      case 'decimal':
        converted = decimalValue.toString();
        conversionSteps = generateDecimalSteps(integerPart, fractionalPart);
        setIntegerResult(decimalInteger.toString());
        setFractionResult(decimalFraction > 0 ? decimalFraction.toString().split('.')[1] || '' : '');
        break;
      case 'binary':
        const binaryInteger = decimalInteger.toString(2);
        const binaryFraction = fractionalPart ? convertFractionToBinary(decimalFraction) : '';
        converted = binaryFraction ? `${binaryInteger}.${binaryFraction}` : binaryInteger;
        conversionSteps = generateBinarySteps(integerPart, fractionalPart, decimalInteger, decimalFraction);
        setIntegerResult(binaryInteger);
        setFractionResult(binaryFraction);
        break;
      case 'hexadecimal':
        const hexInteger = decimalInteger.toString(16).toUpperCase();
        const hexFraction = fractionalPart ? convertFractionToHex(decimalFraction) : '';
        converted = hexFraction ? `${hexInteger}.${hexFraction}` : hexInteger;
        conversionSteps = generateHexSteps(integerPart, fractionalPart, decimalInteger, decimalFraction);
        setIntegerResult(hexInteger);
        setFractionResult(hexFraction);
        break;
      default:
        converted = decimalValue.toString();
        setIntegerResult(decimalInteger.toString());
        setFractionResult(decimalFraction > 0 ? decimalFraction.toString().split('.')[1] || '' : '');
    }

    setResult(converted);
    setSteps(conversionSteps);
  };

  const convertFractionToBinary = (decimalFraction, maxDigits = 20) => {
    let result = '';
    let current = decimalFraction;
    let count = 0;
    
    while (current > 0 && count < maxDigits) {
      current *= 2;
      const bit = Math.floor(current);
      result += bit;
      current -= bit;
      count++;
    }
    
    return result || '0';
  };

  const convertFractionToHex = (decimalFraction, maxDigits = 10) => {
    let result = '';
    let current = decimalFraction;
    let count = 0;
    
    while (current > 0 && count < maxDigits) {
      current *= 16;
      const digit = Math.floor(current);
      result += hexDigits[digit];
      current -= digit;
      count++;
    }
    
    return result || '0';
  };

  const generateDecimalSteps = (integerPart, fractionalPart) => {
    const steps = [];
    const len = integerPart.length;
    
    // Integer part steps
    for (let i = 0; i < len; i++) {
      const digit = integerPart[len - 1 - i];
      const power = i;
      const value = parseInt(digit) * Math.pow(8, power);
      steps.push({
        type: 'integer',
        position: len - 1 - i,
        digit: digit,
        power: power,
        calculation: `${digit} × 8^${power} = ${value}`,
        value: value
      });
    }
    
    // Fractional part steps
    if (fractionalPart) {
      for (let i = 0; i < fractionalPart.length; i++) {
        const digit = fractionalPart[i];
        const power = -(i + 1);
        const value = parseInt(digit) * Math.pow(8, power);
        steps.push({
          type: 'fraction',
          position: i,
          digit: digit,
          power: power,
          calculation: `${digit} × 8^${power} = ${value.toFixed(10)}`,
          value: value
        });
      }
    }
    
    return steps;
  };

  const generateBinarySteps = (integerPart, fractionalPart, decimalInteger, decimalFraction) => {
    const steps = [];
    
    // Step 1: Octal to Decimal
    const octalStr = fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
    const decimalStr = (decimalInteger + decimalFraction).toString();
    steps.push({
      type: 'octal-to-decimal',
      description: `First convert ${octalStr} (octal) to decimal: ${decimalStr}`
    });
    
    // Step 2: Integer part - Decimal to Binary
    if (decimalInteger === 0) {
      steps.push({ partType: 'integer', quotient: 0, remainder: 0, division: '0 ÷ 2 = 0' });
    } else {
      let current = decimalInteger;
      while (current > 0) {
        const quotient = Math.floor(current / 2);
        const remainder = current % 2;
        steps.push({
          partType: 'integer',
          quotient,
          remainder,
          division: `${current} ÷ 2 = ${quotient}`,
        });
        current = quotient;
      }
    }
    
    // Step 3: Fractional part - Decimal to Binary
    if (fractionalPart && decimalFraction > 0) {
      let current = decimalFraction;
      let count = 0;
      const maxSteps = 10;
      
      while (current > 0 && count < maxSteps) {
        const product = current * 2;
        const bit = Math.floor(product);
        const newFraction = product - bit;
        steps.push({
          partType: 'fraction',
          multiplication: `${current.toFixed(10)} × 2 = ${product.toFixed(10)}`,
          bit: bit,
          remaining: newFraction
        });
        current = newFraction;
        count++;
      }
    }
    
    return steps;
  };

  const generateHexSteps = (integerPart, fractionalPart, decimalInteger, decimalFraction) => {
    const steps = [];
    
    // Step 1: Octal to Decimal
    const octalStr = fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
    const decimalStr = (decimalInteger + decimalFraction).toString();
    steps.push({
      type: 'octal-to-decimal',
      description: `First convert ${octalStr} (octal) to decimal: ${decimalStr}`
    });
    
    // Step 2: Integer part - Decimal to Hexadecimal
    if (decimalInteger === 0) {
      steps.push({ partType: 'integer', quotient: 0, remainder: '0', division: '0 ÷ 16 = 0' });
    } else {
      let current = decimalInteger;
      while (current > 0) {
        const quotient = Math.floor(current / 16);
        const remainder = current % 16;
        steps.push({
          partType: 'integer',
          quotient,
          remainder: hexDigits[remainder],
          division: `${current} ÷ 16 = ${quotient}`,
        });
        current = quotient;
      }
    }
    
    // Step 3: Fractional part - Decimal to Hexadecimal
    if (fractionalPart && decimalFraction > 0) {
      let current = decimalFraction;
      let count = 0;
      const maxSteps = 8;
      
      while (current > 0 && count < maxSteps) {
        current *= 16;
        const digit = Math.floor(current);
        steps.push({
          partType: 'fraction',
          multiplication: `${(current - digit).toFixed(10)} × 16 = ${current.toFixed(10)}`,
          digit: hexDigits[digit],
          remaining: current - digit
        });
        current -= digit;
        count++;
      }
    }
    
    return steps;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      convertNumber();
    }
  };

  const targetBase = targetSystem === 'decimal' ? 10 : targetSystem === 'binary' ? 2 : 16;
  const targetName = targetSystem.charAt(0).toUpperCase() + targetSystem.slice(1);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed flex items-start justify-center p-4 md:p-10" style={{backgroundImage: `url(${octalImage}) `,}}>
        <div className="w-full max-w-6xl">
       <button className='text-white flex backdrop-blur-sm bg-white/10 px-3  py-1 rounded-lg md:w-24' onClick={()=>navigate(-1)}> 
             <FaCaretLeft className='size-4  mt-1'/> Back</button>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-14 h-14 text-cyan-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-wide">
            Octal Converter Hub
          </h1>
          <p className="text-white text-lg">
            Convert **Octal (Base-8)** to Decimal, Binary, or Hexadecimal with step-by-step calculation
          </p>
          <marquee className="text-red-500">NOTE** Refresh page for remove the data,,</marquee>
       
        </div>

        {/* Main Content: Two Columns on MD+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: How Conversion Works */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-2xl p-6 md:p-6 shadow-2xl border border-white/20 h-full">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                <Hash className="w-5 h-5 mr-3 text-cyan-300" />
                How Conversion Works
              </h3>

              <div className="space-y-4 text-sm text-blue-100">
                {/* Decimal Explanation */}
                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-cyan-300 mb-2">📘 Decimal (Base-10)</h4>
                  <p className="mb-2">Method: **Positional notation with powers of 8**.</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Each octal digit represents a power of 8</li>
                    <li>Multiply each digit by its position value</li>
                    <li>Add all values together</li>
                    <li>For fractions: use negative powers (8⁻¹, 8⁻², ...)</li>
                  </ol>
                  <div className="mt-3 bg-indigo-900/50 rounded p-2">
                    <p className="font-semibold text-cyan-200">Example: 157.4 → Decimal</p>
                    <p className="text-xs mt-1">1×8² + 5×8¹ + 7×8⁰ + 4×8⁻¹</p>
                    <p className="text-xs">= 64 + 40 + 7 + 0.5</p>
                    <p className="text-green-300 font-bold mt-1">Result: 111.5</p>
                  </div>
                </div>

                {/* Binary Explanation */}
                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-yellow-300 mb-2">📗 Binary (Base-2)</h4>
                  <p className="mb-2">Method: **Octal → Decimal → Binary**.</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Convert octal to decimal first</li>
                    <li>Integer: Divide by 2, record remainders</li>
                    <li>Fraction: Multiply by 2, record integer parts</li>
                    <li>Combine results</li>
                  </ol>
                  <div className="mt-3 bg-indigo-900/50 rounded p-2">
                    <p className="font-semibold text-yellow-200">Example: 17.4 → Binary</p>
                    <p className="text-xs mt-1">17.4₈ = 15.5₁₀</p>
                    <p className="text-xs">Integer: 15→1111</p>
                    <p className="text-xs">Fraction: 0.5→1</p>
                    <p className="text-green-300 font-bold mt-1">Result: 1111.1</p>
                  </div>
                </div>

                {/* Hexadecimal Explanation */}
                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-pink-300 mb-2">📙 Hexadecimal (Base-16)</h4>
                  <p className="mb-2">Method: **Octal → Decimal → Hexadecimal**.</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Convert octal to decimal first</li>
                    <li>Divide decimal by 16, record remainders</li>
                    <li>Convert remainders 10-15 to A-F</li>
                    <li>Read remainders in reverse order</li>
                  </ol>
                  <div className="mt-2 bg-indigo-900/50 rounded p-2">
                    <p className="font-semibold text-pink-200">Example: 377 → Hex</p>
                    <p className="text-xs mt-1">377₈ = 255₁₀</p>
                    <p className="text-xs">255÷16=15 rem 15 (F)</p>
                    <p className="text-xs">15÷16=0 rem 15 (F)</p>
                    <p className="text-green-300 font-bold mt-1">Result: FF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Column 2 & 3: Input, Output, and Steps */}
          <div className="md:col-span-2">
            
            {/* Input/Conversion Controls */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 mb-6">
                <h2 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center">
                    <Hash className="w-6 h-6 mr-3" />
                    Enter Number & Convert
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    {/* Octal Input */}
                    <div>
                        <label className="flex items-center text-white text-sm font-semibold mb-3">
                            Octal Number (Base-8)
                        </label>
                        <input
                            type="text"
                            value={octal}
                            onChange={(e) => setOctal(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="e.g., 157.25"
                            className="w-full px-6 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-blue-200 text-xl font-mono focus:outline-none focus:border-cyan-300 focus:bg-white/30 transition-all shadow-inner"
                        />
                    </div>
                    
                    {/* Target System Select */}
                    <div className="mb-2 md:mb-0">
                        <label className="flex items-center text-white text-sm font-semibold mb-3">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Convert To
                        </label>
                        <div className="relative">
                            <select
                                value={targetSystem}
                                onChange={(e) => setTargetSystem(e.target.value)}
                                className="w-full px-6 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white text-xl focus:outline-none focus:border-cyan-300 focus:bg-white/30 transition-all cursor-pointer appearance-none pr-12"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1rem center',
                                    backgroundSize: '1.5em'
                                }}
                            >
                                <option value="decimal" className="bg-indigo-900 text-white">Decimal (Base-10)</option>
                                <option value="binary" className="bg-indigo-900 text-white">Binary (Base-2)</option>
                                <option value="hexadecimal" className="bg-indigo-900 text-white">Hexadecimal (Base-16)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Convert Button */}
                <button
                    onClick={convertNumber}
                    className="w-full py-4 mt-6 cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-indigo-900 font-extrabold text-xl rounded-xl shadow-2xl transform hover:scale-[1.005] transition-all duration-200 flex items-center justify-center uppercase tracking-wider"
                >
                    <Calculator className="w-6 h-6 mr-3" />
                    Start Conversion
                </button>
            </div>
            
            {/* Error and Result Display */}
            <div className="space-y-4 mb-6">
                {/* Error Display */}
                {error && (
                    <div className="bg-red-500/30 rounded-xl p-4 border-2 border-red-300/50 animate-pulse">
                        <p className="text-red-100 font-semibold flex items-center">
                            ⚠️ {error}
                        </p>
                    </div>
                )}

               
            </div>

            {/* Conversion Steps - Dynamic Display */}
            {steps.length > 0 && (
              <div className="mt-8 animate-fade-in">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-cyan-300" />
                  Step-by-Step for {octal} to {targetName} (Base-{targetBase})
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:p-6 p-1 border border-white/20">
                  {targetSystem === 'decimal' ? (
                    // Decimal conversion steps (addition method)
                    <>
                      <div className="space-y-1 space-x-2 max-h-96 overflow-y-auto pr-2 md:grid md:grid-cols-2 grid grid-cols-1">
                        {steps.map((step, index) => (
                          <p
                            key={index}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/10 rounded-lg border border-white/20 hover:bg-white/20"
                          > 
                            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                              <span className={`${step.type === 'integer' ? 'bg-cyan-400' : 'bg-purple-400'} text-indigo-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0`}>
                                {index + 1}
                              </span>
                              <span className="text-white font-mono text-lg flex-grow">
                                <div className='flex gap-2'>{step.calculation} <span className="text-white flex font-bold justify-right space-x-2 rounded-lg text-xl shadow-lg mr-1"><ArrowRight /> <u>{typeof step.value === 'number' ? step.value.toFixed(10).replace(/\.?0+$/, '') : step.value}</u></span></div>
                              </span>
                            </div>
                          </p>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/20">
                        <div className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl p-4 border-2 border-cyan-300/50">
                          <p className="text-cyan-100 text-sm mb-3 font-semibold text-center">
                            📝 Add all the values together to get the result:
                          </p>
                          <div className="flex items-center justify-center space-x-2 flex-wrap">
                            {steps.map((step, index) => (
                              <React.Fragment key={index}>
                                <span className="bg-white/30 text-white font-extrabold px-3 py-1 rounded text-2xl border border-white/50 animate-pop-in">
                                  {typeof step.value === 'number' ? step.value.toFixed(10).replace(/\.?0+$/, '') : step.value}
                                </span>
                                {index < steps.length - 1 && <span className="text-cyan-300 text-2xl">+</span>}
                              </React.Fragment>
                            ))}
                            <ArrowRight className="w-6 h-6 text-cyan-300 mx-2 flex-shrink-0" />
                            <span className="bg-green-500 text-white font-extrabold px-4 mt-1 py-2 rounded-lg text-2xl shadow-xl flex-shrink-0">
                              {integerResult}{fractionResult ? `.${fractionResult}` : ''}<span className='text-sm font-mono ml-1'>₁₀</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Binary/Hex conversion steps (division/multiplication method)
                    <>
                      {/* Integer Part Steps */}
                      <div className="mb-6">
                        <h4 className="text-cyan-300 font-bold mb-3 flex items-center">
                          <span className="bg-cyan-400 text-indigo-900 px-2 py-1 rounded mr-2 text-sm">Integer Part</span>
                          Division Method
                        </h4>
                        <div className="space-y-1 space-x-2 max-h-64 overflow-y-auto pr-2 md:grid md:grid-cols-2 grid grid-cols-1">
                          {steps.filter(step => !step.type && step.partType === 'integer').map((step, index) => (
                            <p
                              key={index}
                              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/10 rounded-lg border border-white/20 hover:bg-white/20"
                            > 
                              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                <span className="bg-cyan-400 text-indigo-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                                  {steps.filter(s => !s.type && s.partType === 'integer').length - index}
                                </span>
                                <span className="text-white font-mono text-lg flex-grow">
                                  <div className='flex gap-2'>{step.division} remainder <span className="text-white flex font-bold justify-right space-x-2 rounded-lg text-xl shadow-lg mr-1"><ArrowRight /> <u>{step.remainder}</u></span></div>
                                </span>
                              </div>
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Fractional Part Steps */}
                      {steps.some(s => s.partType === 'fraction') && (
                        <div className="mb-6">
                          <h4 className="text-purple-300 font-bold mb-3 flex items-center">
                            <span className="bg-purple-400 text-indigo-900 px-2 py-1 rounded mr-2 text-sm">Fractional Part</span>
                            Multiplication Method
                          </h4>
                          <div className="space-y-1 space-x-2 max-h-64 overflow-y-auto pr-2 md:grid md:grid-cols-2 grid grid-cols-1">
                            {steps.filter(step => step.partType === 'fraction').map((step, index) => (
                              <p
                                key={index}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/10 rounded-lg border border-white/20 hover:bg-white/20"
                              > 
                                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                  <span className="bg-purple-400 text-indigo-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                                    {index + 1}
                                  </span>
                                  <span className="text-white font-mono text-sm flex-grow">
                                    <div className='flex gap-2'>{step.multiplication} <span className="text-white flex font-bold justify-right space-x-2 rounded-lg text-lg shadow-lg mr-1"><ArrowRight /> <u>{step.bit || step.digit}</u></span></div>
                                  </span>
                                </div>
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Final Result Explanation */}
                      <div className="mt-6 pt-6 border-t border-white/20">
                        <div className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl p-4 border-2 border-cyan-300/50">
                          <p className="text-cyan-100 text-sm mb-3 font-semibold text-center">
                            📝 Integer: Read remainders from **bottom to top**. Fraction: Read digits from **top to bottom**
                          </p>
                          <div className="flex items-center justify-center space-x-2 flex-wrap">
                            {/* Display integer remainders in reverse order */}
                            {steps.filter(s => !s.type && s.partType === 'integer').slice().reverse().map((step, index) => (
                              <span
                                key={`int-${index}`}
                                className="bg-cyan-400/30 text-white font-extrabold px-3 py-1 rounded text-2xl border border-cyan-400/50 animate-pop-in"
                              >
                                {step.remainder}
                              </span>
                            ))}
                            
                            {/* Decimal point if there's a fraction */}
                            {steps.some(s => s.partType === 'fraction') && (
                              <span className="text-cyan-300 text-3xl font-bold">.</span>
                            )}
                            
                            {/* Display fractional parts in order */}
                            {steps.filter(s => s.partType === 'fraction').map((step, index) => (
                              <span
                                key={`frac-${index}`}
                                className="bg-purple-400/30 text-white font-extrabold px-3 py-1 rounded text-2xl border border-purple-400/50 animate-pop-in"
                              >
                                {step.bit || step.digit}
                              </span>
                            ))}
                            
                            <ArrowRight className="w-6 h-6 text-cyan-300 mx-2 flex-shrink-0" />
                            <span className="bg-green-500 text-white font-extrabold px-4 lg:mt-3 py-2 mt-3 rounded-lg text-2xl shadow-xl flex-shrink-0">
                             ({integerResult}{fractionResult ? `.${fractionResult}` : ''})<sub className='text-xl'>{targetBase}</sub>
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

             {/* Result Display */}
                {result && (
                    <div className="bg-gradient-to-r my-5 from-green-500/30 to-blue-500/30 rounded-xl p-6 border-2 border-green-300/50 animate-fade-in shadow-xl">
                        <p className="text-green-100 text-lg font-semibold mb-2">
                            ✅ Converted {octal} (Base-8) to {targetName} (Base-{targetBase}):
                        </p>
                        <p className="text-white text-4xl font-extrabold break-all font-mono tracking-wider">
                             ({octal})<sub  className='text-xl'>8</sub> {"=>"}  {`(${result})`}<sub className='text-2xl'>{targetBase}</sub>
                        </p>
                    </div>
                )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white mt-10 text-sm">
          Developed by RAHUL **Note:** Only valid octal numbers (containing only digits 0-7) are supported. Decimal point (.) can be used for fractional numbers.
        </p>
      </div>
    </div>
  );
}

export default OctalConverter;