<?php

namespace App\Jobs;

use App\Models\Campaign;
use App\Models\CampaignRecipient;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendCampaignEmailJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public CampaignRecipient $recipient
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            // Simulate email sending with a random delay
            sleep(rand(1, 3));

            // Randomly simulate success or failure (90% success rate)
            $success = rand(1, 100) <= 90;

            if ($success) {
                $this->recipient->update([
                    'status' => 'sent',
                    'sent_at' => now(),
                    'error_message' => null,
                ]);

                Log::info("Email sent successfully to {$this->recipient->contact->email}");
            } else {
                throw new \Exception('Random email delivery failure for testing');
            }

            // Update campaign status to 'sent' if all emails have been processed
            $this->updateCampaignStatus();
        } catch (\Exception $e) {
            $this->recipient->update([
                'status' => 'sent',
                'error_message' => $e->getMessage(),
            ]);

            Log::error("Failed to send email to {$this->recipient->contact->email}: {$e->getMessage()}");

            $this->updateCampaignStatus();
        }
    }

    private function updateCampaignStatus(): void
    {
        $campaign = $this->recipient->campaign;

        $pending = $campaign->recipients()->where('status', 'pending')->count();

        if ($pending === 0) {
            $failed = $campaign->recipients()->where('status', 'failed')->count();
            $campaign->update([
                'status' => $failed > 0 ? 'failed' : 'sent',
            ]);
        }
    }
}
