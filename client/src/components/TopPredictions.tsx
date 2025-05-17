import React from 'react';
import { Check, AlertTriangle, Clock, Award } from 'lucide-react';

interface TopPredictionsProps {
  predictions: string[];
  analysisData: any[];
}

const TopPredictions: React.FC<TopPredictionsProps> = ({ predictions, analysisData }) => {
  console.log("Predictions:", predictions)
  console.log("Analysis Data:", analysisData)
  // Find the analysis data for each prediction
  const predictionDetails = predictions.map(prediction => {
    return analysisData.find(item => item.material === prediction);
  });

  const getIconBgColor = (prediction: any) => {
    if (!prediction) return 'bg-gray-200';

    // Colors based on suitability
    if (prediction.within_budget === 'Yes' &&
      (prediction.suitable_for_coastal_environment === 'Yes' ||
        prediction.eco_friendly === 'Yes')) {
      return 'bg-green-100 text-green-600';
    } else if (prediction.within_budget === 'No') {
      return 'bg-red-100 text-red-600';
    } else {
      return 'bg-amber-100 text-amber-600';
    }
  };

  const getPredictionIcon = (prediction: any) => {
    if (!prediction) return <AlertTriangle size={20} />;

    if (prediction.within_budget === 'Yes' &&
      (prediction.suitable_for_coastal_environment === 'Yes' ||
        prediction.eco_friendly === 'Yes')) {
      return <Check size={20} />;
    } else if (prediction.within_budget === 'No') {
      return <AlertTriangle size={20} />;
    } else {
      return <Clock size={20} />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <Award className="text-blue-700 mr-2" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Top Material Predictions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictionDetails.map((prediction, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-center mb-3">
              <div className={`p-2 rounded-full mr-3 ${getIconBgColor(prediction)}`}>
                {getPredictionIcon(prediction)}
              </div>
              <h3 className="text-lg font-semibold">{predictions[index]}</h3>
            </div>

            {prediction && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Strength:</span>
                  <span className="font-medium">{prediction.strength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durability:</span>
                  <span className="font-medium">{prediction.durability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className={`font-medium ${prediction.within_budget === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
                    {prediction.cost_estimate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Within Budget:</span>
                  <span className={`font-medium ${prediction.within_budget === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
                    {prediction.within_budget}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPredictions;