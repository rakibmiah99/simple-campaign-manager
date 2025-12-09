import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Campaign {
    id: number;
    subject: string;
    body: string;
    status: 'draft' | 'sending' | 'sent' | 'failed';
    created_at: string;
    updated_at: string;
    recipients?: CampaignRecipient[];
    recipients_count?: number;
}

export interface CampaignRecipient {
    id: number;
    campaign_id: number;
    contact_id: number;
    status: 'pending' | 'sent' | 'failed';
    error_message: string | null;
    sent_at: string | null;
    created_at: string;
    updated_at: string;
    contact?: Contact;
    campaign?: Campaign;
}

export interface CampaignStats {
    total: number;
    sent: number;
    failed: number;
    pending: number;
    success_rate: number;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

