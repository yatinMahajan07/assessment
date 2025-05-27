import { Suspense } from 'react';
import SuccessClient from './SuccessClient'; // ✅ Reference the client component

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}