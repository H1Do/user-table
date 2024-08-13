import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { User } from '../../model/types/users';
import cls from './UsersTableItem.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';

interface UsersTableItemProps {
    className?: string;
    user: User;
}

export const UsersTableItem = memo(function UsersTableItemComponent({ className, user }: UsersTableItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <tr onClick={() => setIsModalOpen(true)} className={classNames(cls.UsersTableItem, {}, [className])}>
                <td>{user.firstName + ' ' + user.lastName + ' ' + user.maidenName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.address.city + ', ' + user.address.address}</td>
            </tr>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={cls.modalContent}>
                    <div className={cls.modalLabel}>ФИО:</div>
                    <div className={cls.modalValue}>
                        {user.firstName} {user.lastName} {user.maidenName}
                    </div>
                    <div className={cls.modalLabel}>Возраст:</div>
                    <div className={cls.modalValue}>{user.age}</div>
                    <div className={cls.modalLabel}>Адрес:</div>
                    <div className={cls.modalValue}>
                        {user.address.city} {user.address.address}
                    </div>
                    <div className={cls.modalLabel}>Рост:</div>
                    <div className={cls.modalValue}>{user.height}</div>
                    <div className={cls.modalLabel}>Вес:</div>
                    <div className={cls.modalValue}>{user.weight}</div>
                    <div className={cls.modalLabel}>Номер телефона:</div>
                    <div className={cls.modalValue}>
                        <a href={`tel:${user.phone}`}>{user.phone}</a>
                    </div>
                    <div className={cls.modalLabel}>Email-адрес:</div>
                    <div className={cls.modalValue}>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                    </div>
                </div>
            </Modal>
        </>
    );
});
