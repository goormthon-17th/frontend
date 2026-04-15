const bold = (text: string) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
};

export const markdown = (text: string) => {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('# '))
      return (
        <h2 key={i} style={{ fontWeight: 700, fontSize: '18px', margin: '0 0 8px' }}>
          {bold(line.slice(2))}
        </h2>
      );
    if (line.startsWith('## '))
      return (
        <h3 key={i} style={{ fontWeight: 700, fontSize: '16px', margin: '0 0 6px' }}>
          {bold(line.slice(3))}
        </h3>
      );
    if (/^\d+\./.test(line))
      // "2. 재료 리스트:" 같은 줄
      return (
        <p key={i} style={{ fontWeight: 600, fontSize: '15px', margin: '12px 0 4px' }}>
          {bold(line)}
        </p>
      );
    if (line.startsWith('- '))
      return (
        <p key={i} style={{ margin: '2px 0', paddingLeft: '8px' }}>
          · {bold(line.slice(2))}
        </p>
      );
    if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />;
    return (
      <p key={i} style={{ margin: '4px 0' }}>
        {bold(line)}
      </p>
    );
  });
};
