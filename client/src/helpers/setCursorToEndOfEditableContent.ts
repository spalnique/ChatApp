import type { MutableRefObject } from 'react';

const setCursorToEndOfEditableContent = (
  ref: MutableRefObject<HTMLSpanElement | null>
) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(ref.current!);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

export default setCursorToEndOfEditableContent;
