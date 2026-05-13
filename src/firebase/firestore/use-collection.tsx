
'use client';

import { useState, useEffect } from 'react';
import { Query, onSnapshot, query } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useCollection<T = any>(collectionQuery: Query | null) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!collectionQuery) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      collectionQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
        setData(items);
        setLoading(false);
      },
      async (serverError) => {
        // Fallback for path if query is complex
        const permissionError = new FirestorePermissionError({
          path: 'Collection Query',
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionQuery ? 'collection-query' : null]);

  return { data, loading, error };
}
