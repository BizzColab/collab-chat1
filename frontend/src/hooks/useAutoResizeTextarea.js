import { useEffect } from 'react';

/**
 * Hook to auto-resize textarea dynamically as user types
 * @param {number|null} maxLines - Maximum number of lines (null for unlimited)
 * @param {number} minLines - Minimum number of lines
 */
export const useAutoResizeTextarea = (maxLines = null, minLines = 1) => {
  useEffect(() => {
    const handleTextareaResize = (e) => {
      const textarea = e.target;
      if (textarea.tagName === 'TEXTAREA') {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        
        // Calculate line height and constraints
        const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 24;
        const minHeight = lineHeight * minLines;
        
        // Get the actual content height
        const contentHeight = textarea.scrollHeight;
        
        // Apply height constraints
        let newHeight = Math.max(contentHeight, minHeight);
        
        if (maxLines !== null) {
          const maxHeight = lineHeight * maxLines;
          newHeight = Math.min(newHeight, maxHeight);
          
          // Show scrollbar only if content exceeds max height
          if (contentHeight > maxHeight) {
            textarea.style.overflowY = 'auto';
          } else {
            textarea.style.overflowY = 'hidden';
          }
        } else {
          // Fully dynamic - no scrollbar needed
          textarea.style.overflowY = 'hidden';
        }
        
        textarea.style.height = `${newHeight}px`;
      }
    };

    // Listen for input events on all textareas (using event delegation)
    document.addEventListener('input', handleTextareaResize);

    // Also trigger on initial load for any existing content
    const textareas = document.querySelectorAll('.str-chat__textarea textarea');
    textareas.forEach((textarea) => {
      const event = new Event('input', { bubbles: true });
      textarea.dispatchEvent(event);
    });

    return () => {
      document.removeEventListener('input', handleTextareaResize);
    };
  }, [maxLines, minLines]);
};

export default useAutoResizeTextarea;
