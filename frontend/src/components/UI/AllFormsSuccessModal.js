import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectAllSubmitted, resetSubmissions } from '../../store/slices/submissionsSlice';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, y: 16, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function AllFormsSuccessModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectAllSubmitted);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement;
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    } else if (previouslyFocusedElementRef.current) {
      // Restore focus to the element that was focused before opening the modal
      previouslyFocusedElementRef.current.focus?.();
    }
  }, [isOpen]);

  const onClose = () => {
    dispatch(resetSubmissions());
  };

  // Keyboard handling for Escape and focus trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000]"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          aria-hidden={!isOpen}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Centered modal */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="all-forms-success-title"
              aria-describedby="all-forms-success-desc"
              className="w-full max-w-md rounded-2xl bg-white shadow-2xl focus:outline-none"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100" aria-hidden="true">
                  <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                  </svg>
                </div>

                {/* Title */}
                <h2 id="all-forms-success-title" className="text-center text-2xl font-bold text-gray-900">
                  All Forms Submitted Successfully
                </h2>
                {/* Description */}
                <p id="all-forms-success-desc" className="mt-2 text-center text-gray-600" aria-live="polite">
                  Thank you! Your Trademark, UK Shared Office, Registered Agent, and Logo Request forms have been submitted.
                </p>

                {/* CTA */}
                <div className="mt-6 flex justify-center">
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close success dialog"
                    className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                  >
                    OK
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}