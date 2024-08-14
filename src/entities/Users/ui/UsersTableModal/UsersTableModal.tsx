import { memo } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { User } from '../../model/types/users';
import cls from './UsersTableModal.module.scss';

interface UsersTableModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

export const UsersTableModal = memo(function UsersTableModalComponent({ user, isOpen, onClose }: UsersTableModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {user && (
                <>
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
                </>
            )}
        </Modal>
    );
});
