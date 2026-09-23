import { useEffect, useRef, memo } from 'react';

interface JoomlaModuleMoverProps {
  sourceId: string;
  targetId: string;
}

// Używamy 'memo', aby zablokować ponowne renderowanie, gdy zmienia się stan rodzica (np. kliknięcie menu)
const JoomlaModuleMover = memo(({ sourceId, targetId }: JoomlaModuleMoverProps) => {
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sourceElement = document.getElementById(sourceId);
    const targetElement = placeholderRef.current;

    // Przenosimy tylko wtedy, gdy źródło istnieje, a cel jest jeszcze pusty
    if (sourceElement && targetElement && targetElement.childNodes.length === 0) {
      while (sourceElement.firstChild) {
        targetElement.appendChild(sourceElement.firstChild);
      }
    }
  }, [sourceId]);

  // suppressHydrationWarning mówi Next.js, żeby nie panikował z powodu zmian wewnątrz tego diva
  return <div id={targetId} ref={placeholderRef} suppressHydrationWarning />;
});

// Wymagane przy użyciu 'memo' w niektórych konfiguracjach lintingu
JoomlaModuleMover.displayName = 'JoomlaModuleMover';

export default JoomlaModuleMover;