import { IUserInfoItemProps, IUserInfoProps } from '@/types/component-props';
import { Card, CardContent, CardHeader } from './ui/card';
import { useCallback, useMemo } from 'react';
import { UserInfoItem } from './user-info-item';
import { Badge } from './ui/badge';

export const UserInfo = ({ label, user }: IUserInfoProps) => {

    const renderUserInfoItem = useCallback(({ label, value }: IUserInfoItemProps) => <UserInfoItem key={label} label={label} value={value} />, []);

    const infoItems: IUserInfoItemProps[] = useMemo(() => {
        if (user) {
            const { email, name, role, id } = user;
            return [
                { label: 'ID', value: id },
                { label: 'Name', value: name },
                { label: 'Email', value: email },
                { label: 'Role', value: role }
            ] as unknown as IUserInfoItemProps[];
        }
        return [] as IUserInfoItemProps[];
    }, [user]);

    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4" >
                {infoItems.map(renderUserInfoItem)}
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <Badge
                        variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
                    >
                        {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};
