import styled from '@emotion/styled';
import {FaTrash} from "react-icons/fa";
import {keyframes} from '@emotion/react';

export const Container = styled.div`
    width: 700px;
    margin: 0 auto;
    padding: 2rem;
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: #333;
`;

export const Error = styled.p`
    color: red;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Th = styled.th`
    border-bottom: 2px solid #ccc;
    padding: 8px;
    text-align: left;
`;

export const Td = styled.td`
    border-bottom: 1px solid #eee;
    padding: 8px;
`;

export const TrashIcon = styled(FaTrash)`
    color: red;
    cursor: pointer;
`;

const dots = keyframes`
    0% {
        content: '';
    }
    33% {
        content: '.';
    }
    66% {
        content: '..';
    }
    100% {
        content: '...';
    }
`;

export const Loading = styled.p`
    font-style: italic;

    &::after {
        display: inline-block;
        white-space: pre;
        animation: ${dots} 1s steps(3, end) infinite;
        content: '';
    }
`;

export const Button = styled.button<{ active?: boolean }>`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 2px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    margin: 0;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
`;

export const FilterContainer = styled.div`
    margin: 1rem 0;
    display: flex;
    gap: 0.5rem;
`;