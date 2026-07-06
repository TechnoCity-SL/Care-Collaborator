import type { ChecklistItemDTO } from '@/types/pages';

interface ChecklistRowProps {
  item: ChecklistItemDTO;
}

export function ChecklistRow({ item }: ChecklistRowProps) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-teal text-teal"
        aria-hidden="true"
      >
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
          <path d="M2 6.2l2.6 2.6L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="font-body text-[16px] font-medium leading-normal text-text-card">
          {item.title}
        </p>
        {item.description && (
          <p className="font-body text-[14px] font-normal leading-[1.5] text-text-body">
            {item.description}
          </p>
        )}
      </div>
    </li>
  );
}
