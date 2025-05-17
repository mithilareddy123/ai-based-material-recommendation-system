import axios from 'axios';
import { FormData, RecommendationResponse } from '../types';
import { config } from '../config';

const API_URL = config.backendUrl;

console.log("API URL:", API_URL);

export const getMaterialRecommendations = async (formData: FormData): Promise<RecommendationResponse> => {
  try {
    const payload = {
      Project_Budget: formData.budget,
      Environment: formData.environment,
      Required_Strength: formData.requiredStrength,
      Durability_Priority: formData.durability,
      Eco_Preference: formData.ecoFriendly,
      Max_Lead_Time: formData.leadTime
    };

    const response = await axios.post(`${API_URL}/api/v1/predict`, payload);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};