import React, { useState } from 'react';
import { Calculator, ArrowRight, Binary, Hash, BookOpen } from 'lucide-react';
import BinImage from "/public/binary.jpg";
import { useNavigate } from 'react-router-dom';
import { FaCaretLeft } from "react-icons/fa";

function BinaryConverter() {
  const [integerPart, setIntegerPart] = useState('');
  const [fractionalPart, setFractionalPart] = useState('');
  const [targetSystem, setTargetSystem] = useState('decimal');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState([]);

  const hexDigits = '0123456789ABCDEF';

  const navigate=useNavigate();

  const convertNumber = () => {
    setError('');
    setResult('');
    setSteps([]);

    if ((!integerPart || integerPart.trim() === '') && (!fractionalPart || fractionalPart.trim() === '')) {
      setError('Please enter a binary number (integer part, fractional part, or both)');
      return;
    }

    // Validate binary input
    const intPart = integerPart || '0';
    const fracPart = fractionalPart || '';

    if (!/^[01]+$/.test(intPart) || (fracPart && !/^[01]+$/.test(fracPart))) {
      setError('Invalid binary number. Only 0 and 1 are allowed');
      return;
    }

    let converted = '';
    let conversionSteps = [];

    // Convert integer part
    const decimalInteger = parseInt(intPart, 2);
    
    // Convert fractional part
    let decimalFraction = 0;
    if (fracPart) {
      for (let i = 0; i < fracPart.length; i++) {
        decimalFraction += parseInt(fracPart[i]) * Math.pow(2, -(i + 1));
      }
    }

    const totalDecimal = decimalInteger + decimalFraction;

    switch (targetSystem) {
      case 'decimal':
        converted = totalDecimal.toString();
        conversionSteps = generateDecimalSteps(intPart, fracPart);
        break;
      case 'octal':
        converted = convertToOctal(decimalInteger, decimalFraction);
        conversionSteps = generateOctalSteps(intPart, fracPart, decimalInteger, decimalFraction);
        break;
      case 'hexadecimal':
        converted = convertToHex(decimalInteger, decimalFraction);
        conversionSteps = generateHexSteps(intPart, fracPart, decimalInteger, decimalFraction);
        break;
      default:
        converted = totalDecimal.toString();
    }

    setResult(converted);
    setSteps(conversionSteps);
  };

  const convertToOctal = (intPart, fracPart) => {
    let octalInt = intPart.toString(8);
    let octalFrac = '';
    
    if (fracPart > 0) {
      let current = fracPart;
      let count = 0;
      while (current > 0 && count < 10) {
        current *= 8;
        const digit = Math.floor(current);
        octalFrac += digit.toString();
        current -= digit;
        count++;
      }
    }
    
    return octalFrac ? `${octalInt}.${octalFrac}` : octalInt;
  };

  const convertToHex = (intPart, fracPart) => {
    let hexInt = intPart.toString(16).toUpperCase();
    let hexFrac = '';
    
    if (fracPart > 0) {
      let current = fracPart;
      let count = 0;
      while (current > 0 && count < 10) {
        current *= 16;
        const digit = Math.floor(current);
        hexFrac += hexDigits[digit];
        current -= digit;
        count++;
      }
    }
    
    return hexFrac ? `${hexInt}.${hexFrac}` : hexInt;
  };

  const generateDecimalSteps = (intPart, fracPart) => {
    const steps = [];
    
    // Integer part steps
    const intLen = intPart.length;
    for (let i = 0; i < intLen; i++) {
      const bit = intPart[intLen - 1 - i];
      const power = i;
      const value = parseInt(bit) * Math.pow(2, power);
      steps.push({
        type: 'integer',
        position: intLen - 1 - i,
        bit: bit,
        power: power,
        calculation: `${bit} × 2^${power} = ${value}`,
        value: value
      });
    }
    
    // Fractional part steps
    if (fracPart) {
      for (let i = 0; i < fracPart.length; i++) {
        const bit = fracPart[i];
        const power = -(i + 1);
        const value = parseInt(bit) * Math.pow(2, power);
        steps.push({
          type: 'fractional',
          position: i,
          bit: bit,
          power: power,
          calculation: `${bit} × 2^${power} = ${value.toFixed(10)}`,
          value: value
        });
      }
    }
    
    return steps;
  };

  const generateOctalSteps = (intPart, fracPart, decimalInt, decimalFrac) => {
    const steps = [];
    
    steps.push({
      type: 'conversion-info',
      description: `Converting ${intPart}${fracPart ? '.' + fracPart : ''} (binary) to octal`
    });

    // Integer part conversion
    steps.push({
      type: 'section-header',
      title: 'Integer Part Conversion'
    });

    if (decimalInt === 0) {
      steps.push({ quotient: 0, remainder: 0, division: '0 ÷ 8 = 0', partType: 'integer' });
    } else {
      let current = decimalInt;
      while (current > 0) {
        const quotient = Math.floor(current / 8);
        const remainder = current % 8;
        steps.push({
          quotient,
          remainder,
          division: `${current} ÷ 8 = ${quotient}`,
          partType: 'integer'
        });
        current = quotient;
      }
    }

    // Fractional part conversion
    if (fracPart && decimalFrac > 0) {
      steps.push({
        type: 'section-header',
        title: 'Fractional Part Conversion'
      });

      let current = decimalFrac;
      let count = 0;
      while (current > 0 && count < 10) {
        current *= 8;
        const digit = Math.floor(current);
        steps.push({
          multiplication: `${(current / 8).toFixed(10)} × 8 = ${current.toFixed(10)}`,
          digit: digit,
          partType: 'fractional'
        });
        current -= digit;
        count++;
      }
    }
    
    return steps;
  };

  const generateHexSteps = (intPart, fracPart, decimalInt, decimalFrac) => {
    const steps = [];
    
    steps.push({
      type: 'conversion-info',
      description: `Converting ${intPart}${fracPart ? '.' + fracPart : ''} (binary) to hexadecimal`
    });

    // Integer part conversion
    steps.push({
      type: 'section-header',
      title: 'Integer Part Conversion'
    });

    if (decimalInt === 0) {
      steps.push({ quotient: 0, remainder: '0', division: '0 ÷ 16 = 0', partType: 'integer' });
    } else {
      let current = decimalInt;
      while (current > 0) {
        const quotient = Math.floor(current / 16);
        const remainder = current % 16;
        steps.push({
          quotient,
          remainder: hexDigits[remainder],
          division: `${current} ÷ 16 = ${quotient}`,
          partType: 'integer'
        });
        current = quotient;
      }
    }

    // Fractional part conversion
    if (fracPart && decimalFrac > 0) {
      steps.push({
        type: 'section-header',
        title: 'Fractional Part Conversion'
      });

      let current = decimalFrac;
      let count = 0;
      while (current > 0 && count < 10) {
        current *= 16;
        const digit = Math.floor(current);
        steps.push({
          multiplication: `${(current / 16).toFixed(10)} × 16 = ${current.toFixed(10)}`,
          digit: hexDigits[digit],
          partType: 'fractional'
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

  const targetBase = targetSystem === 'decimal' ? 10 : targetSystem === 'octal' ? 8 : 16;
  const targetName = targetSystem.charAt(0).toUpperCase() + targetSystem.slice(1);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed flex items-start justify-center p-4 md:p-10" style={{backgroundImage: `url(${BinImage}) `,}}>
    
      <div className="w-full max-w-6xl">
        <button className='text-white flex backdrop-blur-sm bg-white/10 px-3  py-1 rounded-lg md:w-24' onClick={()=>navigate(-1)}> 
              <FaCaretLeft className='size-4  mt-1'/> Back</button>
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-14 h-14 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-wide">
            Binary Converter Hub
          </h1>
          <p className="text-purple-200 text-lg">
            Convert Binary (Base-2) with fractions to Decimal, Octal, or Hexadecimal
          </p>
          <marquee className="text-red-500">NOTE** Refresh page for remove the data,,</marquee>
       
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl p-6 shadow-2xl border border-white/20 h-full">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                <Binary className="w-5 h-5 mr-3 text-yellow-300" />
                How Conversion Works
              </h3>

              <div className="space-y-4 text-sm text-purple-100 h-auto">
                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-yellow-300 mb-2">📘 Decimal (Base-10)</h4>
                  <p className="mb-2">Integer: Powers of 2 (2³, 2², 2¹, 2⁰)</p>
                  <p className="mb-2">Fraction: Negative powers (2⁻¹, 2⁻², 2⁻³)</p>
                  <div className="mt-3 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-yellow-200">Example: 101.101 → Decimal</p>
                    <p className="text-xs mt-1">Integer: 1×2² + 0×2¹ + 1×2⁰ = 5</p>
                    <p className="text-xs">Fraction: 1×2⁻¹ + 0×2⁻² + 1×2⁻³ = 0.625</p>
                    <p className="text-green-300 font-bold mt-1">Result: 5.625</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 border border-white/10 h-auto">
                  <h4 className="font-bold text-blue-300 mb-2">📗 Octal (Base-8)</h4>
                  <p className="mb-2">Integer: Divide by 8, read remainders reverse</p>
                  <p className="mb-2">Fraction: Multiply by 8, take integer parts</p>
                  <div className="mt-3 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-blue-200">Example: 101.11 → Octal</p>
                    <p className="text-xs mt-1">5.75₁₀ = 5.6₈</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 border border-white/10 h-auto">
                  <h4 className="font-bold text-pink-300 mb-2">📙 Hexadecimal (Base-16)</h4>
                  <p className="mb-2">Integer: Divide by 16, read remainders reverse</p>
                  <p className="mb-2">Fraction: Multiply by 16, take integer parts</p>
                  <div className="mt-2 bg-purple-900/50 rounded p-2">
                    <p className="font-semibold text-pink-200">Example: 1111.1111 → Hex</p>
                    <p className="text-xs mt-1">15.9375₁₀ = F.F₁₆</p>
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
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="flex items-center text-white text-sm font-semibold mb-3">
                      Integer Part (BINARY)
                    </label>
                    <input
                      type="text"
                      value={integerPart}
                      onChange={(e) => setIntegerPart(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g., 101"
                      className="w-full px-4 py-3 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-purple-200 text-lg font-mono focus:outline-none focus:border-yellow-300 focus:bg-white/30 transition-all"
                    />
                  </div>
                  
                  

                  <div>
                    <label className="flex items-center text-white text-sm font-semibold mb-3">
                      Fractional Part (BINARY)
                    </label>
                    <input
                      type="text"
                      value={fractionalPart}
                      onChange={(e) => setFractionalPart(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder=".101"
                      
                      
                      className="w-full px-4 py-3 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-purple-200 text-lg font-mono focus:outline-none focus:border-yellow-300 focus:bg-white/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-white text-sm font-semibold mb-3">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Convert To
                  </label>
                  <select
                    value={targetSystem}
                    onChange={(e) => setTargetSystem(e.target.value)}
                    className="w-full px-6 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white text-xl focus:outline-none focus:border-yellow-300 focus:bg-white/30 transition-all cursor-pointer"
                  >
                    <option value="decimal" className="bg-purple-900">Decimal (Base-10)</option>
                    <option value="octal" className="bg-purple-900">Octal (Base-8)</option>
                    <option value="hexadecimal" className="bg-purple-900">Hexadecimal (Base-16)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={convertNumber}
                className="w-full py-4 cursor-pointer mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-purple-900 font-extrabold text-xl rounded-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center uppercase tracking-wider"
              >
                <Calculator className="w-6 h-6 mr-3" />
                Start Conversion
              </button>
            </div>
            
            
            <div>
              {error && (
                <div className="bg-red-500/30 rounded-xl p-4 border-2 border-red-300/50 animate-pulse">
                  <p className="text-red-100 font-semibold flex items-center">
                    ⚠️ {error}
                  </p>
                </div>
              )}
            </div>

            {steps.length > 0 && (
              <div className="mt-8">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-yellow-300" />
                  Step-by-Step Conversion
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  {targetSystem === 'decimal' ? (
                    <>
                      {steps.filter(s => s.type === 'integer').length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-yellow-300 font-bold mb-3">Integer Part:- ({""+integerPart})</h4>
                          <div className="space-y-2">
                            {steps.filter(s => s.type === 'integer').map((step, index) => (
                              <div key={index} className="flex items-center space-x-4 bg-white/10 rounded-lg p-3 border border-white/20">
                                <span className="bg-yellow-400 text-purple-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                                  {index + 1}
                                </span>
                                <span className="text-white font-mono">
                                  {step.calculation}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {steps.filter(s => s.type === 'fractional').length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-blue-300 font-bold mb-3">Fractional Part:- ({ "."+fractionalPart})</h4>
                          <div className="space-y-2">
                            {steps.filter(s => s.type === 'fractional').map((step, index) => (
                              <div key={index} className="flex items-center space-x-4 bg-white/10 rounded-lg p-3 border border-white/20">
                                <span className="bg-blue-400 text-purple-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                                  {index + 1}
                                </span>
                                <span className="text-white font-mono text-sm">
                                  {step.calculation}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                     <div className="space-y-4 mb-6">
              

              {result && (
                <div className="bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-xl p-6 border-2 border-green-300/50 shadow-xl">
                  <p className="text-green-100 text-lg font-semibold mb-2">
                    ✅ Converted 
                  </p>
                  <button className="text-white text-2xl font-extrabold break-all bg-green-500 rounded-md p-2 font-mono tracking-wider">
                   ({integerPart || '0'}{fractionalPart ? '.' + fractionalPart : ''})<sub className="text-xl">2</sub> ({result})<sub className="text-xl">{targetBase}</sub>
                  </button>
                </div>
              )}
            </div>
                    </>
                  ) : (
                    <>
                      {steps.filter(s => s.partType === 'integer').length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-yellow-300 font-bold mb-3">Integer Part:- ({integerPart + "=> decimal =>"}) (Divide by {targetBase}):</h4>
                          <div className="space-y-2">
                            {steps.filter(s => s.partType === 'integer').map((step, index) => (
                              <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3 border border-white/20">
                                <span className="text-white font-mono">{step.division}</span>
                                <span className="text-yellow-300 font-bold">remainder: {step.remainder}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-purple-200 text-sm mt-2">Read remainders from bottom to top</p>
                        </div>
                      )}

                      {steps.filter(s => s.partType === 'fractional').length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-blue-300 font-bold mb-3">Fractional Part:-({"."+fractionalPart}) (Multiply by {targetBase}):</h4>
                          <div className="space-y-2">
                            {steps.filter(s => s.partType === 'fractional').map((step, index) => (
                              <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3 border border-white/20">
                                <span className="text-white font-mono text-sm">{step.multiplication}</span>
                                <span className="text-blue-300 font-bold">digit: {step.digit}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-purple-200 text-sm mt-2">Read digits from top to bottom</p>
                        </div>
                      )}

                      <div className="mt-6 pt-6 border-t border-white/20">
                        <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-4 border-2 border-yellow-300/50">
                          <p className="text-yellow-100 text-sm mb-3 font-semibold text-center">
                            Final Result
                          </p>
                          <div className="text-center">
                            <span className="bg-green-500 text-white font-extrabold px-4 py-2 rounded-lg text-2xl shadow-xl">
                              ({result})<sub className="text-xl">{targetBase}</sub>
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-white mt-10 text-sm">
          Developed by RAHUL  Enter binary numbers with optional fractional parts (e.g., 101.101)
        </p>
      </div>
    </div>
  );
}

export default BinaryConverter;