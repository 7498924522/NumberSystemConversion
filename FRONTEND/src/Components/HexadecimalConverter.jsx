import React, { useState } from 'react';
import { Calculator, ArrowRight, Hash, BookOpen } from 'lucide-react';
import HexImage from "/public/hex.png";
import { FaCaretLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function HexadecimalConverter() {
  const [hexInput, setHexInput] = useState('');
  const [targetSystem, setTargetSystem] = useState('decimal');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState([]);
  const [conversionSteps, setConversionSteps] = useState([]);

  const hexDigits = '0123456789ABCDEF';

  const navigate=useNavigate();

  const isValidHex = (hex) => {
    return /^[0-9A-Fa-f]+\.?[0-9A-Fa-f]*$/.test(hex);
  };

  const hexToDecimal = (hex) => {
    const parts = hex.toUpperCase().split('.');
    const integerPart = parts[0];
    const fractionalPart = parts[1] || '';

    let decimalInteger = 0;
    const intSteps = [];

    // Convert integer part
    for (let i = 0; i < integerPart.length; i++) {
      const digit = integerPart[i];
      const digitValue = hexDigits.indexOf(digit);
      const power = integerPart.length - 1 - i;
      const contribution = digitValue * Math.pow(16, power);
      
      intSteps.push({
        digit,
        digitValue,
        power,
        contribution,
        calculation: `${digit} × 16^${power} = ${digitValue} × ${Math.pow(16, power)} = ${contribution}`
      });
      
      decimalInteger += contribution;
    }

    // Convert fractional part
    let decimalFraction = 0;
    const fracSteps = [];
    
    for (let i = 0; i < fractionalPart.length; i++) {
      const digit = fractionalPart[i];
      const digitValue = hexDigits.indexOf(digit);
      const power = -(i + 1);
      const contribution = digitValue * Math.pow(16, power);
      
      fracSteps.push({
        digit,
        digitValue,
        power,
        contribution,
        calculation: `${digit} × 16^${power} = ${digitValue} × ${Math.pow(16, power).toFixed(6)} = ${contribution.toFixed(6)}`
      });
      
      decimalFraction += contribution;
    }

    return {
      value: decimalInteger + decimalFraction,
      integerSteps: intSteps,
      fractionalSteps: fracSteps
    };
  };

  const decimalToBinary = (decimal) => {
    const num = Math.floor(decimal);
    const fractionalPart = decimal - num;
    
    let binaryInt = num.toString(2);
    let binaryFrac = '';
    const steps = [];
    
    if (fractionalPart > 0) {
      let current = fractionalPart;
      let count = 0;
      
      while (current > 0 && count < 10) {
        const multiplied = current * 2;
        const digit = Math.floor(multiplied);
        binaryFrac += digit;
        steps.push({
          step: count + 1,
          operation: `${current.toFixed(6)} × 2 = ${multiplied.toFixed(6)}`,
          digit: digit,
          remaining: (multiplied - digit).toFixed(6)
        });
        current = multiplied - digit;
        count++;
      }
    }
    
    return fractionalPart > 0 ? `${binaryInt}.${binaryFrac}` : binaryInt;
  };

  const decimalToOctal = (decimal) => {
    const num = Math.floor(decimal);
    const fractionalPart = decimal - num;
    
    let octalInt = num.toString(8);
    let octalFrac = '';
    
    if (fractionalPart > 0) {
      let current = fractionalPart;
      let count = 0;
      
      while (current > 0 && count < 10) {
        const multiplied = current * 8;
        const digit = Math.floor(multiplied);
        octalFrac += digit;
        current = multiplied - digit;
        count++;
      }
    }
    
    return fractionalPart > 0 ? `${octalInt}.${octalFrac}` : octalInt;
  };

  const convertNumber = () => {
    setError('');
    setResult('');
    setSteps([]);
    setConversionSteps([]);

    if (!hexInput || hexInput.trim() === '') {
      setError('Please enter a hexadecimal number');
      return;
    }

    const cleanHex = hexInput.trim().toUpperCase();
    
    if (!isValidHex(cleanHex)) {
      setError('Invalid hexadecimal input. Use only 0-9 and A-F');
      return;
    }

    // First convert to decimal
    const decimalResult = hexToDecimal(cleanHex);
    const decimalValue = decimalResult.value;

    setSteps(decimalResult.integerSteps);
    setConversionSteps(decimalResult.fractionalSteps);

    let finalResult = '';

    switch (targetSystem) {
      case 'decimal':
        finalResult = decimalValue.toString();
        break;
      case 'binary':
        finalResult = decimalToBinary(decimalValue);
        break;
      case 'octal':
        finalResult = decimalToOctal(decimalValue);
        break;
      default:
        finalResult = decimalValue.toString();
    }

    setResult(finalResult);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      convertNumber();
    }
  };

  const getTargetBaseName = () => {
    switch(targetSystem) {
      case 'decimal': return 'Decimal (Base-10)';
      case 'binary': return 'Binary (Base-2)';
      case 'octal': return 'Octal (Base-8)';
      default: return '';
    }
    

    
  };

  const BaseName = () => {
    switch(targetSystem) {
      case 'decimal': return '10';
      case 'binary': return '2';
      case 'octal': return '8';
      default: return '';
    }
    

    
  };

  return (
   <div className="min-h-screen bg-cover bg-center bg-fixed flex items-start justify-center p-4 md:p-10" style={{backgroundImage: `url(${HexImage}) `,}}>
          <div className="w-full max-w-6xl">
             <button className='text-white flex backdrop-blur-sm bg-white/10 px-3  py-1 rounded-lg md:w-24' onClick={()=>navigate(-1)}> 
                          <FaCaretLeft className='size-4  mt-1'/> Back</button>
                   
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-14 h-14 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-wide">
            Hexadecimal Converter Hub
          </h1>
          <p className="text-white text-lg">
            Convert Hexadecimal (Base-16) to Decimal, Binary, or Octal with step-by-step conversion
          </p>
          <marquee className="text-red-500">NOTE** Refresh page for remove the data,,</marquee>
       
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar - Educational Content */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 shadow-2xl border border-white/20 h-full">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                <Hash className="w-5 h-5 mr-3 text-yellow-300" />
                How Conversion Works
              </h3>

              <div className="space-y-4 text-sm text-purple-100">
                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-yellow-300 mb-2">📘 Hex → Decimal</h4>
                  <p className="mb-2">Method: Positional notation</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Each digit has positional value</li>
                    <li>Multiply digit by 16^position</li>
                    <li>Sum all contributions</li>
                    <li>A=10, B=11, C=12, D=13, E=14, F=15</li>
                  </ol>
                  <div className="mt-3 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-yellow-200">Example: 2F → Decimal</p>
                    <p className="text-xs mt-1">2 × 16¹ = 2 × 16 = 32</p>
                    <p className="text-xs">F × 16⁰ = 15 × 1 = 15</p>
                    <p className="text-xs">Sum: 32 + 15 = 47</p>
                    <p className="text-green-300 font-bold mt-1">Result: 47</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-blue-300 mb-2">📗 Hex → Binary</h4>
                  <p className="mb-2">Via decimal intermediate</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Convert hex to decimal first</li>
                    <li>Then decimal to binary</li>
                    <li>Divide by 2 repeatedly</li>
                  </ol>
                  <div className="mt-3 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-blue-200">Example: A → Binary</p>
                    <p className="text-xs mt-1">A (hex) = 10 (decimal)</p>
                    <p className="text-xs">10 ÷ 2 = 5 rem 0</p>
                    <p className="text-xs">5 ÷ 2 = 2 rem 1</p>
                    <p className="text-xs">2 ÷ 2 = 1 rem 0</p>
                    <p className="text-xs">1 ÷ 2 = 0 rem 1</p>
                    <p className="text-green-300 font-bold mt-1">Result: 1010</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-pink-300 mb-2">📙 Hex → Octal</h4>
                  <p className="mb-2">Via decimal intermediate</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Convert hex to decimal first</li>
                    <li>Then decimal to octal</li>
                    <li>Divide by 8 repeatedly</li>
                  </ol>
                  <div className="mt-3 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-pink-200">Example: 1F → Octal</p>
                    <p className="text-xs mt-1">1F (hex) = 31 (decimal)</p>
                    <p className="text-xs">31 ÷ 8 = 3 rem 7</p>
                    <p className="text-xs">3 ÷ 8 = 0 rem 3</p>
                    <p className="text-green-300 font-bold mt-1">Result: 37</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-green-300 mb-2">🔢 Fractional Parts</h4>
                  <p className="mb-2">Negative powers of 16</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>First digit after point: × 16⁻¹</li>
                    <li>Second digit: × 16⁻²</li>
                    <li>And so on...</li>
                  </ol>
                  <div className="mt-3 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-green-200">Example: 0.8 (hex)</p>
                    <p className="text-xs mt-1">8 × 16⁻¹ = 8 × 0.0625 = 0.5</p>
                    <p className="text-green-300 font-bold mt-1">Result: 0.5 (decimal)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            {/* Input Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 mb-6">
              <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                <Hash className="w-6 h-6 mr-3" />
                Enter Hexadecimal & Convert
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="flex items-center text-white text-sm font-semibold mb-3">
                    Hexadecimal Number (Base-16)
                  </label>
                  <input
                    type="text"
                    value={hexInput}
                    onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., 1F.A or 2F"
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
                      <option value="decimal" className="bg-purple-900 text-white">Decimal (Base-10)</option>
                      <option value="binary" className="bg-purple-900 text-white">Binary (Base-2)</option>
                      <option value="octal" className="bg-purple-900 text-white">Octal (Base-8)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={convertNumber}
                className="w-full py-4 mt-6 bg-gradient-to-r cursor-pointer from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-purple-900 font-extrabold text-xl rounded-xl shadow-2xl transform hover:scale-[1.005] transition-all duration-200 flex items-center justify-center uppercase tracking-wider"
              >
                <Calculator className="w-6 h-6 mr-3" />
                Start Conversion
              </button>
            </div>

            {/* Integer Part Steps */}
            {steps.length > 0 && (
              <div className="mt-8 animate-fade-in">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-yellow-300" />
                  Integer Part: Hex to Decimal Conversion Steps
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="space-y-3">
                    {steps.map((step, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/20">
                        <div className="flex items-start gap-3">
                          <span className="bg-yellow-400 text-purple-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {index + 1}
                          </span>
                          <div className="flex-grow">
                            <p className="text-white font-mono text-lg mb-2">
                              Position {step.power}: {step.calculation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-4 border-2 border-yellow-300/50">
                      <p className="text-yellow-100 text-sm mb-3 font-semibold text-center">
                        📝 Sum all contributions to get decimal value
                      </p>
                      <div className="text-center">
                        <span className="text-white text-3xl font-bold">
                          ({steps.reduce((sum, step) => sum + step.contribution, 0)}) <sub className='text-xl'>10</sub>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fractional Part Steps */}
            {conversionSteps.length > 0 && (
              <div className="mt-8 animate-fade-in">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-green-300" />
                  Fractional Part: Hex to Decimal Conversion Steps
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="space-y-3">
                    {conversionSteps.map((step, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/20">
                        <div className="flex items-start gap-3">
                          <span className="bg-green-400 text-purple-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {index + 1}
                          </span>
                          <div className="flex-grow">
                            <p className="text-white font-mono text-sm">
                              Position {step.power}: {step.calculation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-xl p-4 border-2 border-green-300/50">
                      <p className="text-green-100 text-sm mb-3 font-semibold text-center">
                        📝 Sum all fractional contributions
                      </p>
                      <div className="text-center">
                        <span className="text-white text-3xl font-bold">
                          ({conversionSteps.reduce((sum, step) => sum + step.contribution, 0).toFixed(6)})<sub className='text-xl'>10</sub>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error and Result Display */}
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
                    ✅ Converted {hexInput} (Base-16) to {getTargetBaseName()}:
                  </p>
                  <div className="text-white text-4xl font-extrabold break-all font-mono p-2 rounded-md bg-green-600 tracking-wider">
                    ({result})<sub className='text-xl'>{BaseName()}</sub>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-white mt-10 text-sm">
         Developed by RAHUL Supports both integer and fractional hexadecimal numbers (use 0-9, A-F).
        </p>
      </div>
    </div>
  );
}

export default HexadecimalConverter;