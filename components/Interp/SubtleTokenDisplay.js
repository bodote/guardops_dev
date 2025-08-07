'use client'
import { useState } from "react";

const SubtleTokenDisplay = ({
    text,
    tokens,
    large = false,
    quoted = false,
    onTokenClick = null,
    selectedTokenIndex = null,
    globalSelectedPosition = null,
    tokenStartOffset = 0,
    isPrompt = false
}) => {
    const [hoveredTokenIndex, setHoveredTokenIndex] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    if (!tokens || tokens.length === 0) {
        return <div className="text-slate-500">No tokens available</div>;
    }

    // Different styling for large vs normal display
    const containerClass = large
        ? "transition-all duration-200"
        : "p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200";

    const textClass = large
        ? "text-xl leading-relaxed font-Inter text-slate-900 font-medium select-text"
        : "text-slate-800 text-base leading-relaxed font-Inter select-text";

    const displayText = quoted ? `"${text}"` : text;

    return (
        <div
            className={containerClass}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                setHoveredTokenIndex(null);
            }}
        >
            <div className="relative">
                <div className={`${textClass} ${(isHovering || selectedTokenIndex !== null || globalSelectedPosition !== null) ? 'break-words overflow-wrap-anywhere' : ''}`}>
                    {!(isHovering || selectedTokenIndex !== null || globalSelectedPosition !== null) ? (
                        // Fluid text display - no token boundaries visible
                        <span className="cursor-pointer break-words">
                            {displayText}
                        </span>
                    ) : (
                        // Tokenized display on hover - with proper wrapping
                        <div className="flex flex-wrap gap-0 leading-relaxed">
                            {quoted && <span className="text-slate-600">"</span>}
                            {tokens.map((token, index) => {
                                const globalPosition = tokenStartOffset + index;
                                const isSelected = selectedTokenIndex === index;
                                const isInContext = globalSelectedPosition !== null && globalPosition < globalSelectedPosition;
                                const isHovered = hoveredTokenIndex === index;

                                let className = 'transition-all duration-150 cursor-pointer inline-block ';

                                if (isSelected) {
                                    // Selected token - prominent highlight
                                    className += 'bg-purple-500 text-white px-1 py-0.5 rounded-sm shadow-md border border-purple-600 font-medium';
                                } else if (isInContext) {
                                    // Context tokens - lighter highlight
                                    className += 'bg-purple-200 text-purple-900 px-1 py-0.5 rounded-sm border border-purple-300';
                                } else if (isHovered) {
                                    // Hovered token
                                    className += 'bg-[#D4DB33]/30 text-slate-900 px-1 py-0.5 rounded-sm shadow-sm';
                                } else {
                                    // Default token
                                    className += 'hover:bg-slate-100/60 px-0.5 py-0.5 rounded-sm';
                                }

                                return (
                                    <span
                                        key={index}
                                        className={className}
                                        onMouseEnter={() => setHoveredTokenIndex(index)}
                                        onMouseLeave={() => setHoveredTokenIndex(null)}
                                        onClick={() => {
                                            if (onTokenClick) {
                                                onTokenClick(index, token);
                                            }
                                        }}
                                        title={onTokenClick
                                            ? `Click to analyze: Token ${globalPosition + 1}: "${token}"${isInContext ? ' (Context)' : isSelected ? ' (Selected)' : ''}`
                                            : `Token ${globalPosition + 1}: "${token}"`
                                        }
                                        style={{ wordBreak: 'break-word' }}
                                    >
                                        {token}
                                    </span>
                                );
                            })}
                            {quoted && <span className="text-slate-600">"</span>}
                        </div>
                    )}
                </div>
                {!large && (
                    <div className="text-xs text-slate-500 mt-3 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                            {tokens.length} tokens
                        </span>
                        <span className="text-slate-400">•</span>
                        <span>
                            {(isHovering || selectedTokenIndex !== null || globalSelectedPosition !== null)
                                ? (onTokenClick ? 'Click tokens to analyze. Purple = selected, light purple = context.' : 'Individual tokens are highlighted')
                                : (onTokenClick ? 'Hover over text to see tokens, then click to analyze' : 'Hover over text to see token breakdown')
                            }
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubtleTokenDisplay;