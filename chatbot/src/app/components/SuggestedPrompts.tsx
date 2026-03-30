import { 
  CreditCard, 
  HelpCircle, 
  RefreshCcw, 
  FileCheck, 
  TrendingDown, 
  ClipboardList 
} from "lucide-react";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const prompts = [
  {
    icon: HelpCircle,
    text: "Check my scholarship status",
    color: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
  },
  {
    icon: CreditCard,
    text: "Why hasn't my payment been made?",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
  },
  {
    icon: RefreshCcw,
    text: "How to apply for subsequent funding",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100",
  },
  {
    icon: TrendingDown,
    text: "Why did my funding amount reduce?",
    color: "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100",
  },
  {
    icon: FileCheck,
    text: "What does 'Validated' mean?",
    color: "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100",
  },
  {
    icon: ClipboardList,
    text: "How to appeal for more funds",
    color: "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100",
  },
];

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt, index) => {
        const Icon = prompt.icon;
        return (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt.text)}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98] ${prompt.color}`}
          >
            <Icon className="size-5 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold leading-tight">
              {prompt.text}
            </span>
          </button>
        );
      })}
    </div>
  );
}