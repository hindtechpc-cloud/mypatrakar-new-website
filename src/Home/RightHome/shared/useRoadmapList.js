import { useState } from "react";
import { useCallback } from "react";
import { loadNewsByRoadmapId } from "../../../../api";
const useRoadmapList = ( id) => {
  const [roadmaps, setRoadmaps] = useState([]);
  const loadRoadmap = useCallback(async () => {
    try {
      const response = await loadNewsByRoadmapId({roadmap_id:id})
      // console.log(response);
      setRoadmaps(response.data.response);
    } catch (err) {
      console.log("Error loading news:", err);
    }
    loadRoadmap();
  }, []);
  return {roadmaps, loadNewsByRoadmapId };
};
export default useRoadmapList;