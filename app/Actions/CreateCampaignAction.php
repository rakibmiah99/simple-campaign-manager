<?php

namespace App\Actions;

use App\Data\CampaignData;
use App\Models\Campaign;
use App\Models\CampaignRecipient;

class CreateCampaignAction
{
    public function execute(CampaignData $data): Campaign
    {
        $campaign = Campaign::create([
            'subject' => $data->subject,
            'body' => $data->body,
            'status' => 'draft',
        ]);

        foreach ($data->contactIds as $contactId) {
            CampaignRecipient::create([
                'campaign_id' => $campaign->id,
                'contact_id' => $contactId,
                'status' => 'pending',
            ]);
        }

        return $campaign;
    }
}

