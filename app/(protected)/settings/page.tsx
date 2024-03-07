import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export default async function SettingsPage() {
    const session = await auth();
    return <div>Current Session: {JSON.stringify(session)}
        <form action={async () => {
            'use server';
            await signOut();
        }}>
            <Button
                type="submit"
                variant="destructive"
            >Sign Out</Button>
        </form>
    </div>;
}
