import CupAlpha from './CupAlpha.png'
import styled from 'styled-components';

export function RenderLogo({size}){
    return(
        <AppLogo>
             <img src={CupAlpha} alt="Company Logo" 
             width={size} 
             height={size}
             />        
        </AppLogo>
    )
}

const AppLogo = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  height: ${(props) => props.size}
  width: ${(props) => props.size}
`