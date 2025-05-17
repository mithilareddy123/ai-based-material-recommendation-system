export interface FormData {
  budget: string;
  environment: 'Coastal' | 'Dry' | 'Humid' | '';
  requiredStrength: 'Low' | 'Medium' | 'High' | '';
  durability: string;
  ecoFriendly: 'Yes' | 'No' | '';
  leadTime: string;
}

export interface MaterialAnalysis {
  material: string;
  strength: string;
  durability: string;
  eco_friendly: string;
  cost_estimate: string;
  suitable_for_coastal_environment: string;
  lead_time: string;
  within_budget: string;
  remarks: string;
}

export interface RecommendationResponse {
  top_3_predictions: string[];
  competitor_analysis: MaterialAnalysis[];
}