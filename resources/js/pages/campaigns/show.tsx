import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Campaign, type CampaignStats } from '@/types';
import { Head } from '@inertiajs/react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Trash2, CheckCircle2, XCircle, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Campaigns', href: '/campaigns' },
    { title: 'Details', href: '#' },
];

interface Props {
    campaign: Campaign;
    stats: CampaignStats;
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

const getRecipientStatusIcon = (status: 'pending' | 'sent' | 'failed') => {
    switch (status) {
        case 'sent':
            return <CheckCircle2 className="h-4 w-4 text-green-500" />;
        case 'failed':
            return <XCircle className="h-4 w-4 text-red-500" />;
        case 'pending':
            return <Clock className="h-4 w-4 text-yellow-500" />;
    }
};

export default function ShowCampaign({ campaign, stats }: Props) {
    const handleSend = () => {
        if (confirm('Are you sure you want to send this campaign?')) {
            router.post(`/campaigns/${campaign.id}/send`);
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this campaign?')) {
            router.delete(`/campaigns/${campaign.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Campaign: ${campaign.subject}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{campaign.subject}</h1>
                        <p className="text-sm text-muted-foreground">
                            Campaign details and delivery status
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {campaign.status === 'draft' && (
                            <Button onClick={handleSend}>
                                <Send className="mr-2 h-4 w-4" />
                                Send Campaign
                            </Button>
                        )}
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Sent</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Failed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.success_rate}%</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Details</CardTitle>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            {getStatusBadge(campaign.status)}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Subject</h3>
                            <p className="text-base">{campaign.subject}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Message</h3>
                            <p className="whitespace-pre-wrap text-base">{campaign.body}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Created At
                            </h3>
                            <p className="text-base">
                                {new Date(campaign.created_at).toLocaleString()}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recipients</CardTitle>
                        <CardDescription>Delivery status for each recipient</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Sent At</TableHead>
                                        <TableHead>Error Message</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaign.recipients?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                No recipients found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        campaign.recipients?.map((recipient) => (
                                            <TableRow key={recipient.id}>
                                                <TableCell className="font-medium">
                                                    {recipient.contact?.name}
                                                </TableCell>
                                                <TableCell>{recipient.contact?.email}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {getRecipientStatusIcon(recipient.status)}
                                                        <span className="capitalize">
                                                            {recipient.status}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {recipient.sent_at
                                                        ? new Date(
                                                              recipient.sent_at,
                                                          ).toLocaleString()
                                                        : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {recipient.error_message ? (
                                                        <span className="text-sm text-red-500">
                                                            {recipient.error_message}
                                                        </span>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

