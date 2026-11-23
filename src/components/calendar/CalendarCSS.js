import styled from "styled-components";

// Кольори узгоджені з головною сторінкою (HomeModern.css)
const INK = 'var(--hm-ink)';
const INK_SOFT = 'var(--hm-ink-soft)';
const PURPLE = 'var(--hm-purple)';
const TEAL = 'var(--hm-accent)';
const TEAL_DEEP = 'var(--hm-accent-deep)';
const LINE = 'rgba(var(--hm-purple-rgb), 0.1)';

export const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ShadowWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid ${LINE};
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(var(--hm-deep-rgb), 0.14);
`;

/* ---------- Шапка: місяць + навігація ---------- */

export const DivWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 28px;
  border-bottom: 1px solid ${LINE};

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const TextWrapper = styled.span`
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 500;
  color: ${INK_SOFT};
  opacity: 0.6;
`;

export const TitleWrapper = styled(TextWrapper)`
  margin-right: 10px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 700;
  color: ${INK};
  opacity: 1;
  text-transform: capitalize;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* ---------- Сітка ---------- */

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  /* тонкі лінії сітки: фон = колір лінії, відступ 1px між білими клітинками */
  gap: ${props => props.isHeader ? 0 : 1}px;
  background-color: ${props => props.isHeader ? 'var(--hm-tint)' : LINE};
  ${props => props.isHeader && `border-bottom: 1px solid ${LINE};`}
`;

export const CellWrapper = styled.div`
  min-width: 0;
  min-height: ${props => props.isHeader ? 'auto' : 'clamp(52px, 6.5vw, 84px)'};
  background-color: ${props => props.isHeader ? 'transparent' : props.isWeekend ? 'var(--hm-tint)' : '#fff'};
  color: ${props => !props.isSelectedMonth ? 'rgba(var(--hm-ink-rgb), 0.3)' : props.isPast ? 'rgba(var(--hm-ink-rgb), 0.5)' : INK};
  cursor: ${props => props.isBody && !props.isPast ? 'pointer' : 'default'};
  transition: background-color .2s ease;

  ${props => props.isBody && !props.isPast && `
    &:hover {
      background-color: var(--hm-accent-tint);
    }
  `}
`;

export const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${props => props.isMarging ? '14px 0' : '8px'};
  align-items: ${props => props.isMarging ? 'center' : 'stretch'};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: ${props => props.isMarging ? '0.12em' : '0'};
  text-transform: ${props => props.isMarging ? 'uppercase' : 'none'};
  color: ${props => props.isMarging ? INK_SOFT : 'inherit'};

  @media (max-width: 640px) {
    padding: ${props => props.isMarging ? '10px 0' : '4px'};
  }
`;

export const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const DayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: 700;

  @media (max-width: 640px) {
    width: 26px;
    height: 26px;
    font-size: 12px;
  }
`;

export const CurrentDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${TEAL};
  color: ${INK};
  box-shadow: 0 6px 16px rgba(var(--hm-accent-rgb), 0.6);
`;

/* ---------- Записи в клітинці ---------- */

export const EventListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 6px;
  min-width: 0;

  @media (max-width: 640px) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 4px;
  }
`;

export const EventItemWrapper = styled.div`
  overflow: hidden;
  padding: 3px 8px;
  border-radius: 8px;
  background: var(--hm-soft);
  color: ${PURPLE};
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* на телефоні замість тексту лишається крапка */
  @media (max-width: 640px) {
    width: 6px;
    height: 6px;
    padding: 0;
    border-radius: 50%;
    background: ${TEAL_DEEP};
    font-size: 0;
  }
`;
