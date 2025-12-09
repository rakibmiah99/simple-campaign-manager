import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Contact } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Campaigns', href: '/campaigns' },
    { title: 'Create', href: '/campaigns/create' },
];

interface Props {
    contacts: Contact[];
}

export default function CreateCampaign({ contacts }: Props) {
    const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        body: '',
        contact_ids: [] as number[],
    });

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const filtered = filteredContacts.map((c) => c.id);
            setSelectedContacts(filtered);
            setData('contact_ids', filtered);
        } else {
            setSelectedContacts([]);
            setData('contact_ids', []);
        }
    };

    const handleSelectContact = (contactId: number, checked: boolean) => {
        let newSelected: number[];
        if (checked) {
            newSelected = [...selectedContacts, contactId];
        } else {
            newSelected = selectedContacts.filter((id) => id !== contactId);
        }
        setSelectedContacts(newSelected);
        setData('contact_ids', newSelected);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/campaigns');
    };

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Campaign" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Create Campaign</h1>
                    <p className="text-sm text-muted-foreground">
                        Create a new email campaign and select recipients
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Details</CardTitle>
                            <CardDescription>Enter the subject and body of your email</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="Enter email subject"
                                />
                                {errors.subject && (
                                    <p className="text-sm text-red-500">{errors.subject}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="body">Message</Label>
                                <Textarea
                                    id="body"
                                    value={data.body}
                                    onChange={(e) => setData('body', e.target.value)}
                                    placeholder="Enter email message"
                                    rows={6}
                                />
                                {errors.body && (
                                    <p className="text-sm text-red-500">{errors.body}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Select Recipients</CardTitle>
                            <CardDescription>
                                Choose contacts to receive this campaign
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            {selectedContacts.length > 0 && (
                                <div className="rounded-lg border bg-muted p-3">
                                    <p className="text-sm font-medium">
                                        {selectedContacts.length} recipient(s) selected
                                    </p>
                                </div>
                            )}

                            {errors.contact_ids && (
                                <p className="text-sm text-red-500">{errors.contact_ids}</p>
                            )}

                            <div className="max-h-96 overflow-y-auto rounded-lg border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12">
                                                <Checkbox
                                                    checked={
                                                        selectedContacts.length ===
                                                            filteredContacts.length &&
                                                        filteredContacts.length > 0
                                                    }
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredContacts.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center">
                                                    No contacts found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredContacts.map((contact) => (
                                                <TableRow key={contact.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedContacts.includes(
                                                                contact.id,
                                                            )}
                                                            onCheckedChange={(checked) =>
                                                                handleSelectContact(
                                                                    contact.id,
                                                                    checked as boolean,
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {contact.name}
                                                    </TableCell>
                                                    <TableCell>{contact.email}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Create Campaign
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

