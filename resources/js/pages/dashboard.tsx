import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Users, Send, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardStats {
    total_contacts: number;
    total_campaigns: number;
    emails_sent: number;
}

interface Props {
    stats: DashboardStats;
}

export default function Dashboard({ stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-3xl font-bold">Email Campaign Manager</h1>
                    <p className="text-muted-foreground">
                        Manage your email campaigns and contacts
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_contacts}</div>
                            <p className="text-xs text-muted-foreground">
                                Email contacts in database
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_campaigns}</div>
                            <p className="text-xs text-muted-foreground">
                                Email campaigns created
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
                            <Send className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.emails_sent}</div>
                            <p className="text-xs text-muted-foreground">
                                Total emails delivered
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/campaigns/create">
                                <Button className="w-full justify-start">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create New Campaign
                                </Button>
                            </Link>
                            <Link href="/contacts">
                                <Button variant="outline" className="w-full justify-start">
                                    <Users className="mr-2 h-4 w-4" />
                                    Manage Contacts
                                </Button>
                            </Link>
                            <Link href="/campaigns">
                                <Button variant="outline" className="w-full justify-start">
                                    <Mail className="mr-2 h-4 w-4" />
                                    View All Campaigns
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Getting Started</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium">1. Add Contacts</h4>
                                <p className="text-sm text-muted-foreground">
                                    Build your contact list by adding email addresses
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium">2. Create Campaign</h4>
                                <p className="text-sm text-muted-foreground">
                                    Write your email subject and message
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium">3. Select Recipients</h4>
                                <p className="text-sm text-muted-foreground">
                                    Choose who receives your campaign
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium">4. Send & Track</h4>
                                <p className="text-sm text-muted-foreground">
                                    Send your campaign and monitor delivery status
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
