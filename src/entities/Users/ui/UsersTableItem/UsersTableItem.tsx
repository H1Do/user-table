import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { User } from '../../model/types/users';
import cls from './UsersTableItem.module.scss';

interface UsersTableItemProps {
    className?: string;
    onModalOpen?: () => void;
    user: User;
}

export const UsersTableItem = memo(function UsersTableItemComponent({
    className,
    user,
    onModalOpen,
}: UsersTableItemProps) {
    return (
        <>
            <tr onClick={onModalOpen} className={classNames(cls.UsersTableItem, {}, [className])}>
                <td>{user.firstName + ' ' + user.lastName + ' ' + user.maidenName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.address.city + ', ' + user.address.address}</td>
            </tr>
        </>
    );
});
