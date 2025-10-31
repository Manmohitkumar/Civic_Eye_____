
import { useQuery } from "@tanstack/react-query";

// Types
export type Locality = {
  id: string;
  name: string;
};

export type Society = {
  id: string;
  name: string;
  locality_id: string;
};

export type FurnishingStatus = "Unfurnished" | "Semi-Furnished" | "Furnished";

export type PropertyDetails = {
  locality: string;
  society: string;
  bedrooms: number;
  bathrooms: number;
  builtUpArea: number;
  furnishingStatus: FurnishingStatus;
  floorNo: number;
  totalFloors: number;
  buildingAge: number;
  // Optional properties for name lookup
  localityName?: string;
  societyName?: string;
  // Building type
  buildingType?: "Highrise" | "Standalone";
};

export type PredictionResponse = {
  success: boolean;
  estimated_rent: number;
  predictions: {
    model_a: number;
    model_b: number;
    area_based: number;
  };
  confidence: "low" | "medium" | "high";
  message: string;
  error: string | null;
};

// Base URL for the API
const API_BASE_URL = "https://rent-prediction-api.onrender.com";

// Fetch all localities
export const fetchLocalities = async () => {
  const response = await fetch(`${API_BASE_URL}/localities`);
  if (!response.ok) {
    throw new Error('Failed to fetch localities');
  }
  return response.json();
};

// Custom hook for localities data
export const useLocalities = () => {
  return useQuery({
    queryKey: ['localities'],
    queryFn: fetchLocalities,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Fetch all societies
export const fetchSocieties = async () => {
  const response = await fetch(`${API_BASE_URL}/societies`);
  if (!response.ok) {
    throw new Error('Failed to fetch societies');
  }
  const data = await response.json();
  
  // Transform data if needed
  if (data.societies && Array.isArray(data.societies)) {
    return data.societies.map((name: string, index: number) => ({
      id: `society-${index}`,
      name,
      locality_id: 'all' // Default value, will be filtered by locality in UI
    }));
  }
  
  return Array.isArray(data) ? data : [];
};

// Custom hook for societies data
export const useSocieties = () => {
  return useQuery({
    queryKey: ['societies'],
    queryFn: fetchSocieties,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Filter societies by locality ID
export const getSocietiesByLocality = (societies: Society[], localityId: string): Society[] => {
  // For now, return all societies since we don't have proper locality_id mapping
  // This can be improved once we have proper data structure
  if (!Array.isArray(societies)) {
    console.error("Societies is not an array:", societies);
    return [];
  }
  return societies;
};

// Predict rent based on property details
export const predictRent = async (propertyDetails: PropertyDetails): Promise<PredictionResponse> => {
  console.log("Sending prediction request with data:", propertyDetails);
  
  // Use /predict-rent endpoint as specified
  const endpoint = `${API_BASE_URL}/predict-rent`;
  console.log("Using API endpoint:", endpoint);
  
  // Use locality and society names instead of IDs for the API request
  const requestPayload = {
    locality: propertyDetails.localityName || propertyDetails.locality,
    society: propertyDetails.societyName || propertyDetails.society,
    bedrooms: propertyDetails.bedrooms,
    bathrooms: propertyDetails.bathrooms,
    builtup_area: propertyDetails.builtUpArea,
    floor: propertyDetails.floorNo,
    total_floors: propertyDetails.totalFloors,
    furnishing: propertyDetails.furnishingStatus,
    building_age: propertyDetails.buildingAge,
    building_type: propertyDetails.buildingType || "Highrise"
  };
  
  console.log("Transformed request payload:", requestPayload);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });
    
    console.log("API response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", errorText);
      throw new Error(`Failed to get rent prediction: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error("Prediction API error:", error);
    
    // Return a fallback response for demonstration purposes
    return {
      success: false,
      estimated_rent: 0,
      predictions: {
        model_a: 0,
        model_b: 0,
        area_based: 0
      },
      confidence: "low",
      message: "Unable to connect to the prediction service",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};
