import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { handleFirestoreError, OperationType } from './firebase-error';
import { University, UNIVERSITIES as MOCK_UNIVERSITIES } from './data';

export function useUniversities() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUnis() {
      try {
        const path = 'universities';
        const snapshot = await getDocs(collection(db, path));
        if (snapshot.empty) {
          // Fallback to mock data if empty
          setUniversities(MOCK_UNIVERSITIES);
        } else {
          const fetchedUnis = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as University[];
          setUniversities(fetchedUnis);
        }
      } catch (error) {
        console.error(error);
        // Fallback to mock on error just so the UI doesn't break entirely if unhandled
        setUniversities(MOCK_UNIVERSITIES);
      } finally {
        setLoading(false);
      }
    }
    fetchUnis();
  }, []);

  return { universities, loading };
}

// Helper to push mock data to Firebase (could be called from a hidden admin component or console)
export async function seedUniversities() {
  for (const uni of MOCK_UNIVERSITIES) {
    try {
      const { id, ...data } = uni;
      await setDoc(doc(db, 'universities', id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'universities', auth);
    }
  }
}
