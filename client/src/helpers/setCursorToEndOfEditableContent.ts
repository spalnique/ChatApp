import type { MutableRefObject } from 'react';

export default function setCursorToEndOfEditableContent(
  ref: MutableRefObject<HTMLSpanElement | null>
) {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(ref.current!);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
}
