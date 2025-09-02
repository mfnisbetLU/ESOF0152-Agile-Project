import React from 'react';

/**
 * Quantity counter was a component used to move the quantity amount up or down by 1
 * Ended up not using it since entering the number is faster in almost every circumstance
 */
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

  /** Unused code from attempted implementation
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