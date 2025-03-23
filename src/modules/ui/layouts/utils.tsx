export function highlightText(text: string, highlight: string) {
  if (!highlight.trim()) {
    return (<span className="leading-2.5">{text}</span>);
  }

  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedHighlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span className="leading-1.5 whitespace-pre-wrap break-words inline font-medium bg-[linear(to_right,rgba(55,53,47,0.16),rgba(55,53,47,0.16)_100%)] bg-repeat-x bg-[length:100%_1px] bg-bottom mr-1.5">
      {parts.map((part, index) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="bg-[#ffcd3866] text-primary outline-[#ffcd3866] outline-2 outline-offset-[-0.5px] rounded border-b-0">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}