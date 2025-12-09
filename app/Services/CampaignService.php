<?php

namespace App\Services;

use App\Models\Campaign;
use App\Jobs\SendCampaignEmailJob;
use Illuminate\Support\Facades\DB;

class CampaignService
{
    public function sendCampaign(Campaign $campaign): void
    {
        DB::transaction(function () use ($campaign) {
            $campaign->update(['status' => 'sending']);

            $recipients = $campaign->recipients()
                ->where('status', 'pending')
                ->get();

            foreach ($recipients as $recipient) {
                SendCampaignEmailJob::dispatch($recipient);
            }
        });
    }

    public function getCampaignStats(Campaign $campaign): array
    {
        $total = $campaign->recipients()->count();
        $sent = $campaign->recipients()->where('status', 'sent')->count();
        $failed = $campaign->recipients()->where('status', 'failed')->count();
        $pending = $campaign->recipients()->where('status', 'pending')->count();

        return [
            'total' => $total,
            'sent' => $sent,
            'failed' => $failed,
            'pending' => $pending,
            'success_rate' => $total > 0 ? round(($sent / $total) * 100, 2) : 0,
        ];
    }
}

