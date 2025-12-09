<?php

namespace Tests\Feature;

use App\Models\Campaign;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CampaignFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_contacts_page(): void
    {
        $user = User::factory()->create();
        Contact::factory()->count(5)->create();

        $response = $this->actingAs($user)->get('/contacts');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('contacts/index')
            ->has('contacts.data', 5)
        );
    }

    public function test_can_create_contact(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/contacts', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('contacts', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
    }

    public function test_can_view_campaigns_page(): void
    {
        $user = User::factory()->create();
        Campaign::factory()->count(3)->create();

        $response = $this->actingAs($user)->get('/campaigns');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('campaigns/index')
            ->has('campaigns.data', 3)
        );
    }

    public function test_can_create_campaign(): void
    {
        $user = User::factory()->create();
        $contacts = Contact::factory()->count(3)->create();

        $response = $this->actingAs($user)->post('/campaigns', [
            'subject' => 'Test Campaign',
            'body' => 'This is a test campaign message.',
            'contact_ids' => $contacts->pluck('id')->toArray(),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('campaigns', [
            'subject' => 'Test Campaign',
            'body' => 'This is a test campaign message.',
            'status' => 'draft',
        ]);

        $campaign = Campaign::where('subject', 'Test Campaign')->first();
        $this->assertCount(3, $campaign->recipients);
    }

    public function test_can_view_campaign_details(): void
    {
        $user = User::factory()->create();
        $campaign = Campaign::factory()->create([
            'subject' => 'Test Campaign',
            'body' => 'Test message',
        ]);

        $contact = Contact::factory()->create();
        $campaign->recipients()->create([
            'contact_id' => $contact->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($user)->get("/campaigns/{$campaign->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('campaigns/show')
            ->where('campaign.id', $campaign->id)
            ->has('stats')
        );
    }

    public function test_campaign_validation(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/campaigns', [
            'subject' => '',
            'body' => '',
            'contact_ids' => [],
        ]);

        $response->assertSessionHasErrors(['subject', 'body', 'contact_ids']);
    }
}

