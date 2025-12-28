import React, { useState } from 'react';
import { Calculator, Calendar, Baby, Utensils, Scale } from 'lucide-react';

const HealthCalculators = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Age Calculator State
  const [birthDate, setBirthDate] = useState('');
  const [ageResult, setAgeResult] = useState(null);

  // Ideal Weight Calculator State
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weightResult, setWeightResult] = useState(null);

  // Hijri to Gregorian State
  const [hijriDay, setHijriDay] = useState('');
  const [hijriMonth, setHijriMonth] = useState('1');
  const [hijriYear, setHijriYear] = useState('');
  const [gregorianResult, setGregorianResult] = useState(null);

  // Pregnancy Calculator State
  const [lastPeriod, setLastPeriod] = useState('');
  const [pregnancyResult, setPregnancyResult] = useState(null);

  // Calorie Calculator State
  const [calorieAge, setCalorieAge] = useState('');
  const [calorieHeight, setCalorieHeight] = useState('');
  const [calorieWeight, setCalorieWeight] = useState('');
  const [calorieGender, setCalorieGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [calorieResult, setCalorieResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const today = new Date();
    const birth = new Date(birthDate);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAgeResult({ years, months, days });
  };

  const calculateIdealWeight = () => {
    if (!height || !age) return;
    const h = parseFloat(height);
    
    // Using Devine formula adjusted for age
    let idealWeight;
    if (gender === 'male') {
      idealWeight = 50 + 0.9 * (h - 152);
    } else {
      idealWeight = 45.5 + 0.9 * (h - 152);
    }

    // Adjust for age
    if (age > 50) {
      idealWeight *= 0.95;
    }

    const minWeight = idealWeight * 0.9;
    const maxWeight = idealWeight * 1.1;

    setWeightResult({
      ideal: idealWeight.toFixed(1),
      min: minWeight.toFixed(1),
      max: maxWeight.toFixed(1)
    });
  };

  const convertHijriToGregorian = () => {
    if (!hijriDay || !hijriYear) return;
    
    // Approximate conversion (simplified algorithm)
    const hijriYearInt = parseInt(hijriYear);
    const hijriMonthInt = parseInt(hijriMonth);
    const hijriDayInt = parseInt(hijriDay);
    
    const gregorianYear = Math.floor((hijriYearInt * 33 / 32) + 622);
    const approximateDate = new Date(gregorianYear, hijriMonthInt - 1, hijriDayInt);
    
    setGregorianResult(approximateDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  };

  const calculatePregnancy = () => {
    if (!lastPeriod) return;
    
    const lmp = new Date(lastPeriod);
    const today = new Date();
    const diffTime = today - lmp;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    
    // Calculate due date (280 days from LMP)
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280);
    
    const remainingDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    
    setPregnancyResult({
      weeks,
      days,
      dueDate: dueDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      remainingDays
    });
  };

  const calculateCalories = () => {
    if (!calorieAge || !calorieHeight || !calorieWeight) return;
    
    const w = parseFloat(calorieWeight);
    const h = parseFloat(calorieHeight);
    const a = parseFloat(calorieAge);
    
    // Mifflin-St Jeor Equation
    let bmr;
    if (calorieGender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }
    
    // Activity multipliers
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    const tdee = bmr * multipliers[activityLevel];
    
    setCalorieResult({
      maintain: Math.round(tdee),
      lose: Math.round(tdee - 500),
      gain: Math.round(tdee + 500)
    });
  };

  const AdSpace = () => (
    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center my-6">
      <p className="text-gray-500">Advertisement Space</p>
      <p className="text-sm text-gray-400">Your ads will appear here</p>
    </div>
  );

  const renderHome = () => (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Health & Date Calculators</h1>
      
      <AdSpace />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setCurrentPage('age')}
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center gap-4"
        >
          <Calculator className="w-12 h-12 text-blue-500" />
          <h2 className="text-xl font-semibold">Age Calculator</h2>
          <p className="text-gray-600 text-center">Calculate your exact age in years, months, and days</p>
        </button>

        <button
          onClick={() => setCurrentPage('weight')}
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center gap-4"
        >
          <Scale className="w-12 h-12 text-green-500" />
          <h2 className="text-xl font-semibold">Ideal Weight Calculator</h2>
          <p className="text-gray-600 text-center">Find your ideal weight based on height and age</p>
        </button>

        <button
          onClick={() => setCurrentPage('hijri')}
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center gap-4"
        >
          <Calendar className="w-12 h-12 text-purple-500" />
          <h2 className="text-xl font-semibold">Hijri to Gregorian</h2>
          <p className="text-gray-600 text-center">Convert Islamic calendar dates to Gregorian</p>
        </button>

        <button
          onClick={() => setCurrentPage('pregnancy')}
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center gap-4"
        >
          <Baby className="w-12 h-12 text-pink-500" />
          <h2 className="text-xl font-semibold">Pregnancy Calculator</h2>
          <p className="text-gray-600 text-center">Calculate pregnancy weeks and due date</p>
        </button>

        <button
          onClick={() => setCurrentPage('calories')}
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center gap-4 md:col-span-2"
        >
          <Utensils className="w-12 h-12 text-orange-500" />
          <h2 className="text-xl font-semibold">Calorie Calculator</h2>
          <p className="text-gray-600 text-center">Calculate daily calorie needs based on your profile</p>
        </button>
      </div>
      
      <AdSpace />
    </div>
  );

  const renderAgeCalculator = () => (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={() => setCurrentPage('home')} className="mb-4 text-blue-600 hover:underline">← Back to Home</button>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Age Calculator</h1>
      
      <AdSpace />
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Enter your birth date:</span>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </label>
        
        <button
          onClick={calculateAge}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Calculate Age
        </button>
        
        {ageResult && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your Age:</h3>
            <p className="text-3xl font-bold text-blue-600">
              {ageResult.years} years, {ageResult.months} months, {ageResult.days} days
            </p>
          </div>
        )}
      </div>
      
      <AdSpace />
    </div>
  );

  const renderWeightCalculator = () => (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={() => setCurrentPage('home')} className="mb-4 text-blue-600 hover:underline">← Back to Home</button>
      <h1 className="text-3xl font-bold mb-6 text-green-600">Ideal Weight Calculator</h1>
      
      <AdSpace />
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Height (cm):</span>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Age:</span>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="30"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Gender:</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        
        <button
          onClick={calculateIdealWeight}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Calculate Ideal Weight
        </button>
        
        {weightResult && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your Ideal Weight:</h3>
            <p className="text-2xl font-bold text-green-600 mb-2">{weightResult.ideal} kg</p>
            <p className="text-gray-600">Healthy range: {weightResult.min} - {weightResult.max} kg</p>
          </div>
        )}
      </div>
      
      <AdSpace />
    </div>
  );

  const renderHijriConverter = () => (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={() => setCurrentPage('home')} className="mb-4 text-blue-600 hover:underline">← Back to Home</button>
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Hijri to Gregorian Converter</h1>
      
      <AdSpace />
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Hijri Day:</span>
          <input
            type="number"
            value={hijriDay}
            onChange={(e) => setHijriDay(e.target.value)}
            placeholder="15"
            min="1"
            max="30"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Hijri Month:</span>
          <select
            value={hijriMonth}
            onChange={(e) => setHijriMonth(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="1">Muharram</option>
            <option value="2">Safar</option>
            <option value="3">Rabi al-Awwal</option>
            <option value="4">Rabi al-Thani</option>
            <option value="5">Jumada al-Awwal</option>
            <option value="6">Jumada al-Thani</option>
            <option value="7">Rajab</option>
            <option value="8">Sha'ban</option>
            <option value="9">Ramadan</option>
            <option value="10">Shawwal</option>
            <option value="11">Dhu al-Qi'dah</option>
            <option value="12">Dhu al-Hijjah</option>
          </select>
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Hijri Year:</span>
          <input
            type="number"
            value={hijriYear}
            onChange={(e) => setHijriYear(e.target.value)}
            placeholder="1446"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </label>
        
        <button
          onClick={convertHijriToGregorian}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          Convert to Gregorian
        </button>
        
        {gregorianResult && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Gregorian Date:</h3>
            <p className="text-2xl font-bold text-purple-600">{gregorianResult}</p>
            <p className="text-sm text-gray-500 mt-2">Note: This is an approximate conversion</p>
          </div>
        )}
      </div>
      
      <AdSpace />
    </div>
  );

  const renderPregnancyCalculator = () => (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={() => setCurrentPage('home')} className="mb-4 text-blue-600 hover:underline">← Back to Home</button>
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Pregnancy Calculator</h1>
      
      <AdSpace />
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">First Day of Last Period:</span>
          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </label>
        
        <button
          onClick={calculatePregnancy}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-semibold"
        >
          Calculate Pregnancy
        </button>
        
        {pregnancyResult && (
          <div className="mt-6 p-4 bg-pink-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Pregnancy Information:</h3>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Current Week:</span>{' '}
                <span className="text-pink-600 font-bold">{pregnancyResult.weeks} weeks, {pregnancyResult.days} days</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold">Due Date:</span>{' '}
                <span className="text-pink-600 font-bold">{pregnancyResult.dueDate}</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold">Days Remaining:</span>{' '}
                <span className="text-pink-600 font-bold">{pregnancyResult.remainingDays} days</span>
              </p>
            </div>
          </div>
        )}
      </div>
      
      <AdSpace />
    </div>
  );

  const renderCalorieCalculator = () => (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={() => setCurrentPage('home')} className="mb-4 text-blue-600 hover:underline">← Back to Home</button>
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Calorie Calculator</h1>
      
      <AdSpace />
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Age:</span>
          <input
            type="number"
            value={calorieAge}
            onChange={(e) => setCalorieAge(e.target.value)}
            placeholder="30"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Height (cm):</span>
          <input
            type="number"
            value={calorieHeight}
            onChange={(e) => setCalorieHeight(e.target.value)}
            placeholder="170"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Weight (kg):</span>
          <input
            type="number"
            value={calorieWeight}
            onChange={(e) => setCalorieWeight(e.target.value)}
            placeholder="70"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Gender:</span>
          <select
            value={calorieGender}
            onChange={(e) => setCalorieGender(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Activity Level:</span>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (exercise 6-7 days/week)</option>
            <option value="veryActive">Very Active (intense exercise daily)</option>
          </select>
        </label>
        
        <button
          onClick={calculateCalories}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
        >
          Calculate Calories
        </button>
        
        {calorieResult && (
          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Daily Calorie Needs:</h3>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Maintain Weight:</span>{' '}
                <span className="text-orange-600 font-bold">{calorieResult.maintain} calories/day</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold">Lose Weight:</span>{' '}
                <span className="text-orange-600 font-bold">{calorieResult.lose} calories/day</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold">Gain Weight:</span>{' '}
                <span className="text-orange-600 font-bold">{calorieResult.gain} calories/day</span>
              </p>
            </div>
          </div>
        )}
      </div>
      
      <AdSpace />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {currentPage === 'home' && renderHome()}
      {currentPage === 'age' && renderAgeCalculator()}
      {currentPage === 'weight' && renderWeightCalculator()}
      {currentPage === 'hijri' && renderHijriConverter()}
      {currentPage === 'pregnancy' && renderPregnancyCalculator()}
      {currentPage === 'calories' && renderCalorieCalculator()}
    </div>
  );
};

export default HealthCalculators;