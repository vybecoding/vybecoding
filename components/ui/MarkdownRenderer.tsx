'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

// Import common languages
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('sql', sql);

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className
}) => {
  return (
    <ReactMarkdown
      className={cn("prose prose-gray dark:prose-invert max-w-none", className)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          
          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }
          
          return (
            <code className={cn("bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm", className)} {...props}>
              {children}
            </code>
          );
        },
        // Style headings
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-medium mt-4 mb-2" {...props} />
        ),
        // Style links
        a: ({ node, ...props }) => (
          <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
        ),
        // Style lists
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
        ),
        // Style blockquotes
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-2 my-4 italic" {...props} />
        ),
        // Style tables
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="px-4 py-2 text-left font-medium bg-gray-100 dark:bg-gray-800" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700" {...props} />
        ),
        // Style images
        img: ({ node, ...props }) => (
          <img className="rounded-lg max-w-full h-auto my-4" {...props} />
        ),
        // Style horizontal rules
        hr: ({ node, ...props }) => (
          <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};