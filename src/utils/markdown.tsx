import React from 'react';

export const renderMarkdown = (markdown: string): React.ReactNode => {
  // Simple markdown parser for basic formatting
  const lines = markdown.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;
  let codeBlock = false;
  let codeLines: string[] = [];
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (!codeBlock) {
        codeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeLines = [];
      } else {
        codeBlock = false;
        elements.push(
          <pre key={key++} className="code-block">
            <code className={codeLanguage ? `language-${codeLanguage}` : ''}>
              {codeLines.join('\n')}
            </code>
          </pre>
        );
        codeLines = [];
      }
      continue;
    }

    if (codeBlock) {
      codeLines.push(line);
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++}>{line.slice(4)}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key++}>{line.slice(3)}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={key++}>{line.slice(2)}</h1>);
    }
    // Lists
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: string[] = [line.slice(2)];
      while (i + 1 < lines.length && (lines[i + 1].startsWith('- ') || lines[i + 1].startsWith('* '))) {
        i++;
        listItems.push(lines[i].slice(2));
      }
      elements.push(
        <ul key={key++}>
          {listItems.map((item, idx) => (
            <li key={idx}>{processInlineFormatting(item)}</li>
          ))}
        </ul>
      );
    }
    // Numbered lists
    else if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [line.replace(/^\d+\.\s/, '')];
      while (i + 1 < lines.length && /^\d+\.\s/.test(lines[i + 1])) {
        i++;
        listItems.push(lines[i].replace(/^\d+\.\s/, ''));
      }
      elements.push(
        <ol key={key++}>
          {listItems.map((item, idx) => (
            <li key={idx}>{processInlineFormatting(item)}</li>
          ))}
        </ol>
      );
    }
    // Empty lines
    else if (line.trim() === '') {
      continue;
    }
    // Paragraphs
    else {
      elements.push(<p key={key++}>{processInlineFormatting(line)}</p>);
    }
  }

  return <div className="markdown-content">{elements}</div>;
};

const processInlineFormatting = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    if (codeMatch && codeMatch.index !== undefined) {
      if (codeMatch.index > 0) {
        parts.push(remaining.slice(0, codeMatch.index));
      }
      parts.push(<code key={key++}>{codeMatch[1]}</code>);
      remaining = remaining.slice(codeMatch.index + codeMatch[0].length);
      continue;
    }

    // Bold
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      parts.push(<strong key={key++}>{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // Italic
    const italicMatch = remaining.match(/\*([^*]+)\*/);
    if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) {
        parts.push(remaining.slice(0, italicMatch.index));
      }
      parts.push(<em key={key++}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch.index + italicMatch[0].length);
      continue;
    }

    // No more formatting
    parts.push(remaining);
    break;
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
};
