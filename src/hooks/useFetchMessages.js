import { useEffect, useState } from "react";
import { getAllMessages } from "../services/admin";

export default function useFetchMessages(filter) {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessageLists] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await getAllMessages(filter);
        setMessageLists(response?.data?.reverse());
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [filter]);

  return { isLoading, messages, setMessageLists };
}
