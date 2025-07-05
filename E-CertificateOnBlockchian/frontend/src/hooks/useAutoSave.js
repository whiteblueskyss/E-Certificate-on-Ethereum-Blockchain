import { useEffect, useRef, useState } from "react";

export const useAutoSave = (data, key, delay = 2000) => {
  const timeoutRef = useRef(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      if (data && Object.keys(data).length > 0) {
        // Only save if there's meaningful data
        const hasContent = Object.values(data).some(
          (value) => value !== null && value !== undefined && value !== ""
        );

        if (hasContent) {
          setIsAutoSaving(true);
          const saveData = {
            data,
            timestamp: new Date().toISOString(),
          };

          localStorage.setItem(`autosave_${key}`, JSON.stringify(saveData));
          setLastSaved(new Date());

          // Reset auto-saving state after a short delay
          setTimeout(() => setIsAutoSaving(false), 500);
        }
      }
    }, delay);

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, key, delay]);

  // Function to load saved data
  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem(`autosave_${key}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
    } catch (error) {
      console.error("Error loading auto-saved data:", error);
    }
    return null;
  };

  // Function to clear saved data
  const clearSavedData = () => {
    localStorage.removeItem(`autosave_${key}`);
    setLastSaved(null);
  };

  return {
    loadSavedData,
    clearSavedData,
    lastSaved,
    isAutoSaving,
  };
};

export default useAutoSave;
