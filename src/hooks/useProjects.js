import { useEffect, useState } from "react";
import { getAllProjects } from "../services/admin";

export default function useProjects() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjectLists] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await getAllProjects();
        setProjectLists(response?.data);
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return { isLoading, projects };
}
