import styled from "styled-components";

 export const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;
export const ShadowWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 8px 1px #5c549f, 0 8px 20px 6px #428b87;
`;

export const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;
export const TextWrapper = styled.span`
  font-size: 32px;
`;
export const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  text-transform: capitalize;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${props => props.isHeader ? '#5c549f' : '#79cbb8'};
  ${props => props.isHeader && 'border-bottom: 1px solid #79cbb8'}
`;
export const RowInCell = styled.div`
  display: flex;
  justify-content: flex-end;
    //justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  margin-right: ${props => props.isMarging ? 8 : 0}px;
  text-transform: capitalize;
  flex-direction: column;

`;
export const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${props => props.isHeader ? 24 : 80}px;
  background-color: ${props => props.isWeekend ? '#48068f' : '#5c549f'};
  color: ${props => props.isSelectedMonth ? 'white' : '#9b9cc7'};
  cursor: ${props => props.isBody ? 'pointer' : 'unset'};
`;
export const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;
export const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #79cbb8;
`;
export const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const EventListWrapper = styled.ul`
  margin: unset;
  list-style-position: inside;
  padding-left: 4px;
`;
export const EventItemWrapper = styled(EventListWrapper)`
  position: relative;
  left: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  margin: -10px 0;
  padding: 0;
  bottom: 10px;
  text-align: left;
`;
