import React, { memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';
import { sortDirectionValues } from 'shared/config/types/sort';
import UpArrowIcon from 'shared/assets/icons/up-arrow-icon.svg';
import DownArrowIcon from 'shared/assets/icons/down-arrow-icon.svg';
import HorizontalLineIcon from 'shared/assets/icons/horizontal-line-icon.svg';

interface TableColumn {
    text: string;
    ref: React.RefObject<HTMLTableHeaderCellElement>;
}

interface TableProps {
    className?: string;
    headers?: string[];
    sortableHeaders?: string[];
    sortDirection?: sortDirectionValues;
    currentSortHeader?: string;
    minCellWidth?: number;
    tableContent?: ReactNode;
    onThClick?: (thName: string) => void;
}

const createHeaders = (headers: string[]): TableColumn[] => {
    return headers.map((item) => ({
        text: item,
        ref: React.createRef<HTMLTableHeaderCellElement>(),
    }));
};

export const Table = memo(function TableComponent({
    className,
    headers,
    tableContent,
    minCellWidth = 100,
    sortableHeaders,
    sortDirection,
    currentSortHeader,
    onThClick,
}: TableProps) {
    const [tableHeight, setTableHeight] = useState<string>('auto');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const tableElement = useRef<HTMLTableElement>(null);
    const columns = createHeaders(headers || []);

    useEffect(() => {
        if (tableElement.current) {
            setTableHeight(`${tableElement.current.offsetHeight}px`);
        }
    }, [headers]);

    const handleMouseDown = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();

            if (activeIndex === null) {
                return;
            }

            const gridColumns = columns.map((col, i) => {
                if (i === activeIndex) {
                    const width = event.clientX - col.ref.current!.offsetLeft;

                    if (width >= minCellWidth) {
                        return `${width}px`;
                    }
                }
                return `${col.ref.current!.offsetWidth}px`;
            });

            tableElement.current!.style.gridTemplateColumns = gridColumns.join(' ');
        },
        [activeIndex, columns, minCellWidth],
    );

    const removeListeners = useCallback(() => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', removeListeners);
    }, [handleMouseMove]);

    const handleMouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [removeListeners, setActiveIndex]);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [activeIndex, handleMouseMove, handleMouseUp, removeListeners]);

    return (
        <div className={classNames(cls.TableWrapper, {}, [className])}>
            <table className={cls.Table} ref={tableElement}>
                <thead>
                    <tr>
                        {columns.map(({ ref, text }, i) => (
                            <th ref={ref} key={text}>
                                <span
                                    onClick={() => {
                                        if (sortableHeaders?.includes(text)) {
                                            onThClick?.(text);
                                        }
                                    }}
                                    className={classNames(
                                        '',
                                        {
                                            [cls.sortable]: sortableHeaders?.includes(text),
                                        },
                                        [],
                                    )}
                                >
                                    {text}
                                    {sortableHeaders?.includes(text) && (
                                        <div className={cls.sortIndicator}>
                                            {currentSortHeader === text ? (
                                                sortDirection === sortDirectionValues.ASC ? (
                                                    <UpArrowIcon />
                                                ) : sortDirection === sortDirectionValues.DESC ? (
                                                    <DownArrowIcon />
                                                ) : (
                                                    <HorizontalLineIcon />
                                                )
                                            ) : (
                                                <HorizontalLineIcon />
                                            )}
                                        </div>
                                    )}
                                </span>
                                <div
                                    style={{ height: tableHeight }}
                                    onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                                        event.preventDefault();
                                        handleMouseDown(i);
                                    }}
                                    className={classNames(cls.resizeHandle, {}, [
                                        activeIndex === i ? cls.active : cls.idle,
                                    ])}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{tableContent}</tbody>
            </table>
        </div>
    );
});
