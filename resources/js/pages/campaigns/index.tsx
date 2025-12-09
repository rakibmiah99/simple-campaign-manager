import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Campaign, type PaginatedData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus, Eye } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Campaigns', href: '/campaigns' },
];

interface Props {
    campaigns: PaginatedData<Campaign>;
}

const getStatusBadge = (status: Campaign['status']) => {
    const variants: Record<Campaign['status'], 'default' | 'secondary' | 'destructive'> = {
        draft: 'secondary',
        sending: 'default',
        sent: 'default',
        failed: 'destructive',
    };

    return <Badge variant={variants[status]}>{status}</Badge>;
};

export default function CampaignsIndex({ campaigns }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Campaigns" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Campaigns</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your email campaigns
                        </p>
                    </div>
                    <Link href="/campaigns/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Campaign
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Recipients</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {campaigns.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        No campaigns found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                campaigns.data.map((campaign) => (
                                    <TableRow key={campaign.id}>
                                        <TableCell className="font-medium">
                                            {campaign.subject}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                                        <TableCell>{campaign.recipients_count || 0}</TableCell>
                                        <TableCell>
                                            {new Date(campaign.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/campaigns/${campaign.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}

