import { UserInfo } from '@/components/user-info';
import { getCurrentUser } from '@/utils/auth';

const SeverPage = async () => {
    const user = await getCurrentUser();

    return (
        <UserInfo
            label="💻 Server component"
            user={user}
        />
    );
};

export default SeverPage;
