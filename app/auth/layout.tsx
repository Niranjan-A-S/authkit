import { IParentProps } from '@/types/component-props';

export default function AuthLayout({ children }: IParentProps) {
    return (
        <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            {children}
        </div>
    );
}
