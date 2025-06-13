import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

beforeAll(() => {
    jest.useFakeTimers();
});

afterAll(() => {
    jest.useRealTimers();
});

describe('useDebounce hook', () => {
    it('debounces value correctly', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'first', delay: 300 } }
        );

        expect(result.current).toBe('first');

        rerender({ value: 'second', delay: 300 });

        expect(result.current).toBe('first');

        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(result.current).toBe('second');
    });
});
