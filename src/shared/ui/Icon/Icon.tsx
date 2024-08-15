import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    width?: string;
    height?: string;
}

export const Icon = ({ className, Svg, width = '20px', height = '20px' }: IconProps) => (
    <Svg width={width} height={height} className={classNames(cls.Icon, {}, [className])} />
);
