import { Components } from 'react-markdown';
import { Info, MapPin, DollarSign, Clock } from 'lucide-react';

export const markdownComponents: Components = {
  // Custom list rendering with better spacing
  ul: ({ children }) => (
    <ul className="space-y-3 my-6">{children}</ul>
  ),

  ol: ({ children }) => (
    <ol className="space-y-3 my-6 list-decimal list-inside">{children}</ol>
  ),

  li: ({ children }) => (
    <li className="flex items-start gap-3">
      <span className="text-emerald-500 mt-1 flex-shrink-0">→</span>
      <span className="flex-1">{children}</span>
    </li>
  ),

  // Paragraph with proper spacing
  p: ({ children }) => {
    return <p className="mb-6 leading-relaxed text-gray-700">{children}</p>;
  },

  // H2 with section divider
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold mt-16 mb-8 pt-8 border-t border-gray-200 text-gray-900 scroll-mt-20">
      {children}
    </h2>
  ),

  // H3 with icon for subsections
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold mt-10 mb-5 text-gray-800 flex items-center gap-3">
      <span className="text-emerald-500">▸</span>
      {children}
    </h3>
  ),

  // Blockquote as info box
  blockquote: ({ children }) => (
    <div className="my-8 p-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
      <div className="flex gap-4">
        <Info className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
        <div className="flex-1 text-gray-700">{children}</div>
      </div>
    </div>
  ),

  // Strong text (for prices and key facts)
  strong: ({ children }) => {
    const text = children?.toString() || '';

    // Price detection
    if (text.includes('$') || text.includes('USD') || text.includes('VND')) {
      return (
        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
          <DollarSign className="w-4 h-4 inline" />
          {children}
        </span>
      );
    }

    // Time/duration detection
    if (text.toLowerCase().includes('hour') || text.toLowerCase().includes('min') || text.toLowerCase().includes('day')) {
      return (
        <span className="inline-flex items-center gap-1 font-semibold text-blue-700">
          <Clock className="w-4 h-4 inline" />
          {children}
        </span>
      );
    }

    // Default strong styling
    return <strong className="font-semibold text-gray-900">{children}</strong>;
  },

  // Code blocks with better styling
  code: ({ children, className }) => {
    // If there's a className (language-*), it's a code block
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto">
          {children}
        </code>
      );
    }
    return (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
        {children}
      </code>
    );
  },

  // Links with better styling
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-emerald-600 hover:text-emerald-700 underline decoration-emerald-300 hover:decoration-emerald-500 transition-colors font-medium"
    >
      {children}
    </a>
  ),
};

// Helper component for Quick Facts (can be manually inserted)
export function QuickFacts({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 shadow-sm">
      <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
        <Info className="w-5 h-5" />
        Quick Facts
      </h3>
      <div className="space-y-2 text-gray-700">
        {children}
      </div>
    </div>
  );
}

// Helper component for location/attraction cards
export function AttractionCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-emerald-600" />
        {title}
      </h4>
      <div className="text-gray-700 space-y-3">
        {children}
      </div>
    </div>
  );
}
