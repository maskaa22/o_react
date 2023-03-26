import styled from "styled-components";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${props => props.isHeader ? '#5c549f' : '#79cbb8'};
  ${props => props.isHeader && 'border-bottom: 1px solid #79cbb8'};
`;

export const CellWrapper = styled.div`
  min-width: 4vw;
  min-height: ${props => props.isHeader ? 2 : 6}vw;
  background-color: ${props => props.isWeekend ? '#48068f' : '#5c549f'};
  color: ${props => props.isSelectedMonth ? 'white' : '#9b9cc7'};
  cursor: ${props => props.isBody ? 'pointer' : 'unset'};
  font-size: 3vw;
`;

export const RowInCell = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: ${props => props.isMarging ? 8 : 0}px;
  text-transform: capitalize;
  flex-direction: column;
  font-size: 2vw;
`;

export const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DayWrapper = styled.div`
  height: 1vw;
  width: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5vw;
  font-size: 1.8vw;
`;

export const CurrentDay = styled.div`
  border-radius: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #79cbb8;
  padding: 0.5vw;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ShadowWrapper = styled.div`
  border-radius: 1vw;
  overflow: hidden;
  box-shadow: 0 0 8px 1px #5c549f, 0 8px 20px 6px #428b87;
  width: 100%;
`;

export const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

export const TextWrapper = styled.span`
  font-size: 3vw;
`;

export const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  text-transform: capitalize;
  font-size: 3vw;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const EventListWrapper = styled.ul`
  margin: unset;
  list-style-position: inside;
  padding-left: 4px;
`;

export const EventItemWrapper = styled(EventListWrapper)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border: unset;
  bottom: 10px;
  text-align: left;
  font-size: 1.5vw;
  margin: 0.1vw 0;
`;
