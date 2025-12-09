<?php

namespace App\Data;

class CampaignData
{
    public function __construct(
        public readonly string $subject,
        public readonly string $body,
        public readonly array $contactIds,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            subject: $data['subject'],
            body: $data['body'],
            contactIds: $data['contact_ids'] ?? [],
        );
    }
}
