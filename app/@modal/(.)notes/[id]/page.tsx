'use client';



import { HydrationBoundary } from '@tanstack/react-query';

const NotePreviewPage = () => {
  // prefetch
  return <HydrationBoundary state={null}>NotePreviewClientComponent</HydrationBoundary>;
};

export default NotePreviewPage;