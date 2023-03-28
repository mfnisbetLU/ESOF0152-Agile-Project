import React from 'react';

export function QuantityCounter(props) {
    const [count, setCount] = React.useState(props.initialCount || 0);
  
    function handleCountChange(newCount) {
      setCount(newCount);
      if (props.onCountChange) {
        props.onCountChange(newCount);
      }
    }
  
    return (
      <>
        <button onClick={() => handleCountChange(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => handleCountChange(count + 1)}>+</button>
      </>
    );
  }

  /** Unused code from atempted implementation
   *        <StyledCounter>
            <QuantityCounter initialCount={count} onCountChange={handleQuantityUpdate} />
            </StyledCounter>
                const handleQuantityUpdate = (newCount) => {
                setCount(newCount);
            }
            import { QuantityCounter } from './QuantityCounter.js';
            const StyledCounter = styled.p`
            padding-left: 20px;
            display: inline-block;
            font-size: 20px;
            `
   */