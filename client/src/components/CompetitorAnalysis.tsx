import React, { useState } from 'react';
import { Check, X, Info } from 'lucide-react';
import { MaterialAnalysis } from '../types';

interface CompetitorAnalysisProps {
  data: MaterialAnalysis[];
}

const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ data }) => {
  console.log("Competitor:", data);
  const [expandedRemarks, setExpandedRemarks] = useState<string | null>(null);

  const toggleRemarks = (material: string) => {
    if (expandedRemarks === material) {
      setExpandedRemarks(null);
    } else {
      setExpandedRemarks(material);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Competitor Analysis</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Material
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Strength
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Durability
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Eco-Friendly
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cost Estimate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Coastal Suitable
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lead Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Budget Compatible
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.material}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.strength}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.durability}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="inline-flex items-center">
                    {item.eco_friendly === 'Yes' ? (
                      <Check className="text-green-500 mr-1" size={16} />
                    ) : (
                      <X className="text-red-500 mr-1" size={16} />
                    )}
                    {item.eco_friendly}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.cost_estimate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="inline-flex items-center">
                    {item.suitable_for_coastal_environment === 'Yes' ? (
                      <Check className="text-green-500 mr-1" size={16} />
                    ) : (
                      <X className="text-red-500 mr-1" size={16} />
                    )}
                    {item.suitable_for_coastal_environment}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.lead_time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="inline-flex items-center">
                    {item.within_budget === 'Yes' ? (
                      <Check className="text-green-500 mr-1" size={16} />
                    ) : (
                      <X className="text-red-500 mr-1" size={16} />
                    )}
                    {item.within_budget}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => toggleRemarks(item.material)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Info size={16} className="mr-1" />
                    {expandedRemarks === item.material ? 'Hide' : 'View'}
                  </button>
                </td>
              </tr>
              {expandedRemarks === item.material && (
                <tr className={index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-50'}>
                  <td colSpan={9} className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200">
                    <div className="p-3 rounded">
                      {item.remarks}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitorAnalysis;