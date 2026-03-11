import { BookOpen, Calendar, GraduationCap, Lightbulb } from "lucide-react";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const prompts = [
  {
    icon: BookOpen,
    text: "Help me understand this concept",
    color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  },
  {
    icon: Calendar,
    text: "Create a study schedule",
    color: "bg-green-50 text-green-600 hover:bg-green-100",
  },
  {
    icon: Lightbulb,
    text: "Explain it like I'm 5",
    color: "bg-amber-50 text-amber-600 hover:bg-amber-100",
  },
  {
    icon: GraduationCap,
    text: "Quiz me on this topic",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
  },
];

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {prompts.map((prompt, index) => {
        const Icon = prompt.icon;
        return (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt.text)}
            className={`flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-left transition-colors ${prompt.color}`}
          >
            <Icon className="size-5 shrink-0" />
            <span className="text-sm font-medium">{prompt.text}</span>
          </button>
        );
      })}
    </div>
  );
}
