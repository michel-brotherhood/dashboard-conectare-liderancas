import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder: string;
  'aria-label'?: string;
}

export function CustomSelect({
  id, value, onChange, options, placeholder, 'aria-label': ariaLabel,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allOptions: SelectOption[] = [{ value: '', label: placeholder }, ...options];
  const selectedLabel = allOptions.find(o => o.value === value)?.label ?? placeholder;
  const selectedIndex = allOptions.findIndex(o => o.value === value);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  useEffect(() => {
    if (open) setFocused(Math.max(0, selectedIndex));
  }, [open, selectedIndex]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const item = listRef.current.children[focused] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [focused, open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, allOptions.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(allOptions[focused].value);
      close();
    }
  }

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleKeyDown}
        className="field"
        style={{
          backgroundColor: '#0b1d3a',
          border: `1px solid ${open ? '#FE8B01' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: '8px',
          padding: '0 36px 0 14px',
          width: '100%',
          height: '46px',
          fontSize: '14px',
          textAlign: 'left',
          cursor: 'pointer',
          color: value ? '#fff' : 'rgba(255,255,255,0.38)',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          boxShadow: open ? '0 0 0 3px rgba(254,139,1,0.12)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      >
        {selectedLabel}
      </button>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute"
        style={{
          right: '10px',
          top: '50%',
          transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
          color: 'rgba(255,255,255,0.4)',
          transition: 'transform 0.15s',
        }}
      />

      {open && (
        <div
          ref={listRef}
          role="listbox"
          aria-label={ariaLabel}
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: '#0f2848',
            border: '1px solid rgba(254,139,1,0.2)',
            borderRadius: '8px',
            zIndex: 200,
            maxHeight: '224px',
            overflowY: 'auto',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}
        >
          {allOptions.map((opt, i) => {
            const isSelected = opt.value === value;
            const isFocused = i === focused;
            return (
              <div
                key={opt.value || '__placeholder__'}
                role="option"
                aria-selected={isSelected}
                onMouseDown={e => { e.preventDefault(); onChange(opt.value); close(); }}
                onMouseEnter={() => setFocused(i)}
                style={{
                  padding: '9px 12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: isSelected ? '#FE8B01' : 'rgba(255,255,255,0.8)',
                  backgroundColor: isFocused
                    ? 'rgba(254,139,1,0.1)'
                    : isSelected
                    ? 'rgba(254,139,1,0.06)'
                    : 'transparent',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'background-color 0.08s',
                }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
