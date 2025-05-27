import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useUserId() {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Generate a unique session ID for this browser session
    const sessionUserId = sessionStorage.getItem('sessionUserId');
    
    if (sessionUserId) {
      setUserId(sessionUserId);
    } else {
      const newUserId = uuidv4();
      sessionStorage.setItem('sessionUserId', newUserId);
      setUserId(newUserId);
    }
  }, []);

  return userId;
}