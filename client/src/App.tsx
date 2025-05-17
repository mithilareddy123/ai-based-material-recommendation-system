import { useState } from 'react';
import { FormData, RecommendationResponse } from './types';
import { getMaterialRecommendations } from './services/api';
import Header from './components/Header';
import InputForm from './components/InputForm';
import TopPredictions from './components/TopPredictions';
import CompetitorAnalysis from './components/CompetitorAnalysis';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RecommendationResponse | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await getMaterialRecommendations(data);
      setResults(response);
      setShowResults(true);

      // Smooth scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="mb-8">
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {showResults && results && (
          <div id="results-section" className="space-y-8 animate-fadeIn">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">AI Recommendation Results</h2>
              <p className="text-gray-600">
                Based on your inputs, our AI system has analyzed various materials and provided the following recommendations.
                The materials are ranked based on their suitability for your specific requirements including budget constraints,
                environmental factors, strength requirements, and desired durability.
              </p>
            </div>

            <TopPredictions
              predictions={results.top_3_predictions}
              analysisData={results.competitor_analysis}
            />

            <CompetitorAnalysis data={results.competitor_analysis} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;