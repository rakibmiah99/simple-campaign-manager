<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = ['subject', 'body', 'status'];

    public function recipients()
    {
        return $this->hasMany(CampaignRecipient::class);
    }

    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'campaign_recipients')
            ->withPivot('status', 'error_message', 'sent_at')
            ->withTimestamps();
    }
}
