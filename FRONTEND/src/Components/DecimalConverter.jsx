import React, { useState } from 'react';
import { Calculator, ArrowRight, Binary, Hash, BookOpen } from 'lucide-react';
import decImage from "/public/decimal.jpg";
import { TbBackground, TbMarquee } from 'react-icons/tb';
import { FaCaretLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function DecimalConverter() {
  const [decimal, setDecimal] = useState('');
  const [fractionalNum, setFractionalNum] = useState(0);
  const [targetSystem, setTargetSystem] = useState('binary');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState([]);
  const [fractionSteps, setFractionSteps] = useState([]);

  const hexDigits = '0123456789ABCDEF';

  const navigate=useNavigate();
 
  
  
  const convertNumber = () => {
    setError('');
    setResult('');
    setSteps([]);
    setFractionSteps([]);

    if (!decimal || decimal.trim() === '') {
      setError('Please enter a decimal number');
      return;
    }

    const inputNum = parseFloat(decimal);
    if (isNaN(inputNum)) {
      setError('Invalid number input');
      return;
    }

    const num = Math.floor(inputNum);
    const fractionalPart = inputNum - num;
    setFractionalNum(fractionalPart)
    

    

    if (num < 0) {
      setError('Please enter a positive number');
      return;
    }

    let convertedInt = '';
    let convertedFraction = '';
    let conversionSteps = [];
    let fractionConversionSteps = [];

    switch (targetSystem) {
      case 'binary':
        convertedInt = num.toString(2);
        conversionSteps = generateBinarySteps(num);
        if (fractionalPart > 0) {
          const fractionResult = generateFractionSteps(fractionalPart, 2);
          convertedFraction = fractionResult.result;
          fractionConversionSteps = fractionResult.steps;
        }
        break;
      case 'octal':
        convertedInt = num.toString(8);
        conversionSteps = generateOctalSteps(num);
        if (fractionalPart > 0) {
          const fractionResult = generateFractionSteps(fractionalPart, 8);
          convertedFraction = fractionResult.result;
          fractionConversionSteps = fractionResult.steps;
        }
        break;
      case 'hexadecimal':
        convertedInt = num.toString(16).toUpperCase();
        conversionSteps = generateHexSteps(num);
        if (fractionalPart > 0) {
          const fractionResult = generateFractionSteps(fractionalPart, 16, true);
          convertedFraction = fractionResult.result;
          fractionConversionSteps = fractionResult.steps;
        }
        break;
      default:
        convertedInt = num.toString();
    }

    const finalResult = fractionalPart > 0 ? `${convertedInt}.${convertedFraction}` : convertedInt;
    setResult(finalResult);
    setSteps(conversionSteps);
    setFractionSteps(fractionConversionSteps);
  };
 

  const generateBinarySteps = (num) => {
    if (num === 0) return [{ quotient: 0, remainder: 0, division: '0 ÷ 2 = 0' }];

    const steps = [];
    let current = num;

    while (current > 0) {
      const quotient = Math.floor(current / 2);
      const remainder = current % 2;
      steps.push({
        quotient,
        remainder,
        division: `${current} ÷ 2 = ${quotient}`,
      });
      current = quotient;
    }

    return steps;
  };

  const generateOctalSteps = (num) => {
    if (num === 0) return [{ quotient: 0, remainder: 0, division: '0 ÷ 8 = 0' }];

    const steps = [];
    let current = num;

    while (current > 0) {
      const quotient = Math.floor(current / 8);
      const remainder = current % 8;
      steps.push({
        quotient,
        remainder,
        division: `${current} ÷ 8 = ${quotient}`,
      });
      current = quotient;
    }

    return steps;
  };

  const generateHexSteps = (num) => {
    if (num === 0) return [{ quotient: 0, remainder: '0', division: '0 ÷ 16 = 0' }];

    const steps = [];
    let current = num;

    while (current > 0) {
      const quotient = Math.floor(current / 16);
      const remainder = current % 16;
      steps.push({
        quotient,
        remainder: hexDigits[remainder],
        division: `${current} ÷ 16 = ${quotient}`,
      });
      current = quotient;
    }

    return steps;
  };

  const generateFractionSteps = (fraction, base, isHex = false) => {
    const steps = [];
    let result = '';
    let current = fraction;
    let count = 0;

    while (current > 0 && count < 10) {
      const multiplied = current * base;
      const digit = Math.floor(multiplied);
      result += isHex ? hexDigits[digit] : digit.toString();
      steps.push({
        step: count + 1,
        operation: `${current.toFixed(6)} × ${base} = ${multiplied.toFixed(6)}`,
        digit: isHex ? hexDigits[digit] : digit,
        remaining: (multiplied - digit).toFixed(6)
      });
      current = multiplied - digit;
      count++;
    }

    return { result, steps };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      convertNumber();
    }
  };

  const targetBase = targetSystem === 'binary' ? 2 : targetSystem === 'octal' ? 8 : 16;
  const targetName = targetSystem.charAt(0).toUpperCase() + targetSystem.slice(1);

  

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed flex items-start justify-center p-4 md:p-10" style={{backgroundImage: `url(${decImage}) `,}}>
      
      <div className="w-full max-w-6xl">
        <button className='text-white flex backdrop-blur-sm bg-white/2 px-3  py-1 rounded-lg md:w-24' onClick={()=>navigate(-1)}> 
      <FaCaretLeft className='size-4  mt-1'/> Back</button>
        <div className="text-center mb-10">
          
          <div className="flex items-center justify-center mb-4">
            
            <Calculator className="w-14 h-14 text-yellow-300" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-wide">
            Digital Converter Hub
          </h1>
          <p className="text-white text-lg">
            Convert Decimal (Base-10) to Binary, Octal, or Hexadecimal with step-by-step division
          </p>
          <marquee className="text-red-500">NOTE** Refresh page for remove the data,,</marquee>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* rahul */}
          <div className="md:col-span-1 ">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 md:p-6 shadow-2xl border border-white/20 h-full">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                <Binary className="w-5 h-5 mr-3 text-yellow-300" />
                How Conversion Works
              </h3>

              <div className="space-y-4 text-sm text-purple-100">
                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-yellow-300 mb-2">📘 Binary (Base-2)</h4>
                  <p className="mb-2">Method: Successive division by 2.</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Divide by 2, record remainder (0 or 1)</li>
                    <li>Repeat with the quotient</li>
                    <li>Read remainders in reverse order</li>
                  </ol>
                  <div className="mt-3 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-yellow-200">Example: 25 → Binary</p>
                    <p className="text-xs mt-1">25÷2=12 rem 1</p>
                    <p className="text-xs">12÷2=6 rem 0</p>
                    <p className="text-xs">6÷2=3 rem 0</p>
                    <p className="text-xs">3÷2=1 rem 1</p>
                    <p className="text-xs">1÷2=0 rem 1</p>
                    <p className="text-green-300 font-bold mt-1">Result: 11001</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-blue-300 mb-2">📗 Octal (Base-8)</h4>
                  <p className="mb-2">Method: Successive division by 8.</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Divide by 8, record remainder (0 - 7)</li>
                    <li>Repeat with the quotient</li>
                    <li>Read remainders in reverse order</li>
                  </ol>
                  <div className="mt-3 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-blue-200">Example: 64 → Octal</p>
                    <p className="text-xs mt-1">64÷8=8 rem 0</p>
                    <p className="text-xs">8÷8=1 rem 0</p>
                    <p className="text-xs">1÷8=0 rem 1</p>
                    <p className="text-green-300 font-bold mt-1">Result: 100</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-pink-300 mb-2">📙 Hexadecimal (Base-16)</h4>
                  <p className="mb-2">Method: Successive division by 16.</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Divide by 16, record remainder (0 - F)</li>
                    <li>Convert remainders 10-15 to A-F</li>
                    <li>10-A 11-B 12-C 13-D 14-E 15-F</li>
                    <li>Repeat with the quotient</li>
                    <li>Read remainders in reverse order</li>
                  </ol>
                  <div className="mt-2 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-pink-200">Example: 255 → Hex</p>
                    <p className="text-xs mt-1">255÷16=15 rem 15 (F)</p>
                    <p className="text-xs">15÷16=0 rem 15 (F)</p>
                    <p className="text-green-300 font-bold mt-1">Result: FF</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-green-300 mb-2">🔢 Fractional Parts</h4>
                  <p className="mb-2">Method: Successive multiplication.</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Multiply fraction by base</li>
                    <li>Take integer part as next digit</li>
                    <li>Use remaining fraction for next step</li>
                    <li>Repeat until fraction is 0 or desired precision</li>
                  </ol>
                  <div className="mt-2 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-green-200">Example: 0.625 → Binary</p>
                    <p className="text-xs mt-1">0.625×2=1.25 → 1</p>
                    <p className="text-xs">0.25×2=0.5 → 0</p>
                    <p className="text-xs">0.5×2=1.0 → 1</p>
                    <p className="text-green-300 font-bold mt-1">Result: .101</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 mb-6">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                    <Hash className="w-6 h-6 mr-3" />
                    Enter Number & Convert
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                        <label className="flex items-center text-white text-sm font-semibold mb-3">
                            Decimal Number (Base-10)
                        </label>
                        <input
                            type="text"
                            value={decimal}
                            onChange={(e) => setDecimal(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="e.g., 10.625"
                            className="w-full px-6 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-purple-200 text-xl font-mono focus:outline-none focus:border-yellow-300 focus:bg-white/30 transition-all shadow-inner"
                        />
                    </div>
                    
                    <div className="mb-2 md:mb-0">
                        <label className="flex items-center text-white text-sm font-semibold mb-3">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Convert To
                        </label>
                        <div className="relative">
                            <select
                                value={targetSystem}
                                onChange={(e) => setTargetSystem(e.target.value)}
                                className="w-full px-6 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white text-xl focus:outline-none focus:border-yellow-300 focus:bg-white/30 transition-all cursor-pointer appearance-none pr-12"
                            >
                                <option value="binary" className="bg-purple-900 text-white">Binary (Base-2)</option>
                                <option value="octal" className="bg-purple-900 text-white">Octal (Base-8)</option>
                                <option value="hexadecimal" className="bg-purple-900 text-white">Hexadecimal (Base-16)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    onClick={convertNumber}
                    className="w-full py-4 mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-purple-900 font-extrabold text-xl rounded-xl shadow-2xl transform hover:scale-[1.005] transition-all duration-200 flex items-center justify-center uppercase tracking-wider"
                >
                    <Calculator className="w-6 h-6 mr-3" />
                    Start Conversion
                </button>
            </div>
            
           

            {steps.length > 0 && (
              <div className="mt-8 animate-fade-in">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-yellow-300" />
                  Integer Part: Step-by-Step for  {Math.floor(parseFloat(decimal))}  to {targetName} (Base-{targetBase})
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:p-6 p-1 border border-white/20">
                  <div className="space-y-1 space-x-2 max-h-96 overflow-y-auto pr-2 md:grid md:grid-cols-2 grid grid-cols-1">
                    {steps.map((step, index) => (
                      <p
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/10 rounded-lg border border-white/20 hover:bg-white/20"
                      > 
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                          <span className="bg-yellow-400 text-purple-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {steps.length - index}
                          </span>
                          <span className="text-white font-mono text-lg flex-grow">
                            <div className='flex gap-2'>{step.division} remainder <span className="text-white flex font-bold justify-right space-x-2 rounded-lg text-xl shadow-lg mr-1"><ArrowRight /> <u>{step.remainder}</u></span></div>
                          </span>
                        </div>
                      </p>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-4 border-2 border-yellow-300/50">
                      <p className="text-yellow-100 text-sm mb-3 font-semibold text-center">
                        📝 Read remainders from bottom (first step) to top (last step) to get the result:
                      </p>
                      <div className="flex items-center justify-center space-x-2 flex-wrap">
                        {steps.slice().reverse().map((step, index) => (
                          <span
                            key={index}
                            className="bg-white/30 text-white md:mt-0 mt-3 font-extrabold px-3 py-1 rounded text-2xl border border-white/50 animate-pop-in"
                          >
                            {step.remainder}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            

            {fractionSteps.length > 0 && (

              
              <div className="mt-8 animate-fade-in">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-green-300" />
                  Fractional Part: Step-by-Step Conversion For {fractionalNum}
                  
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="space-y-2">
                    {fractionSteps.map((step, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-3 border border-white/20 hover:bg-white/20">
                        <div className="flex items-start gap-3">
                          <span className="bg-green-400 text-purple-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {index + 1}
                          </span>
                          <div className="flex-grow">
                            <p className="text-white font-mono text-sm mb-1">
                              {step.operation}
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-yellow-300">Integer part:</span>
                              <span className="bg-yellow-500 text-purple-900 font-bold px-2 py-1 rounded">
                                {step.digit}
                              </span>
                              <span className="text-purple-200 ml-2">Remaining: {step.remaining}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-xl p-4 border-2 border-green-300/50">
                      <p className="text-green-100 text-sm mb-3 font-semibold text-center">
                        📝 Read digits from top to bottom to get fractional result:
                      </p>
                      <div className="flex items-center justify-center space-x-2 flex-wrap">
                        <span className="text-white text-3xl font-bold">.</span>
                        {fractionSteps.map((step, index) => (
                          <span
                            key={index}
                            className="bg-white/30 text-white font-extrabold md:mt-0 mt-3 px-3 py-1 rounded text-2xl border border-white/50"
                          >
                            {step.digit}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}
           
            <div className="space-y-4 mt-8 mb-6">
                {error && (
                    <div className="bg-red-500/30 rounded-xl p-4 border-2 border-red-300/50 animate-pulse">
                        <p className="text-red-100 font-semibold flex items-center">
                            ⚠️ {error}
                        </p>
                    </div>
                )}

                {result && (
                    <div className="bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-xl p-6 border-2 border-green-300/50 animate-fade-in shadow-xl">
                        <p className="text-white text-lg font-semibold mb-2">
                            ✅ Converted {decimal} (Base-10) to {targetName} (Base-{targetBase}):
                        </p>
                        <button className="text-white text-4xl font-extrabold break-all font-mono p-2 rounded-md bg-green-600 tracking-wider">
                            ({result})<span className='text-2xl'>{targetBase}</span>
                        </button>
                    </div>
                )}
            </div>
            
          </div>
        </div>

        <p className="text-center text-white mt-10 text-sm">
          Developed by RAHUL Supports both integer and fractional decimal numbers. Fractional precision up to 10 digits.
        </p>
      </div>
    </div>
  );
}

export default DecimalConverter;