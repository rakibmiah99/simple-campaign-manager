<?php

namespace App\Http\Controllers;

use App\Actions\CreateCampaignAction;
use App\Data\CampaignData;
use App\Models\Campaign;
use App\Models\Contact;
use App\Services\CampaignService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    public function __construct(
        private CampaignService $campaignService,
        private CreateCampaignAction $createCampaignAction
    ) {}

    public function index()
    {
        $campaigns = Campaign::withCount('recipients')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('campaigns/index', [
            'campaigns' => $campaigns,
        ]);
    }

    public function create()
    {
        $contacts = Contact::orderBy('name')->get();

        return Inertia::render('campaigns/create', [
            'contacts' => $contacts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'contact_ids' => 'required|array|min:1',
            'contact_ids.*' => 'exists:contacts,id',
        ]);

        $campaignData = CampaignData::fromRequest($validated);
        $campaign = $this->createCampaignAction->execute($campaignData);

        return redirect()->route('campaigns.show', $campaign)
            ->with('success', 'Campaign created successfully');
    }

    public function show(Campaign $campaign)
    {
        $campaign->load(['recipients.contact']);
        $stats = $this->campaignService->getCampaignStats($campaign);

        return Inertia::render('campaigns/show', [
            'campaign' => $campaign,
            'stats' => $stats,
        ]);
    }

    public function send(Campaign $campaign)
    {
        if ($campaign->status !== 'draft') {
            return redirect()->back()->with('error', 'Campaign has already been sent or is being sent');
        }

        $this->campaignService->sendCampaign($campaign);

        return redirect()->route('campaigns.show', $campaign)
            ->with('success', 'Campaign is being sent');
    }

    public function destroy(Campaign $campaign)
    {
        $campaign->delete();

        return redirect()->route('campaigns.index')
            ->with('success', 'Campaign deleted successfully');
    }
}

