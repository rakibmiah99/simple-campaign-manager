<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email'];

    public function campaignRecipients()
    {
        return $this->hasMany(CampaignRecipient::class);
    }

    public function campaigns()
    {
        return $this->belongsToMany(Campaign::class, 'campaign_recipients')
            ->withPivot('status', 'error_message', 'sent_at')
            ->withTimestamps();
    }
}
