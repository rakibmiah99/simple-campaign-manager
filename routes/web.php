<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('', [DashboardController::class, 'index'])->name('dashboard');

// Contacts routes
Route::resource('contacts', ContactController::class)->only(['index', 'store', 'destroy']);

// Campaigns routes
Route::resource('campaigns', CampaignController::class);
Route::post('campaigns/{campaign}/send', [CampaignController::class, 'send'])->name('campaigns.send');

require __DIR__.'/settings.php';
