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
          const fetchedUnis = snapshot.docs.map(doc => {
            const data = doc.data();
            // Check if it's the new complex schema (has stats, media instead of direct flat fields)
            if (data.stats && data.media && typeof data.location === 'object') {
              return {
                id: doc.id,
                name: data.name,
                location: data.location.city || data.location.country,
                country: data.location.country,
                type: data.type,
                tier: (data.rankings && data.rankings.national <= 3) ? 'Top Tier' : 'Mid Tier',
                tuitionBDT: (data.stats.estimatedLivingCostUSD || 2000) * 110,
                acceptanceRate: data.stats.acceptanceRate || 10,
                requirements: { minGPA: 4.0 },
                scholarshipsAvailable: true,
                imageUrl: data.media.coverImageUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f'
              } as University;
            }
            // Fallback for old schema
            return {
              id: doc.id,
              ...data
            } as University;
          });
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

export function usePrograms() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgs() {
      try {
        const snapshot = await getDocs(collection(db, 'programs'));
        if (!snapshot.empty) {
          const fetchedProgs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPrograms(fetchedProgs);
        } else {
          setPrograms([]);
        }
      } catch (error) {
        console.error("Error fetching programs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProgs();
  }, []);

  return { programs, loading };
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
