'use client';

import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { useEffect } from 'react';

export default function NotePreviewClient() {
  useEffect(() => {
    const fn = async () => {};
    fn();
  }, []);

  const handleClose = () => {
    console.log('Modal closed');
    
  };

  return (
    <Modal onClose={handleClose}>
      <button onClick={handleClose} className={css.backBtn}>← Back</button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>Note title</h2>
          </div>

          <p className={css.content}>Note body</p>
        </div>
        <p className={css.user}>Note name</p>
      </div>
    </Modal>
  );
}