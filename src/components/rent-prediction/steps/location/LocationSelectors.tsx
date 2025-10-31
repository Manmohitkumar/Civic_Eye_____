
import React, { useState, useEffect } from 'react';
import { MapPin, Building } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  useLocalities, 
  useSocieties, 
  getSocietiesByLocality,
  Locality,
  Society
} from '@/services/rentPredictionApi';
import { useRentPrediction } from '../../RentPredictionContext';

const LocationSelectors: React.FC = () => {
  const { 
    propertyDetails, 
    updatePropertyDetails
  } = useRentPrediction();
  
  const [filteredSocieties, setFilteredSocieties] = useState<Society[]>([]);
  // Store mappings of IDs to names
  const [localityMap, setLocalityMap] = useState<Record<string, string>>({});
  const [societyMap, setSocietyMap] = useState<Record<string, string>>({});
  
  const { data: localities, isLoading: isLoadingLocalities } = useLocalities();
  const { data: societies, isLoading: isLoadingSocieties } = useSocieties();

  // Update filtered societies when locality changes
  useEffect(() => {
    if (societies && propertyDetails.locality) {
      const societiesArray = Array.isArray(societies) ? societies : [];
      setFilteredSocieties(getSocietiesByLocality(societiesArray, propertyDetails.locality));
    }
  }, [societies, propertyDetails.locality]);

  // Update locality and society maps when data is loaded
  useEffect(() => {
    if (localities && localities.localities) {
      const locMap: Record<string, string> = {};
      localities.localities.forEach((name: string, index: number) => {
        const id = `locality-${index}`;
        locMap[id] = name;
      });
      setLocalityMap(locMap);
    }
  }, [localities]);

  useEffect(() => {
    if (societies && Array.isArray(societies)) {
      const socMap: Record<string, string> = {};
      societies.forEach((society: Society) => {
        socMap[society.id] = society.name;
      });
      setSocietyMap(socMap);
    }
  }, [societies]);

  const handleLocalityChange = (localityId: string) => {
    updatePropertyDetails({ 
      locality: localityId, 
      localityName: localityMap[localityId],
      society: undefined,
      societyName: undefined
    });
  };

  const handleSocietyChange = (societyId: string) => {
    updatePropertyDetails({ 
      society: societyId,
      societyName: societyMap[societyId]
    });
  };

  // Transform localities data into the expected format
  const localitiesList = localities && localities.localities ? 
    localities.localities.map((name: string, index: number) => ({
      id: `locality-${index}`,
      name
    })) : [];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <MapPin size={18} className="theme-accent-text" />
          Locality
        </label>
        <Select
          value={propertyDetails.locality}
          onValueChange={handleLocalityChange}
          disabled={isLoadingLocalities}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a locality" />
          </SelectTrigger>
          <SelectContent>
            {isLoadingLocalities ? (
              <SelectItem value="loading" disabled>Loading localities...</SelectItem>
            ) : localitiesList.length > 0 ? (
              localitiesList.map((locality: Locality) => (
                <SelectItem key={locality.id} value={locality.id}>
                  {locality.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-data" disabled>No localities available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <Building size={18} className="theme-accent-text" />
          Society
        </label>
        <Select
          value={propertyDetails.society}
          onValueChange={handleSocietyChange}
          disabled={isLoadingSocieties || !propertyDetails.locality}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={propertyDetails.locality ? "Select a society" : "Select locality first"} />
          </SelectTrigger>
          <SelectContent>
            {isLoadingSocieties ? (
              <SelectItem value="loading" disabled>Loading societies...</SelectItem>
            ) : !propertyDetails.locality ? (
              <SelectItem value="select-locality" disabled>Select a locality first</SelectItem>
            ) : filteredSocieties.length === 0 ? (
              <SelectItem value="no-societies" disabled>No societies found in this locality</SelectItem>
            ) : (
              filteredSocieties.map((society: Society) => (
                <SelectItem key={society.id} value={society.id}>
                  {society.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LocationSelectors;
